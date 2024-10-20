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
                        label: "Body", // game.i18n.localize("RoB.CharacterSheets.stats.body"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: { label: "Guilty", value: false},
                            1: { label: "Selfish", value: false},
                        }   
                    },
                    brains: {
                        label: "Brains", // game.i18n.localize("RoB.CharacterSheets.stats.glass"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: { label: "Angry", value: false},
                            1: { label: "Reckless", value: false},
                        }   
                    },
                    courage: {
                        label: "Courage", // game.i18n.localize("RoB.CharacterSheets.stats.sulphur"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: { label: "Afraid", value: false},
                            1: { label: "Hopeless", value: false},
                        }   
                    },
                    heart: {
                        label: "Heart", // game.i18n.localize("RoB.CharacterSheets.stats.mercury"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: { label: "Depressed", value: false},
                            1: { label: "Resentful", value: false},
                        }   
                    },
                    savvy: {
                        label: "Savvy", // game.i18n.localize("RoB.CharacterSheets.stats.mercury"),
                        crashed: false,
                        value: 0,
                        conditions: {
                            0: { label: "Frustrated", value: false},
                            1: { label: "Insecure", value: false},
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
                                label: "Take a Specialty from your Background",
                                value: false,
                                values: {
                                    0: { value: false },
                                    1: { value: false },
                                    2: { value: false, advancements: 5 },
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
                                }
                            },
                            6: {
                                label: "Take a Move from any Playbook",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                    1: { value: false, advancements: 15 },
                                }
                            },
                            7: {
                                label: "Remove a Seeing Red trigger",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            8: {
                                label: "Mark four Investments for the ship",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            9: {
                                label: "Take a Specialty from another Background",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            10: {
                                label: "Choose another Ship Customization",
                                value: false, 
                                advancements: 10,
                                values: {
                                    0: { value: false },
                                }
                            },
                            11: {
                                label: "Reset your Stellar Move",
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
                            15: {
                                label: "Change Playbooks",
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
