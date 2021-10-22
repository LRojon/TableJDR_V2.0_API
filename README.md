# Sommaire

- [Infos](#infos)
- [Créatures](#créatures)
  - [Obtenir toutes les créatures](#obtenir-toutes-les-créatures)
  - [Obtenir une créature](#obtenir-une-créature)
  - [Obtenir tout les noms des créatures](#obtenir-tout-les-noms-des-créatures)
- [Personnages](#personnages)
  - [Obtenir tout les noms des personnages](#obtenir-tout-les-noms-des-personnages)
  - [Obtenir tout les personnages](#obtenir-tout-les-personnages)
  - [Obtenir un personnages](#obtenir-un-personnages)
  - [Créer ou modifier un personnage](#créer-ou-modifier-un-personnage)
  - [Supprimer un personnage](#supprimer-un-personnage)
- [Groupe](#groupe)

# Infos

Une API permettant de récupérer tout ou partie des créatures présentent dans le livres de base de Héros et Dragon.

<hr/>

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

<hr/>

# Personnages

## Obtenir tout les noms des personnages

```/players/get/all/name```

<details>
    <summary> Retour </summary>

```js
    [
        String,
        String,
        String,
        ...
    ]
```
  
</details>

## Obtenir tout les personnages

```/players/get/all```

<details>
    <summary> Retour </summary>

```js
[
    {
        name: String,
        hp: Number,
        speed: String,
        armor: Number,
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
        lvl: Number,
        mastery: [String]
    },
    ...
]
```

</details>

## Obtenir un personnages

```/players/get/id/<id>```  
```/players/get/name/<name>```

<details>
    <summary> Retour </summary>

```js
{
    name: String,
    hp: Number,
    speed: String,
    armor: Number,
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
    lvl: Number,
    mastery: [String]
}
```

</details>

## Créer ou modifier un personnage

```/players/set/one```

<details>
    <summary> Valeur d'envoie </summary>

```JS
{
    token: String,
    character: {
        name: String,
        hp: Number,
        speed: String,
        armor: Number,
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
        lvl: Number,
        mastery: [String]
    }
}
```

</details>  

<details>
    <summary> Retour </summary>

```201: Created successfully``` Si le nom est différent de ceux déjà présent  
```200: Updated successfully``` Si le nom est déjà utilisé

</details>

## Supprimer un personnage

```/players/del/one```
<details>
    <summary> Valeur d'envoie </summary>

```JS
{
    token: String,
    character_id: String
}
```
```token```: Obtenu lors de la connection via un compte.  
```owner```: Le pseudo du compte ayant créer le personnages.  

</details>  

Retour  

```200: Deleted successfully```  

<hr/>

# Groupe

Work in progress