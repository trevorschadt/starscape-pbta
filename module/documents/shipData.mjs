export function ShipDataMixin(Base) {
	return class ShipData extends Base {
		static defineSchema() {
			const fields = foundry.data.fields;
			const superFields = super.defineSchema();
			return {
				... superFields,
				stats: new fields.SchemaField({
					communications: new fields.SchemaField({
						name: new fields.StringField({initial: "communications"}),
						label: new fields.StringField({
							initial: game.i18n.localize("Starscape.Ship.Stats.Communications"), 
							readonly: true}),
						value: new fields.NumberField({
							initial: 0,
							min: 0,
						}),
						max: new fields.NumberField({initial: 2})
					}),
					defense: new fields.SchemaField({
						name: new fields.StringField({initial: "defense"}),
						label: new fields.StringField({
							initial: game.i18n.localize("Starscape.Ship.Stats.Defense"), 
							readonly: true}),
						value: new fields.NumberField({
							initial: 0,
							min: 0,
						}),
						max: new fields.NumberField({initial: 2})
					}),
					lifeSupport: new fields.SchemaField({
						name: new fields.StringField({initial: "lifeSupport"}),
						label: new fields.StringField({
							initial: game.i18n.localize("Starscape.Ship.Stats.LifeSupport"), 
							readonly: true}),
						value: new fields.NumberField({
							initial: 0,
							min: 0,
						}),
						max: new fields.NumberField({initial: 2})
					}),
					propulsion: new fields.SchemaField({
						name: new fields.StringField({initial: "propulsion"}),
						label: new fields.StringField({
							initial: game.i18n.localize("Starscape.Ship.Stats.Propulsion"), 
							readonly: true}),
						value: new fields.NumberField({
							initial: 0,
							min: 0,
						}),
						max: new fields.NumberField({initial: 2})
					}),
					navigation: new fields.SchemaField({
						name: new fields.StringField({initial: "navigation"}),
						label: new fields.StringField({
							initial: game.i18n.localize("Starscape.Ship.Stats.Navigation"), 
							readonly: true}),
						value: new fields.NumberField({
							initial: 0,
							min: 0,
						}),
						max: new fields.NumberField({initial: 2})
					}),
					weapons: new fields.SchemaField({
						name: new fields.StringField({initial: "weapons"}),
						label: new fields.StringField({
							initial: game.i18n.localize("Starscape.Ship.Stats.Weapons"), 
							readonly: true}),
						max: new fields.NumberField({initial: 2}),
						value: new fields.NumberField({
							initial: 0,
							min: 0,
						}),
						max: new fields.NumberField({initial: 2})
					}),
				}),
				attributes: new fields.SchemaField({
					pronouns: new fields.StringField({initial: ""}),
					description: new fields.ArrayField(
						new fields.SchemaField({
							name: new fields.StringField({ initial: "" }),
							selected: new fields.BooleanField({initial: false})
						}), {initial: []}),
					captain: new fields.SchemaField({
						options: new fields.ArrayField(new fields.StringField({ initial: "" }),
							{initial: [
								game.i18n.localize("Starscape.Ship.Attributes.Captain.Types.PC_Captain"),
								game.i18n.localize("Starscape.Ship.Attributes.Captain.Types.NPC_Captain"),
								game.i18n.localize("Starscape.Ship.Attributes.Captain.Types.No_Captain"),
								]}),
						value: new fields.NumberField({nullable: true}),
						name: new fields.StringField({ initial: "" }),
						details: new fields.StringField({ initial: "" })
					}),
					crewSize: new fields.SchemaField({
						options: new fields.ArrayField(new fields.StringField({ initial: "" }),
							{initial: []}),
						value: new fields.NumberField({nullable: true})
					}),
					propulsion: new fields.ArrayField(
						new fields.SchemaField({
							name: new fields.StringField({ initial: "" }),
							selected: new fields.BooleanField({initial: false})
						}), {initial: []}),
					defenses: new fields.ArrayField(
						new fields.SchemaField({
							name: new fields.StringField({ initial: "" }),
							selected: new fields.BooleanField({initial: false})
						}), {initial: []}),
					weapons: new fields.ArrayField(
						new fields.SchemaField({
							name: new fields.StringField({ initial: "" }),
							selected: new fields.BooleanField({initial: false})
						}), {initial: []}),
					quirks: new fields.ArrayField(
						new fields.SchemaField({
							name: new fields.StringField({ initial: "" }),
							required: new fields.BooleanField({initial: false}),
							selected: new fields.BooleanField({initial: false})
						}), {initial: []}),
					areas: new fields.ArrayField(
						new fields.SchemaField({
							name: new fields.StringField({ initial: "" }),
							selected: new fields.BooleanField({initial: false}),
							requiresCount: new fields.BooleanField({initial: false}),
							custom: new fields.BooleanField({initial: false}),
							count: new fields.NumberField({initial: null})
						}), {initial: []}),
					shipCustomizations: new fields.HTMLField({initial: ""}),
					investments: new fields.NumberField({
						initial: 0,
						max: 5
					}),
					upgrades: new fields.ObjectField(
					// upgrades: new fields.ArrayField(
					// 	new fields.SchemaField({
					// 		name: new fields.StringField({ initial: "" }),
					// 		label: new fields.StringField({ initial: "" }),
					// 		selected: new fields.BooleanField({initial: false}),
					// 		minInvestments: new fields.NumberField({initial: 0})
					// 	}), {initial: [
						{initial: {
							0: [
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.addNewArea"), minInvestments: 0, selected: false },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.addOtherCust"), minInvestments: 0, selected: false },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.upgradeCommunications"), minInvestments: 0, selected: false, systems: ["communications"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.upgradeDefense"), minInvestments: 0, selected: false, systems: ["defense"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.upgradeLifeSupport"), minInvestments: 0, selected: false, systems: ["lifeSupport"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.upgradePropulsion"), minInvestments: 0, selected: false, systems: ["propulsion"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.upgradeNavigation"), minInvestments: 0, selected: false, systems: ["navigation"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.upgradeWeapons"), minInvestments: 0, selected: false, systems: ["weapons"] },
							],
							5: [
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.addDefense"), minInvestments: 5, selected: false, systems: ["defense", "lifeSupport"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.addWeapons"), minInvestments: 5, selected: false, systems: ["propulsion", "weapons"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.boostElectronics"), minInvestments: 5, selected: false, systems: ["communications, navigation"] },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.addOtherShipBenefit"), minInvestments: 5, selected: false },
						{ name: game.i18n.localize("Starscape.Ship.Attributes.Upgrades.removeDrawback"), minInvestments: 5, selected: false },
						]}}
					)
				})

			}
		}
	}
}