export function BackgroundDataMixin(Base) {
	return class BackgroundData extends Base {
		static defineSchema() {
			const fields = foundry.data.fields;
			const superFields = super.defineSchema()
			return {
				... superFields,
				bonusStat: new fields.StringField({ initial: "body", required: true, blank: false, gmOnly: true }),
				choicePrompt: new fields.StringField({ initial: "", gmOnly: true}),
				choices: new fields.ArrayField(new fields.SchemaField({
					label: new fields.StringField({ initial: "", gmOnly: true }),
					status: new fields.NumberField({ initial: 0, min: -1, max: 1 })
				}), { initial: [] })
			};
		}
	}
}