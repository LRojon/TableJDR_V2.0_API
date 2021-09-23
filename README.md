# Sommaire

- [Infos](#infos)
- [Créatures](#créatures)
  - [Obtenir toutes les créatures](#obtenir-toutes-les-créatures)
  - [Obtenir une créature](#obtenir-une-créature)
  - [Obtenir tout les noms des créatures](#obtenir-tout-les-noms-des-créatures)

# Infos

Une API permettant de récupérer tout ou partie des créatures présentent dans le livres de base de Héros et Dragon.

# Créatures

## Obtenir toutes les créatures

``` /creatures/get/all ```

<details>
    <summary> Retour </summary>

    ```js
        [
            {
                name: String,
                type: String,
                size: String,
                hp: {
                    stable: Number,
                    random: String
                },
                speed: Number,
                stats: {
                    str: {
                        val: Number,
                        mod: Number
                    },
                    dex: {
                        val: Number,
                        mod: Number
                    },
                    con: {
                        val: Number,
                        mod: Number
                    },
                    int: {
                        val: Number,
                        mod: Number
                    },
                    wis: {
                        val: Number,
                        mod: Number
                    },
                    cha: {
                        val: Number,
                        mod: Number
                    }
                },
                skills: [String],
                senses: [String],
                languages: [String],
                dangerousness: String,
                xp: Number,
                abilities: [
                    {
                        name: String,
                        effect: String
                    }
                ],
                actions: [
                    {
                        name: String,
                        effect: {
                            name: String,
                            accuracy: Number,
                            range: String,
                            numTarget: Number
                        },
                        dmg: {
                            stable: Number,
                            random: String
                        }
                    }
                ]
            }
        ]
    ```
  
</details>  
  
## Obtenir une créature

``` /creatures/get/id/<id> ```  
``` /creatures/get/name/<name> ```


<details>
    <summary> Retour </summary>

    ```js
        {
            name: String,
            type: String,
            size: String,
            hp: {
                stable: Number,
                random: String
            },
            speed: Number,
            stats: {
                str: {
                    val: Number,
                    mod: Number
                },
                dex: {
                    val: Number,
                    mod: Number
                },
                con: {
                    val: Number,
                    mod: Number
                },
                int: {
                    val: Number,
                    mod: Number
                },
                wis: {
                    val: Number,
                    mod: Number
                },
                cha: {
                    val: Number,
                    mod: Number
                }
            },
            skills: [String],
            senses: [String],
            languages: [String],
            dangerousness: String,
            xp: Number,
            abilities: [
                {
                    name: String,
                    effect: String
                }
            ],
            actions: [
                {
                    name: String,
                    effect: {
                        name: String,
                        accuracy: Number,
                        range: String,
                        numTarget: Number
                    },
                    dmg: {
                        stable: Number,
                        random: String
                    }
                }
            ]
        }
    ```
  
</details>

## Obtenir tout les noms des créatures

``` /creatures/get/all/name ```


<details>
    <summary> Retour </summary>

    ```js
        [
            String,
            String,
            String
        ]
    ```
  
</details>
