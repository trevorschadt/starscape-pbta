export class BackgroundSheet extends ItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "starscape", "sheet", "background"],
			width: 450,
			height: 375
		});
	}

  /** @override */
  get template() {
    return 'modules/starscape-pbta/templates/background-sheet.hbs';
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
    return context;
  }

  async activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='add-background-choice']").on("click", this._onAddBackgroundChoice.bind(this));
  }

  _onAddBackgroundChoice(event) {
    event.preventDefault();
    let choices = this.object.system.choices;
    choices.push({label: "", status: 0});
    this.object.update({"system.choices": choices});  
  }
}
