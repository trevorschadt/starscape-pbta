export function SkillDataMixin(Base) {
	return class SkillData extends Base {
		static defineSchema() {
			const fields = foundry.data.fields;
			const superFields = super.defineSchema()
			return {
				... superFields,
				name: new fields.StringField({ initial: "", required: true, blank: true, gmOnly: true})
			};
		}
	}
}