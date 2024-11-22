export function SSCharacterDataMixin(Base) {
	return class SSCharacterData extends Base {
		static defineSchema() {
			const fields = foundry.data.fields;
			const superFields = super.defineSchema()
			return {
				... superFields,
				background: new fields.SchemaField({
					name: new fields.StringField({ initial: "" }),
					slug: new fields.StringField({ initial: "" }),
					uuid: new fields.StringField({ initial: "" }),
					bonusStat: new fields.StringField({ initial: "" }) 
				}),
				backgroundChoices: new fields.ArrayField(
					new fields.StringField({initial: ""}), {initial: []}),
				shipCustomizationChoices: new fields.ArrayField(
					new fields.StringField({initial: ""}), {initial: []})
			}
		}
	}
}