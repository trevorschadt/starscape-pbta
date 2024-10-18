import { configSheet } from "./helpers/config-sheet.mjs";

Hooks.once("init", () => {
    console.log("init");
    ActorSheet.defaultOptions.width = 980;
});
// Override sheetConfig with Starscape sheet (TOML).
Hooks.once('pbtaSheetConfig', () => {
  

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
