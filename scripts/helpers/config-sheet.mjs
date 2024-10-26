export const configSheet = async () => {
    // Pass Starsheet sheet object to sheetConfig
    game.pbta.sheetConfig = {
        rollFormula: "2d6",
        minMod: -1,
        maxMod: 2,
        rollResults: {
            failure: {
                start: null,
                end: 6,
                label: game.i18n.localize("Starscape.CharacterSheets.rollResults.complications")
            },
            partial: {
                start: 7,
                end: 9,
                label: game.i18n.localize("Starscape.CharacterSheets.rollResults.partial")
            },
            success: {
                start: 10,
                end: null,
                label: game.i18n.localize("Starscape.CharacterSheets.rollResults.success")
            }
        },
        actorTypes: {
            character: {
                stats: {
                    body: {
                        label: game.i18n.localize("Starscape.CharacterSheets.stats.body.label"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.body.conditions.guilty"),
                                value: 0
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.body.conditions.selfish"),
                                value: 0
                            },
                        }
                    },
                    brains: {
                        label: game.i18n.localize("Starscape.CharacterSheets.stats.brains.label"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.brains.conditions.angry"),
                                value: 0
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.brains.conditions.reckless"),
                                value: 0
                            },
                        }
                    },
                    courage: {
                        label: game.i18n.localize("Starscape.CharacterSheets.stats.courage.label"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.courage.conditions.afraid"),
                                value: 0
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.courage.conditions.hopeless"),
                                value: 0
                            },
                        }
                    },
                    heart: {
                        label: game.i18n.localize("Starscape.CharacterSheets.stats.heart.label"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.heart.conditions.depressed"),
                                value: 0
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.heart.conditions.resentful"),
                                value: 0
                            },
                        }
                    },
                    savvy: {
                        label: game.i18n.localize("Starscape.CharacterSheets.stats.savvy.label"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.savvy.conditions.frustrated"),
                                value: 0
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.stats.savvy.conditions.insecure"),
                                value: 0
                            },
                        }
                    }
                },
                attributes: {
                    xp: {
                        label: game.i18n.localize("Starscape.CharacterSheets.xp.label"),
                        description: game.i18n.localize("Starscape.CharacterSheets.xp.description"),
                        customLabel: false,
                        userLabel: false,
                        position: "Left",
                        type: "Xp",
                        max: 5
                    },
                    trust: {
                        label: game.i18n.localize("Starscape.CharacterSheets.trust.label"),
                        customLabel: false,
                        userLabel: false,
                        position: "Left",
                        type: "ListOne",
                        value: 3,
                        options: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.6"),
                                value: false,
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.5"),
                                value: false
                            },
                            2: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.4"),
                                value: false
                            },
                            3: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.3"),
                                value: true
                            },
                            4: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.2"),
                                value: false
                            },
                            5: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.1"),
                                value: false
                            },
                            6: {
                                label: game.i18n.localize("Starscape.CharacterSheets.trust.levels.0"),
                                value: false
                            },
                        }
                    },
                    skills: {
                        label: game.i18n.localize("Starscape.CharacterSheets.skills.label"),
                        customLabel: false,
                        userLabel: false,
                        position: "Left",
                        type: "ListMany",
                        condition: true,
                        options: {
                            0: {
                                label: "[Text]",
                                value: false 
                            },
                            1: {
                                label: "[Text]",
                                value: false 
                            },
                            2: {
                                label: "[Text]",
                                value: false 
                            },
                            3: {
                                label: "[Text]",
                                value: false 
                            }
                        }
                    },
                    advancements: {
                        label: game.i18n.localize("Starscape.CharacterSheets.advancements.label"),
                        type: "ListMany",
                        position: "Left",
                        customLabel: false,
                        userLabel: false,
                        options: {
                            0: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.specialtyFromYourBackground"),
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false },
                                    2: { value: false, advancements: 5 },
                                }
                            },
                            1: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.moveFromYourPlaybook"),
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false },
                                    2: { value: false, advancements: 5 },
                                }
                            },
                            2: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.addToStat"),
                                value: false,
                                values: {
                                    0: { value: false },
                                }
                            },
                            3: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.twoInvestments"),
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false }
                                }
                            },
                            4: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.clearCondition"),
                                value: false, 
                                advancements: 5,
                                values: {
                                    0: { value: false },
                                }
                            },
                            5: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.threeInvestments"),
                                value: false, 
                                advancements: 5,
                                values: {
                                    0: { value: false }
                                }
                            },
                            6: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.moveFromAnyPlaybook"),
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                    1: { value: false, advancements: 15 },
                                }
                            },
                            7: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.removeSeeingRedTrigger"),
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            8: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.fourInvestments"),
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false }
                                }
                            },
                            9: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.specialtyFromAnotherBackground"),
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            10: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.shipCustomization"),
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            11: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.resetStellarMove"),
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            12: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.shipUpgrade"),
                                value: false, 
                                advancements: 15,
                                values: {
                                    0: { value: false },
                                }
                            },
                            13: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.specialtyFromMasterList"),
                                value: false, 
                                advancements: 15,
                                values: {
                                    0: { value: false },
                                }
                            },
                            14: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.changePlaybooks"),
                                value: false, 
                                advancements: 15,
                                values: {
                                    0: { value: false },
                                }
                            },
                            15: {
                                label: game.i18n.localize("Starscape.CharacterSheets.advancements.trust6"),
                                value: false, 
                                advancements: 15,
                                values: {
                                    0: { value: false },
                                }
                            },
                        }
                    }
                },
                details: {
                    playbookSummary: {
                        label: game.i18n.localize("Starscape.CharacterSheets.details.summary"),
                        value: "",
                        playbook: true
                    },
                    background: {
                        label: game.i18n.localize("Starscape.CharacterSheets.details.background"),
                        value: "",
                        playbook: true
                    },
                    backstory: {
                        label: game.i18n.localize("Starscape.CharacterSheets.details.backstory"),
                        value: "",
                        playbook: true
                    },
                    shipCustomization: {
                        label: game.i18n.localize("Starscape.CharacterSheets.details.shipCustomization"),
                        value: "",
                        playbook: true
                    },
                    seeingRed: {
                        label: game.i18n.localize("Starscape.CharacterSheets.details.seeingRed"),
                        value: "",
                        playbook: true
                    },
                    connections: {
                        label: game.i18n.localize("Starscape.CharacterSheets.details.connections"),
                        value: "",
                        playbook: true
                    }
                },
                moveTypes: {
                    basic: {
                        label: game.i18n.localize("Starscape.moveTypes.character.basic"),
                        creation: true,
                        playbook: false,
                        moves: []
                    },
                    crew: {
                        label: game.i18n.localize("Starscape.moveTypes.character.crew"),
                        creation: true,
                        playbook: false,
                        moves: []
                    },
                    class: {
                        label: game.i18n.localize("Starscape.moveTypes.character.class"),
                        moves: []
                    },
                },
                equipmentTypes: {
                    gear: {
                        label: "Gear"
                    },
                    loot: {
                        label: "Loot"
                    }
                }
            },
            npc: {
                attributes: {
                    conditions: {
                        label: "Conditions",
                        description: null,
                        customLabel: false,
                        userLabel: false,
                        position: "Left",
                        type: "ListMany",
                        condition: false,
                        options: {
                            0: { label: "Text", value: false },
                            1: { label: "Text", value: false },
                            2: { label: "Text", value: false },
                            3: { label: "Text", value: false },
                            4: { label: "Text", value: false },
                            5: { label: "Text", value: false },
                        }
                    }
                },
                moveTypes: {
                    reactions: {
                        label: "Reactions",
                        moves: []
                    }
                }
            }
        }
    };
};
