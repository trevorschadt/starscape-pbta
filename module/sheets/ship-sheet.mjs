export class ShipSheet extends ItemSheet {
	static get defaultOptions() {
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["pbta", "starscape", "sheet", "item", "ship"],
			width: 1200,
			height: 600
		});
	}

  /** @override */
  get template() {
    return 'modules/starscape-pbta/templates/items/ship-sheet.hbs';
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

  //@override
  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='toggle-ship-descriptor']").on("click", this._onToggleShipDescriptor.bind(this));
    html.find("[data-action='toggle-ship-area']").on("click", this._onToggleShipArea.bind(this));
    html.find("[data-action='change-ship-area-count']").on("change", this._onChangeShipAreaCount.bind(this));
    html.find("[data-action='change-ship-investments']").on("click", this._onChangeShipInvestments.bind(this));
    html.find("[data-action='select-ship-type']").on("change", this._onSelectShipType.bind(this));
    html.find("[data-action='toggle-propulsion']").on("click", this._onTogglePropulsion.bind(this));
    html.find("[data-action='toggle-defenses']").on("click", this._onToggleDefenses.bind(this));
    html.find("[data-action='toggle-weapons']").on("click", this._onToggleWeapons.bind(this));
    html.find("[data-action='toggle-quirk']").on("click", this._onToggleQuirk.bind(this));
    html.find("[data-action='toggle-ship-upgrade']").on("click", this._onToggleShipUpgrade.bind(this));
    html.find("[data-action='gain-ship-upgrade']").on("click", this._onGainShipUpgrade.bind(this));
    html.find("[data-action='reset-ship-investments']").on("click", this._onResetShipInvestments.bind(this));
  }

  async _onSelectShipType(event) {
    event.preventDefault();
    const shipType = CONFIG.SS.shipTypes[event.currentTarget.value];
    if (!shipType) return;
    new Dialog({
      title: `Set Ship Type to "${shipType.name}"`,
      content: `This selection CANNOT BE UNDONE. Are you sure?`,
      buttons: {
        yes: {
          icon: "<i class='fas fa-check'></i>",
          label: "Yes",
          callback: async (html) => {
            await this.object.update({
              "system.description": shipType.name,
              "system.attributes.areas": shipType.attributes.areas.slice(),
              "system.attributes.crewSize": { options: shipType.attributes.crewSize.slice() },
              "system.attributes.defenses": shipType.attributes.defenses.slice(),
              "system.attributes.description": shipType.attributes.description.slice(),
              "system.attributes.propulsion": shipType.attributes.propulsion.slice(),
              "system.attributes.quirks": shipType.attributes.quirks.slice(),
              "system.attributes.weapons": shipType.attributes.weapons.slice(),
            });
          }
        },
        no: {
          icon: "<i class='fas fa-x'></i>",
          label: "No",
          callback: async (html) => {
            event.currentTarget.value = "";
          }
        }
      }
    }).render(true);
  }

  async _onToggleShipUpgrade(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.upgrades;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.upgrades": state });
  }

  async _onGainShipUpgrade(event) {
    // TODO: Dialog with remaining options?
    const changes = { "system.attributes.investments": 0 };
    await this.object.update(changes);
  }

  async _onResetShipInvestments(event) {
    const changes = { "system.attributes.investments": 0 };
    await this.object.update(changes);
  }

  async _onChangeShipInvestments(event) {
    event.preventDefault();
    const newStep = parseInt(event.currentTarget.dataset.step) + 1;
    const changes = { "system.attributes.investments": newStep };
    await this.object.update(changes);
  }

  async _onTogglePropulsion(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.propulsion;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.propulsion": state });
  }

  async _onToggleDefenses(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.defenses;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.defenses": state });
  }

  async _onToggleWeapons(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.weapons;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.weapons": state });
  }

  async _onToggleQuirk(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.quirks;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.quirks": state });
  }

  async _onToggleShipDescriptor(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.description;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.description": state });
  }

  async _onToggleShipArea(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.areas;
    state[target].selected = !state[target].selected;
    await this.object.update({"system.attributes.areas": state });
  }

  async _onChangeShipAreaCount(event) {
     event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const state = this.object.system.attributes.areas;
    state[target].count = event.currentTarget.valueAsNumber;
    await this.object.update({"system.attributes.areas": state });   
  }

  async _onStatDamageClick(event) {
    event.preventDefault();
    const dataset = event.currentTarget.dataset;
    const stats = this.object.system.stats;
    const stat = stats[dataset.target]
    stat.value = Math.max(Math.min(stat.value + parseInt(dataset.change), stat.max),0);
    await this.object.update({"system.stats": stats});
  }

  async _onSelectCrewSize(event) {
    event.preventDefault();
    const target = event.currentTarget.dataset.target;
    const currentCrewSize = this.object.system.attributes.crewSize;
    currentCrewSize[target].selected = !currentCrewSize[target].selected;
    await this.object.update({"system.attributes.crewSize": currentCrewSize });

  }
}
