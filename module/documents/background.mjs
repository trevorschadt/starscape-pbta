export function BackgroundDataMixin(Base) {
	 return class BackgroundData extends Base {
		static defineSchema() {
			const fields = foundry.data.fields;
			const superFields = super.defineSchema()
			return {
				... superFields,
				slug: new fields.StringField({initial: '', gmOnly: true}),
				playbook: new fields.StringField({initial: '', gmOnly: true}),
				bonusStat: new fields.StringField({ initial: "body", required: true, blank: false, gmOnly: true }),
				choicePrompt: new fields.StringField({initial: '', gmOnly: true}),
				numChoices: new fields.NumberField({inital: 1, min: 1, gmOnly: true}),
                choices: new fields.ArrayField(
                	new fields.StringField({initial: "", gmOnly: true}), { initial: ['','','','','',''] }),
                specialties: new fields.SchemaField({
                	options: new fields.ArrayField(
                		new fields.SchemaField({
            				label: new fields.StringField({initial: "", gmOnly: true}),
            				slug: new fields.StringField({initial: "", gmOnly: true}),
                		})),
                	value: new fields.StringField({initial: "", gmOnly: true}),
                	choiceLimit: new fields.NumberField({ initial: 2, min: 0, gmOnly: true})
                })
			};
		}

		async getData() {
			await super.getData();
		}

	}
}