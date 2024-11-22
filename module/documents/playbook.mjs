export function PlaybookDataMixin(Base) {
     return class SSPlaybookData extends Base {
        static defineSchema() {
            const fields = foundry.data.fields;
            const superFields = super.defineSchema()
            return {
                ... superFields,
                summary: new fields.StringField({initial: "", gmOnly: true}),
                backstoryPrompt: new fields.StringField({initial: "", gmOnly: true}),
                homeworldFeatureOptions: new fields.ArrayField(new fields.StringField({initial: "", gmOnly: true}), { initial: ['',''] }),
                shipCustomizationOptions: new fields.ArrayField(new fields.StringField({initial: "", gmOnly: true}), { initial: ['','',''] }),
                connections: new fields.HTMLField({initial: "", gmOnly: true}),
                seeingRed: new fields.HTMLField({initial: "", gmOnly: true}),
                stellarMove: new fields.HTMLField({initial: "", gmOnly: true}),
                moveImg: new fields.StringField({initial: "modules/game-icons-net/whitetransparent/move.svg", gmOnly: true})
            };
        }

        async getData() {
            await super.getData();
        }


    }
}