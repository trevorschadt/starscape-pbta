export class SkillData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			name: new foundry.data.fields.StringField({ initial: "" })
		};
	}
}	