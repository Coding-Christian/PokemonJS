class pokemonApiWrapper {
  constructor(endpoint) {
    this.data;
    this.url = `https://pokeapi.co/api/v2/${endpoint}`;
    this.req = new XMLHttpRequest();
    this.req.addEventListener('load', res => {
      this.__setData(JSON.parse(res.currentTarget.response));
    });
    this.__makeRequest();
  }
  __setData(data) {
    this.data = data;
  }
  __makeRequest() {
    this.req.open('GET', this.url);
    this.req.send();
  }
  getData() {
    return this.data;
  }
}
