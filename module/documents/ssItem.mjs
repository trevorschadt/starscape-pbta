export class SSItem extends pbta.documents.ItemPbta {
    static getDefaultArtwork(itemData) {
        switch (itemData.type) {
        case "starscape-pbta.background":
            return { img: "modules/game-icons-net/whitetransparent/backward-time.svg" };
        case "starscape-pbta.skill":    
            return { img: "modules/game-icons-net/whitetransparent/ribbon-medal.svg" };
        case "starscape-pbta.ship":
            return { img: "modules/game-icons-net/whitetransparent/spaceship.svg" };
        default:
            return super.getDefaultArtwork(itemData);
        }
    }

    static startingMoveSet = [{
                        advancement: 0,
                        choices: [],
                        desc: "Choose your starting moves",
                        grantOn: 1,
                        granted: false,
                        repeatable: false,
                        title: "Starting Moves",
                        type: "multi"
                    }];

    async _resetChoices() {
        await this.update({"system.choiceSets": SSItem.startingMoveSet});
    }

    async _preUpdate(data, options, userId) {
        await super._preUpdate(data, options, userId);
        if (this.type === "starscape-pbta.background") {
            if (data.system.slug === '' && this.system.slug === '') {
                data.system.slug = data.name.slugify();
            }

        }
    }

    _onCreate(data, options, userId) {
        if (this.type === "playbook") {
            if (this.parent) {
                if (this.parent.type === "character") {
                    const changes = {
                        "system.details": {
                            ... this.parent.system.details,
                            "connections": {
                                ... this.parent.system.details.connections,
                                "value": this.system.connections
                            },
                            "seeingRed": {
                                ... this.parent.system.details.seeingRed,
                                "value": this.system.seeingRed,
                            },
                            "stellarMove": {
                                ... this.parent.system.details.stellarMove,
                                "value": this.system.stellarMove,
                            },
                        }
                    };
                     this.parent.update(changes);
                }
            } else {
                if (this.system.choiceSets.length === 0) {
                    
                    this.update({
                        "system.choiceSets": startingMoveSet,
                        "system.moveImg": "modules/game-icons-net/whitetransparent/move.svg"
                    });
                }                
            }
        }
        super._onCreate(data, options, userId);
    }

    async _preCreate(data, options, userId) {
        await super._preCreate(data, options, userId);

        if (this.type === "starscape-pbta.background") {
            if (this.parent) {
                if (this.parent.type === "character") {
                    if (this.parent.playbook.slug === this.system.playbook) {
                        const changes = {
                            "system.background": { name: this.name, slug: this.system.slug, uuid: this._stats.compendiumSource ?? options.originalUuid, bonusStat: this.system.bonusStat },
                        }
                        const stats = foundry.utils.duplicate(this.parent.system.stats);
                        if (this.parent.system.background.bonusStat !== "") {
                            stats[this.parent.system.background.bonusStat].value--;
                        }
                        stats[this.system.bonusStat].value++;
                        changes["system.stats"] = stats;
                        await this.parent.update(changes);

                        const primarySpecialty = this.system.specialties.options.find(s => s.slug === this.system.specialties.value);

                        if (primarySpecialty) {
                            const item = CONFIG.SS.specialties.find(s => s.name === primarySpecialty.label)
                            if (item) {
                                await pbta.documents.ItemPbta.createDocuments([item.toObject()], {
                                    keepId: true,
                                    parent: this.parent,
                                    pack: this.actor.pack
                                });
                            }
                        }

                    } else {
                        // notify that this is an illegal combo
                    }

                }
            }
        }
    }

}
