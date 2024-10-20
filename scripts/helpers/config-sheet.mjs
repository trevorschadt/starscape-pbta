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
                        label: "XP",
                        description: "When you roll a miss, or when a move says to, mark XP. Mark an advance every time you fill up the bar.",
                        customLabel: false,
                        userLabel: false,
                        position: "Left",
                        type: "Xp",
                        max: 5
                    },
                    trust: {
                        label: "Trust",
                        customLabel: false,
                        userLabel: false,
                        position: "Left",
                        type: "ListOne",
                        value: 2,
                        options: {
                            0: {
                                label: "Esteemed (5)",
                                value: false
                            },
                            1: {
                                label: "Respected (4)",
                                value: false
                            },
                            2: {
                                label: "Trusted (3)",
                                value: true
                            },
                            3: {
                                label: "Doubted (2)",
                                value: false
                            },
                            4: {
                                label: "Suspected (1)",
                                value: false
                            },
                            5: {
                                label: "Distrusted (0)",
                                value: false
                            },
                        }
                    },
                    skills: {
                        label: "Skills",
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
                        label: "Advancements",
                        type: "ListMany",
                        position: "Left",
                        customLabel: false,
                        userLabel: false,
                        options: {
                            0: {
                                label: "Take a new Skill from your Background",
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false, advancements: 5 },
                                }
                            },
                            1: {
                                label: "Take another Move from your Playbook",
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false },
                                    2: { value: false, advancements: 5 },
                                }
                            },
                            2: {
                                label: "Add +1 to a stat (max +2)",
                                value: false,
                                values: {
                                    0: { value: false },
                                }
                            },
                            3: {
                                label: "Mark two Investments for the ship",
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false }
                                }
                            },
                            4: {
                                label: "Clear a permanent Condition",
                                value: false, 
                                advancements: 5,
                                values: {
                                    0: { value: false },
                                }
                            },
                            5: {
                                label: "Mark three Investments for the ship",
                                value: false, 
                                advancements: 5,
                                values: {
                                    0: { value: false },
                                    1: { value: false, advancements: 10 },
                                    2: { value: false, advancements: 15 },
                                }
                            },
                            6: {
                                label: "Change a Seeing Red trigger",
                                value: false, 
                                advancements: 5,
                                values: {
                                    0: { value: false },
                                }
                            },
                            7: {
                                label: "Take a Move from any Playbook",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                    1: { value: false, advancements: 15 },
                                }
                            },
                            8: {
                                label: "Remove a Seeing Red trigger",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            9: {
                                label: "Take a Specialty from any Background",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            10: {
                                label: "Take the Skill you crossed off",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            11: {
                                label: "Change Playbooks",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            12: {
                                label: "Mark an Upgrade for the ship",
                                value: false, 
                                advancements: 15,
                                values: {
                                    0: { value: false },
                                }
                            },
                            13: {
                                label: "Take any Specialty from the master list",
                                value: false, 
                                advancements: 15,
                                values: {
                                    0: { value: false },
                                }
                            },
                            14: {
                                label: "Add Idolized as a new Trust level (6)",
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
                        label: "Summary",
                        value: "",
                        playbook: true
                    },
                    background: {
                        label: "Background",
                        value: "",
                        playbook: true
                    },
                    backstory: {
                        label: "Backstory",
                        value: "",
                        playbook: true
                    },
                    shipCustomization: {
                        label: "Ship Customization",
                        value: "",
                        playbook: true
                    },
                    seeingRed: {
                        label: "Seeing Red",
                        value: "",
                        playbook: true
                    },
                    connections: {
                        label: "Connections",
                        value: "",
                        playbook: true
                    },
                },
                moveTypes: {
                    basic: {
                        label: "Basic Moves",
                        creation: true,
                        playbook: false,
                        moves: []
                    },
                    crew: {
                        label: "Crew Moves",
                        creation: true,
                        playbook: false,
                        moves: []
                    },
                    class: {
                        label: "Class Moves",
                        moves: []
                    },
                    advanced: {
                        label: "Advanced Moves",
                        moves: []
                    },
                },
                equipmentTypes: {
                    gear: {
                        label: "Gear"
                    },
                    loot: {
                        label: "Loot"
                    },
                    background: {
                        label: "Background"
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
