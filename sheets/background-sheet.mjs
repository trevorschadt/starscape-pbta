export class BackgroundSheet extends ItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "starscape", "sheet", "actor"],
			width: 450,
			height: 375
		});
	}

  /** @override */
  get template() {
    return 'modules/starscape-pbta/templates/covenant-sheet.hbs';
  }

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;
    
    // Add the items's data to context.data for easier access, as well as flags.
    context.system = itemData.system;

    return context;
  }
}
