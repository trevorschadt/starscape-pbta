import { configSheet } from "./helpers/config-sheet.mjs";
import * as utils from "./helpers/utils.mjs";
import { SSActorSheetMixin } from './sheets/actor-sheet.mjs';
import { BackgroundData } from './documents/background.mjs';
import { SkillData } from './documents/skill.mjs';

Hooks.once('init', () => {
    utils.preloadHandlebarsTemplates();
    Object.assign(CONFIG.Item.dataModels, {
        "background": BackgroundData,
        "skill": SkillData
    });
})

// Override sheetConfig with Starscape sheet (TOML).
Hooks.once('pbtaSheetConfig', () => {
    const ssActorSheet = SSActorSheetMixin(game.pbta.applications.actor.PbtaActorSheet);
    Actors.unregisterSheet('pbta', game.pbta.applications.actor.PbtaActorSheet, { types: ['character', 'other'] });
    Actors.registerSheet('pbta', ssActorSheet, {
        types: ['character', 'other'],
        makeDefault: true,
        label: 'Starscape Character Sheet',
    });

    // Disable the PbtA sheet config form.
    if (game.settings.settings.get('pbta.sheetConfigOverride')) game.settings.set('pbta', 'sheetConfigOverride', true);

    // Replace the game.pbta.sheetConfig with Starscape version.
    configSheet();

    // Settings for Starscape
    game.settings.set('pbta', 'advForward', true);
    game.settings.set('pbta', 'hideRollFormula', true);
    game.settings.set('pbta', 'hideForward', true);
    game.settings.set('pbta', 'hideOngoing', true);
    game.settings.set('pbta', 'hideRollMode', false);
    game.settings.set('pbta', 'hideUses', true);
    if (isNewerVersion(game.system.version, '1.0.4')) {
        game.settings.set('pbta', 'hideHold', true);
    }

});
