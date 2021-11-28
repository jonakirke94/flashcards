<script>
  import DeckCard from "./DeckCard.svelte";
  import ListEmpty from "./ListEmpty.svelte";
  import Loader from "./Loader.svelte";
  import deckApi from "./api/decks";
  import { onMount } from "svelte";

  import { query } from "./stores/query";

  let isLoading = true;

  let decks = [];

  onMount(async () => {
    decks = await deckApi.getDecks();
    isLoading = false;
  });

  $: filteredDecks = decks.filter((deck) => {
    return deck.slug.toLowerCase().includes($query.toLowerCase());
  });

  function clearQuery() {
    $query = "";
  }
</script>

{#if isLoading}
  <Loader />
{:else if !filteredDecks.length}
  <ListEmpty
    title="No decks found"
    description="No deck matched your query"
    on:clear={clearQuery}
  />
{:else}
  <ul class="space-y-4">
    {#each filteredDecks as deck (deck.slug)}
      <DeckCard {deck} />
    {/each}
  </ul>
{/if}
