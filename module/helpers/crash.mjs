
Hooks.on('updateActor', (document, changed, options, userId) => {

    if (document.type === "character" && changed && changed.system && changed.system.stats) {
        let updates = {};
        Object.keys(changed.system.stats).forEach((stat) => {
            let changedStat = changed.system.stats[stat];
            if (changedStat.conditions) {
                let currentState = document.system.stats[stat];
                let isCrashed = Object.keys(document.system.stats[stat].conditions).every((c) => document.system.stats[stat].conditions[c].value);
                if (isCrashed && !currentState.crashed) {
                    updates[`system.stats.${stat}.crashed`] = true;
                    updates[`system.stats.${stat}.original`] = document.system.stats[stat].value;
                    updates[`system.stats.${stat}.value`] = -1;
                    updates[`system.attributes.trust.value`] = Math.min(5,document.system.attributes.trust.value) + 1;
                } else if (currentState.crashed && !isCrashed) {
                    updates[`system.stats.${stat}.crashed`] = false;
                    updates[`system.stats.${stat}.value`] = document.system.stats[stat].original;
                    updates[`system.stats.${stat}.original`] = undefined;
                }
            }
        });
        if (updates != {}) document.update(updates);
    }
});

Hooks.on('renderPbtaActorSheet', (sheet, selector, thing3) => {
    let actor = thing3.actor;
    Object.keys(actor.system.stats).forEach((stat) => {
            let selector = `.stats-list > .stat[data-stat="${stat}"]`;
            if (actor.system.stats[stat].crashed) $(selector).addClass("crashed");
            else $(selector).removeClass("crashed");
            $(`${selector} input.stat-value`).attr("readonly", actor.system.stats[stat].crashed);
    });
});