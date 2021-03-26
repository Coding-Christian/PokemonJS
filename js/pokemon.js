class Pokemon {
  constructor(dexNum) {
    this.http;
    this.info = {
      abilities: [],
      stats: [],
      forms: [],
      moves: [],
      basicInfo: {
        id: 0,
        name: '',
        nickname: '',
        height: 0,
        weight: 0,
        exp: 0
      },
      sprites: {
        default: '',
        shiny: ''
      }
    };

    if (dexNum > 898 || dexNum < 0) {
      return;
    } else {
      this.__fetchData(dexNum);
    }
  }

  __fetchData(dexNum) {
    this.http = new pokemonApiWrapper(`pokemon/${dexNum}`);
    this.__trySetInfo(this.http.getData());
  }

  __trySetInfo(info) {
    if (!info) {
      return setTimeout(() => this.__trySetInfo(this.http.getData()), 1000);
    }
    this.__mapData(info);
  }

  __mapData(info) {
    this.info = {
      abilities: info.abilities,
      stats: info.stats,
      forms: info.forms,
      moves: info.moves,
      basicInfo: {
        id: info.id,
        name: info.name,
        nickname: 'Old Man Jenkins',
        height: info.height,
        weight: info.weight,
        exp: info.base_experience
      },
      sprites: {
        default: info.sprites.front_default,
        shiny: info.sprites.front_shiny
      }
    };
  }

  getInfo() {
    return this.info;
  }
}

function whosThatPokemon(pokemon) {
  const pokeInfo = pokemon.getInfo();
  let string =
    pokeInfo.basicInfo.nickname ||
    pokeInfo.basicInfo.name ||
    `Pokemon ${pokeInfo.basicInfo.id || 0}`;
  return `It's ${string}!`;
}
