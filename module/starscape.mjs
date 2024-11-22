import { configSheet } from "./helpers/config-sheet.mjs";
import { configShipTypes } from "./helpers/ship-types.mjs";
import * as utils from "./helpers/utils.mjs";
import { SSItem } from './documents/ssItem.mjs';
import { SSActor } from './documents/ssActor.mjs';
import { SSActorSheetMixin } from './sheets/actor-sheet.mjs';
import { BackgroundDataMixin } from './documents/background.mjs';
import { PlaybookDataMixin } from './documents/playbook.mjs';
import { SkillDataMixin } from './documents/skill.mjs';
import { SSCharacterDataMixin } from './documents/ssCharacterData.mjs';
import { ShipDataMixin } from './documents/shipData.mjs';
import { BackgroundSheet } from './sheets/background-sheet.mjs';
import { SkillSheet } from './sheets/skill-sheet.mjs';
import { ShipSheet } from './sheets/ship-sheet.mjs';
import { PlaybookSheet } from './sheets/playbook-sheet.mjs';

const SS = {};

Hooks.once('init', () => {
    utils.preloadHandlebarsTemplates();
    utils.preloadHandlebarsHelpers();

    Object.assign(CONFIG, {"SS": {}});
    // Set default item and character types to include module specific data
    CONFIG.Item.documentClass = SSItem;
    CONFIG.Actor.documentClass = SSActor;
    CONFIG.Actor.dataModels.character = SSCharacterDataMixin(pbta.dataModels.CharacterData);

    const shipData = ShipDataMixin(pbta.dataModels.ItemData);
    Object.assign(CONFIG.Item.dataModels, { "starscape-pbta.ship": shipData});
    Items.unregisterSheet('pbta', game.pbta.applications.item.PbtaItemSheet, { 
        types: ["starscape-pbta.ship"]
    });
    Items.registerSheet('starscape-pbta', ShipSheet, {
        types: ['starscape-pbta.ship'],
        makeDefault: true,
        label: "Ship Sheet"
    });
    
    // Configure background item type
    const backgroundData = BackgroundDataMixin(pbta.dataModels.ItemData);
    Object.assign(CONFIG.Item.dataModels, { "starscape-pbta.background": backgroundData });
    Items.unregisterSheet('pbta', game.pbta.applications.item.PbtaItemSheet, { 
        types: ["starscape-pbta.background"]
    });
    Items.registerSheet('starscape-pbta', BackgroundSheet, {
        types: ['starscape-pbta.background'],
        makeDefault: true,
        label: "Background Sheet"
    });

    // Configure skill item type
    const skillData = SkillDataMixin(pbta.dataModels.ItemData);
    Object.assign(CONFIG.Item.dataModels, { "starscape-pbta.skill": skillData });
    Items.unregisterSheet('pbta', game.pbta.applications.item.PbtaItemSheet, { 
        types: ["starscape-pbta.skill"]
    });
    Items.registerSheet('starscape-pbta', SkillSheet, {
        types: ['starscape-pbta.skill'],
        makeDefault: true,
        label: "Specialty Sheet"
    });

    const playbookData = PlaybookDataMixin(CONFIG.Item.dataModels.playbook);
    Object.assign(CONFIG.Item.dataModels, { "playbook": playbookData });
    Items.unregisterSheet('pbta', game.pbta.applications.item.PlaybookSheet, { 
        types: ["playbook"]
    });
    Items.registerSheet('starscape-pbta', PlaybookSheet, {
        types: ['playbook'],
        makeDefault: true,
        label: "Playbook Sheet"
    });
});


Hooks.once("ready", () => {
    game.packs.get("starscape-pbta.starscape-playbooks").getDocuments().then(items => {
        Object.assign(CONFIG.SS, {
            "playbooks": items.filter(i => i.type === "playbook"),
            "backgrounds": items.filter(i => i.type === "starscape-pbta.background"),
             });
    });
    game.packs.get("starscape-pbta.starscape-skills").getDocuments().then(items => {
        Object.assign(CONFIG.SS, {"specialties": items.sort((a,b) => a.name.localeCompare(b.name)) });
    });
    configShipTypes().then(types => {
        Object.assign(CONFIG.SS, {"shipTypes": types});
    });
});

// Override sheetConfig with Starscape sheet (TOML).
Hooks.once('pbtaSheetConfig', () => {
    const ssActorSheet = SSActorSheetMixin(game.pbta.applications.actor.PbtaActorSheet);
    Actors.unregisterSheet('pbta', game.pbta.applications.actor.PbtaActorSheet, { types: ['character'] });
    Actors.registerSheet('pbta', ssActorSheet, {
        types: ['character'],
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

