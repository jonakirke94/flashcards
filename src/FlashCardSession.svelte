<script>
  import { onMount } from "svelte";
  import deckApi from "./api/decks";

  import FlashCard from "./FlashCard.svelte";
  import Loader from "./Loader.svelte";

  import MOVES from "./questionProvider/moves";

  import { QuestionProvider } from "./questionProvider/engine";

  import { useFocus } from "svelte-navigator";

  const registerFocus = useFocus();

  export let slug;

  let isLoading = true;

  let questionProvider = null;

  onMount(async () => {
    deck = await deckApi.getBySlug(slug);

    var deckInfo = await deckApi.getDecks();
    color = deckInfo.find((x) => x.slug === slug).theme;

    questionProvider = new QuestionProvider(deck);
    currentCard = questionProvider.next();

    isLoading = false;
  });

  export function onSuccess() {
    questionProvider.move(currentCard, MOVES.INCREMENT);
    currentCard = questionProvider.next();
  }

  export function onFailure() {
    questionProvider.move(currentCard, MOVES.DECREMENT);
    currentCard = questionProvider.next();
  }

  let currentCard = null;

  let deck = [];
  let color = "";
</script>

<div class="max-w-3xl mx-auto w-full mt-8">
  <div class="flex justify-center items-center h-full mt-16">
    {#if isLoading}
      <h3>Loading..</h3>
      <Loader />
    {:else}
      <FlashCard
        {registerFocus}
        {color}
        card={currentCard}
        on:success={onSuccess}
        on:failure={onFailure}
      />
    {/if}
  </div>
</div>

<svelte:head>
  <title>{slug}</title>
</svelte:head>
