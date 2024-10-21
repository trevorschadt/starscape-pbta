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

	}
}