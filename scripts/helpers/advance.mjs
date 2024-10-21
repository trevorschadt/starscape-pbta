Hooks.on('renderPbtaActorSheet', (sheet, selector, thing3) => {
    let actor = thing3.actor;
    let actorAdvancements = actor.system.advancements;
    let newXpMax = Math.min(Math.floor(actorAdvancements/5),3) + 5;
    if (actor.system.attributes.xp.max != newXpMax)
        actor.update({"system.attributes.xp.max":newXpMax});
    Object.keys(actor.system.attributes.advancements.options).forEach((key) => {
        let adv = actor.system.attributes.advancements.options[key];
        let selector = `[name="system.attributes.advancements.options.${key}.values.0.value"]`;
        if (adv.advancements) {
            if (actorAdvancements >= adv.advancements) {
                $(selector).parent().show();                
            } else {
                $(selector).parent().hide();
            }
        } else {
            $(selector).parent().show();
        }
        Object.keys(adv.values).forEach((vkey) => {
            let v = adv.values[vkey];
            let vSelector = `[name="system.attributes.advancements.options.${key}.values.${vkey}.value"]`;
            if (v.advancements) {
                if (actorAdvancements >= v.advancements) {
                    $(vSelector).show();
                } else {
                    $(vSelector).hide();
                }
            } else {
                $(vSelector).show();
            }
        });
    });
    let t6text = game.i18n.localize("Starscape.CharacterSheets.trust.levels.6");
    let t6adv = Object.keys(actor.system.attributes.advancements.options).filter((o) => actor.system.attributes.advancements.options[o].label == game.i18n.localize("Starscape.CharacterSheets.advancements.trust6"))
    if (t6adv.length == 1) {
        let t6selector = `.cell--trust label:contains(${t6text})`;
        if (actor.system.attributes.advancements.options[t6adv[0]].value) {
            $(t6selector).show();
        } else {
            $(t6selector).hide();
        }
    }
});