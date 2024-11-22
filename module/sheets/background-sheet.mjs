export class BackgroundSheet extends ItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "starscape", "sheet", "background"],
			width: 450,
			height: 470,
      dragDrop: [{ dropSelector: null }],
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "mechanics" }]
		});
	}

  /** @override */
  get template() {
    return 'modules/starscape-pbta/templates/items/background-sheet.hbs';
  }

  async _onDrop(event) {
    event.preventDefault();
    if (!game.user.isGM) return false;
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      return false;
    }
    if (data.type === "Item") {
      const item = await Item.implementation.fromDropData(data);
      switch (item.type) {
      case 'playbook':
        event.preventDefault();
        await this.object.update({"system.playbook": item.system.slug});
        break;
      case 'starscape-pbta.skill':
        const specialties = this.object.system.specialties;
        const options = specialties.options;
        if (!options.some(o => o.label === item.name)) {
          options.push({
            label: item.name,
            slug: item.name.slugify(),
            value: false
          });
          options.sort((a,b) => a.label.localeCompare(b.label));
          await this.object.update({"system.specialties": specialties});
        }
        break;
      }

    }
  }
  
  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;
    
    // Add the items's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    const characterStats = {};
    Object.entries(pbta.sheetConfig.actorTypes.character.stats).forEach((k) => {
      characterStats[k[0]] = k[1].label;
    });
    context.characterStats = characterStats;
    context.allPlaybooks = CONFIG.PBTA.playbooks;
    context.allSpecialties = CONFIG.SS.specialties;
    context.primarySpecialty = 
      itemData.system.specialties
        ? (itemData.system.specialties.value || "0") : "0";
    context.isGM = game.user.isGM;
    
    return context;
  }

  async activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='add-background-choice']").on("click", this._onAddBackgroundChoice.bind(this));
    html.find("[data-action='delete-background-choice']").on("click", this._onRemoveBackgroundChoice.bind(this));
    html.find("[data-action='delete-specialty-choice']").on("click", this._onRemoveSpecialty.bind(this));
  }

  _onAddBackgroundChoice(event) {
    event.preventDefault();
    let choices = this.object.system.choices;
    choices.push("");
    this.object.update({"system.choices": choices});  
  }

  _onRemoveBackgroundChoice(event) {
    event.preventDefault();
    let choices = this.object.system.choices;
    choices.splice(event.currentTarget.dataset.target,1);
    this.object.update({"system.choices": choices});  
  }

  _onRemoveSpecialty(event) {
    event.preventDefault();
    let specialties = this.object.system.specialties;
    let foundIndex = specialties.options.findIndex(s => s.slug === event.currentTarget.dataset.target);
    if (foundIndex < 0) return;
    specialties.options.splice(foundIndex,1);
    if (specialties.value === event.currentTarget.dataset.target)
      specialties.value = '';
    this.object.update({"system.specialties": specialties});

  }
}
