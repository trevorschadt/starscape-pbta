export class BackgroundData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			name: new foundry.data.fields.StringField({ initial: ""}),
			bonus: new foundry.data.fields.StringField({ initial: "" })
		};
	}
}	