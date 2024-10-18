
Hooks.on('updateActor', (document, changed, options, userId) => {
    if (changed && changed.system && changed.system.attributes) {
        Object.keys(changed.system.attributes)
            .filter((a) => a.endsWith("Conditions"))
            .forEach((cond) => {
                let isCrashed = Object.keys(document.system.attributes[cond].options)
                    .every((c) => document.system.attributes[cond].options[c].value);
                    let stat = cond.substring(0,cond.indexOf("Conditions"));
                    let selector = `.stats-list > .stat[data-stat="${stat}"]`;
                    let updates = {};
                    if (isCrashed) {
                        updates[`system.stats.${stat}.crashed`] = true;
                        updates[`system.stats.${stat}.original`] = document.system.stats[stat].value;
                        updates[`system.stats.${stat}.value`] = -1;
                        updates[`system.attributes.trust.value`] = Math.min(5,document.system.attributes.trust.value) + 1;
                    } else if (document.system.stats[stat].original !== undefined) {
                        updates[`system.stats.${stat}.crashed`] = false;
                        updates[`system.stats.${stat}.value`] = document.system.stats[stat].original;
                        updates[`system.stats.${stat}.original`] = undefined;
                    }
                    document.update(updates);
            })
    }
});

Hooks.on('renderPbtaActorSheet', (sheet, selector, thing3) => {
    let actor = thing3.actor;
    Object.keys(actor.system.attributes)
        .filter((a) => a.endsWith("Conditions"))
        .forEach((cond) => {
            let stat = cond.substring(0,cond.indexOf("Conditions"));
            let selector = `.stats-list > .stat[data-stat="${stat}"]`;
            if (actor.system.stats[stat].crashed) $(selector).addClass("crashed");
            else $(selector).removeClass("crashed");
            $(`${selector} > input`).attr("readonly", actor.system.stats[stat].crashed);
        });
});