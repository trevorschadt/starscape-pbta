Hooks.once('init', () => {
        CONFIG.Item.documentClass = SSItem;
    });

export class SSItem extends pbta.documents.ItemPbta {
    static getDefaultArtwork(itemData) {
        if (itemData.type === "starscape-pbta.background") {
            return { img: "modules/game-icons-net/whitetransparent/backward-time.svg" };
        }
        // TODO: Skill, ship, ship type, etc.
        return super.getDefaultArtwork(itemData);
    }

    async _preCreate(data, options, userId) {
        await super._preCreate(data, options, userId);
        if (this.type === "starscape-pbta.background" && this.parent) {
            if (!this.parent.system.playbook) {
                // notify and cancel
            }
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
        }
    }
}
