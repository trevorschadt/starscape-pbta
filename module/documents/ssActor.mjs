export class SSActor extends pbta.documents.ActorPbta {
    get conditionGroups() {
        const superGroups = super.conditionGroups;
        let cond = {
            key: "specialties",
            label: "Specialties",
            conditions: Array.from(this.items
                .filter((i) => i.type === "starscape-pbta.skill"))
                .map((s) => { return { label: s.name, mod: 1 }})
                .sort((a,b) => a.label.localeCompare(b.label))
        };
        if (cond.conditions.length > 0) superGroups.push(cond);
        return superGroups;
    }
}
