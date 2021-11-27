const DeckApi = {
  base: location.origin,

  getDecks() {
    return fetch(`${this.base}/data/decks/index.json`).then((response) =>
      response.json()
    );
  },

  getBySlug(slug) {
    const path = `${this.base}/data/decks/${slug}.json`;
    return fetch(path).then((response) => response.json());
  },
};

export default DeckApi;
