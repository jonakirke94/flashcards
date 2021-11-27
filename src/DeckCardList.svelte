<script>
  import deckApi from "./api/decks";
  export const deckPromise = deckApi.getDecks();

  import DeckCard from "./DeckCard.svelte";
</script>

<h1>Pick a deck</h1>

{#await deckPromise}
  <!-- promise is pending -->
  <p>waiting for the promise to resolve...</p>
{:then decks}
  <ul class="space-y-4">
    {#each decks as deck (deck.slug)}
      <DeckCard {deck} />
    {/each}
  </ul>
{:catch error}
  <!-- promise was rejected -->
  <p>Something went wrong: {error.message}</p>
{/await}
