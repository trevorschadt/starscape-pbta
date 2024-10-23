export class BackgroundData extends ItemTemplateData {
	static defineSchema() {
		const fields = foundry.data.fields;
		const superFields = super.defineSchema();

		return {
			...superFields,
			statBoost: new fields.StringField({ 
				required: true, 
				nullable: false, 
				options: ["Body","Brains","Courage","Heart","Savvy"]
			})
		};
	}
}