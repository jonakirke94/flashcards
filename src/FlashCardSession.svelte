<script>
  import { onMount } from "svelte";
  import deckApi from "./api/decks";

  import FlashCard from "./FlashCard.svelte";
  import Loader from "./Loader.svelte";

  import { QuestionProvider } from "./questionProvider/engine";

  export let slug;

  let isLoading = true;

  let questionProvider = null;

  onMount(async () => {
    deck = await deckApi.getBySlug(slug);

    questionProvider = new QuestionProvider(deck);
    currentCard = questionProvider.next();

    isLoading = false;
    console.log(deck);
  });

  export function onSuccess() {
    questionProvider.move(currentCard, 1);
    currentCard = questionProvider.next();
  }

  export function onFailure() {
    questionProvider.move(currentCard, -1);
    currentCard = questionProvider.next();
  }

  let currentCard = null;

  let deck = [];
</script>

<div class="max-w-3xl mx-auto w-full mt-8">
  <div class="flex justify-center items-center h-full mt-16">
    {#if isLoading}
      <Loader />
    {:else}
      <FlashCard
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
