/**
 * Define a set of template paths to pre-load
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    'modules/starscape-pbta/templates/actors/parts/actor-stats.hbs'
  ]);
};