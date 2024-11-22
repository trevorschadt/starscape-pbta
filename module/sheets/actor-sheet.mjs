export function SSActorSheetMixin(Base) {
	return class SSActorSheet extends Base {
		static get defaultOptions() {
			return foundry.utils.mergeObject(super.defaultOptions, {
				classes: ["pbta", "starscape", "sheet", "actor"],
				template: 'modules/starscape-pbta/templates/actors/actor-sheet.hbs',
				width: 1000
			})
		}

		get template() {
			return 'modules/starscape-pbta/templates/actors/actor-sheet.hbs';
		}

		/** @override */
		activateListeners(html) {
			super.activateListeners(html);
			// // View playbook.
			html.find(".charbackground").on("change", async (event) => {
				const currentBG = this.actor.items.find((i) => i.type === "starscape-pbta.background");
				// if (currentBG.slug) {
				// 	this.options.classes = this.options.classes.filter((c) => c !== `playbook-${currPlaybook.slug}`);
				// }

					const selected = CONFIG.SS.backgrounds.find((b) => b.uuid === event.target.value);
				if (currentBG && currentBG.uuid) {
					const deleted = await this.actor.items.find((i) => i.type === "starscape-pbta.background")?.delete();
					if (!deleted) {
						event.target.value = currentBG.uuid;
						event.stopPropagation();
						return;
					}
				}
					// @todo replace for slug
					if (selected) await this.actor.createEmbeddedDocuments("Item", [await fromUuid(selected.uuid)], { keepId: true, originalUuid: selected.uuid });
			});
			html.find(".view-background.active").on("click", this._onViewBackground.bind(this));
			html.find("label[data-action='toggle-background-specialty']").on("click", this._onToggleBackgroundSpecialty.bind(this));
			html.find("[data-action='toggle-background-choice']").on("click", this._onToggleBackgroundChoice.bind(this));
			html.find("[data-action='toggle-ship-customization-option']").on("click", this._onToggleShipCustomizationOption.bind(this));

		}

		/** @override */
		async getData() {
			// Retrieve base data structure.
			const context = await super.getData();

			// Use a safe clone of the item data for further operations.
			const actorData = context.actor;

			context.playbook = actorData.items.find(i => i.type === "playbook");
			context.background = actorData.items.find(i => i.type === "starscape-pbta.background");

			context.availableBackgrounds = context.playbook
				? CONFIG.SS.backgrounds
					.filter(i => i.system.playbook === context.playbook.system.slug)
					.sort((a,b) => a.name.localeCompare(b.name))
				: [];
			const parser = new DOMParser();

			context.specialties = actorData.items
				.filter(i => i.type === "starscape-pbta.skill")
				.sort((a,b) => a.name.localeCompare(b.name));
			context.specialties.forEach(i => i.system.description = parser.parseFromString(i.system.description, 'text/html').body.textContent);
		    

		    context.specialtyPrompt = context.background
		    	? "Starscape.item.skill.choose-" + context.background.system.specialties.choiceLimit
		    	: "";

			context.isGM = game.user.isGM;


			return context;
		}

		async _onViewBackground(event) {
			event.preventDefault();
			this.actor.items.find((i) => i.type === "starscape-pbta.background")?.sheet.render(true);
		}

		async _onToggleBackgroundChoice(event) {
			event.preventDefault();
			const target = event.currentTarget.dataset.target;
			const currentChoices = this.actor.system.backgroundChoices;
			const existingChoice = currentChoices.find(c => c === target);
			if (event.target.checked && !existingChoice) {
				currentChoices.push(target);
				await this.actor.update({"system.backgroundChoices": currentChoices});
			} else if (!event.target.checked && existingChoice) {
				currentChoices.splice(currentChoices.indexOf(existingChoice),1);
				await this.actor.update({"system.backgroundChoices": currentChoices});
			}
		}

		async _onToggleShipCustomizationOption(event) {
			event.preventDefault();
			const target = event.currentTarget.dataset.target;
			const currentChoices = this.actor.system.shipCustomizationChoices;
			const existingChoice = currentChoices.find(c => c === target);
			if (event.target.checked && !existingChoice) {
				currentChoices.push(target);
				await this.actor.update({"system.shipCustomizationChoices": currentChoices});
			} else if (!event.target.checked && existingChoice) {
				currentChoices.splice(currentChoices.indexOf(existingChoice),1);
				await this.actor.update({"system.shipCustomizationChoices": currentChoices});
			}
		}

		async _onToggleBackgroundSpecialty(event) {
			event.preventDefault();
			const existingSkill = this.actor.items.find((i) => i.type === "starscape-pbta.skill" && i.name.slugify() === event.currentTarget.dataset.target);
			if (event.target.checked && !existingSkill) {
				const skill = CONFIG.SS.specialties.find(s => s.name.slugify() === event.currentTarget.dataset.target);
				if (skill)
                    await pbta.documents.ItemPbta.createDocuments([skill.toObject()], {
                        keepId: true,
                        parent: this.actor,
                        pack: this.actor.pack
                    });
				return;
			}
			if (!event.target.checked && existingSkill) {
				await this.actor.items.find(i => i.type === "starscape-pbta.skill" && i.name.slugify() === event.currentTarget.dataset.target)?.delete();
				return;
			}
		}

	}
}