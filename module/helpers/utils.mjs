/**
 * Define a set of template paths to pre-load
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    'modules/starscape-pbta/templates/actors/parts/actor-stats.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-header.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-advancement.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-playbook.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-character.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-history.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-description.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-attributes.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-backstory.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-background.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-connections.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-personal-directive.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-ship-customization.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-seeing-red.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-stellar-move.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-movelist.hbs',
    'modules/starscape-pbta/templates/actors/parts/actor-class-movelist.hbs',
    'modules/starscape-pbta/templates/items/parts/playbook-starting-moves.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-descriptors.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-areas.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-captain.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-crewsize.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-propulsion.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-defenses.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-weapons.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-quirks.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-systems.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-system.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-investments.hbs',
    'modules/starscape-pbta/templates/items/parts/ship-upgrades.hbs',
    'modules/starscape-pbta/templates/common-parts/choice-of-string-options.hbs',
    'modules/starscape-pbta/templates/common-parts/multi-choice-of-object-options.hbs',
    'modules/starscape-pbta/templates/common-parts/sheet-block-label.hbs',
  ]);
};

export const preloadHandlebarsHelpers = async function () {

    Handlebars.registerHelper("list", function(context, options) {
        var out = "<ul>", data;
        if (options.data) {
            data = Handlebars.createFrame(options.data);
        }
        Object.entries(context).forEach(e => 
            out += "<li>" + options.fn(e, {data: data})) + "</li>";
        out += "</ul>";
        return out;
    });

    Handlebars.registerHelper("splitArray", function(items, groups, options) {
      let result = [];
      let splicer = items.slice();
      let itemsPer = Math.ceil(splicer.length / groups);
      for (let i=groups;i>0;i--) {
        let split = splicer.splice(0, Math.ceil(splicer.length / i))
          .map((item) => {return { item, rootIndex: items.indexOf(item) }});
        while (split.length < itemsPer) split.push({});
        result.push(split);
      }
      return result;
    });

    Handlebars.registerHelper("ifHasSkill", function(elem, list, options) {
        return list.find(i => i.name.slugify() === elem);
    });

    Handlebars.registerHelper("ifIn", function(elem, list, options) {
        return list.find(i => i.toString() === elem.toString());
    });

    Handlebars.registerHelper("ifHasBackgroundChoice", function(row, column, list, options) {
        return list.find(c => c === `${row}-${column}`);
    });

};