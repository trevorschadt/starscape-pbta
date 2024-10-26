import { configSheet } from "./helpers/config-sheet.mjs";
import * as utils from "./helpers/utils.mjs";
import { SSItem } from './documents/ssItem.mjs';
import { SSActorSheetMixin } from './sheets/actor-sheet.mjs';
import { BackgroundDataMixin } from './documents/background.mjs';
import { SSCharacterDataMixin } from './documents/ssCharacterData.mjs';
import { BackgroundSheet } from './sheets/background-sheet.mjs';
import { SkillData } from './documents/skill.mjs';

Hooks.once('init', () => {
    utils.preloadHandlebarsTemplates();
    CONFIG.Item.documentClass = SSItem;

    const backgroundData = BackgroundDataMixin(pbta.dataModels.ItemData);
    // const backgroundData = BackgroundDataMixin(pbta.documents.ItemPbta);
    Object.assign(CONFIG.Item.dataModels, {
        "starscape-pbta.background": backgroundData
    });

    CONFIG.Actor.dataModels.character = SSCharacterDataMixin(CONFIG.Actor.dataModels.character);
        
    Items.unregisterSheet('pbta',game.pbta.applications.item.PbtaItemSheet, { types: ["starscape-pbta.background"]});
    Items.registerSheet('starscape-pbta', BackgroundSheet, {
        types: ['starscape-pbta.background'],
        makeDefault: true,
        label: "Background Sheet"
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

