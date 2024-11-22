export class PlaybookSheet extends pbta.applications.item.PlaybookSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "starscape", "sheet", "item", "playbook"],
			width: 650,
			height: 375
		});
	}

  /** @override */
  get template() {
    return 'modules/starscape-pbta/templates/items/playbook-sheet.hbs';
  }

  /** @override */
  async getData() {
    // Retrieve base data structure.
    const context = await super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item;
    
    // Add the items's data to context.data for easier access, as well as flags.
    context.system = itemData.system;
    const characterStats = {};
    Object.entries(pbta.sheetConfig.actorTypes.character.stats).forEach((k) => {
      characterStats[k[0]] = k[1].label;
    });
    context.characterStats = characterStats;
    context.enriched = {
      ...context.enriched,
      seeingRed: itemData.system.seeingRed,
      stellarMove: itemData.system.stellarMove,
      connections: itemData.system.connections
    };

    if (context.system.shipCustomizationOptions.length != 3)
      context.system.shipCustomizationOptions = ['','',''];
    if (context.system.homeworldFeatureOptions.length != 2)
      context.system.homeworldFeatureOptions = ['',''];

    context.isGM = game.user.isGM;
    context.newMoves = true;
    return context;
  }



}
