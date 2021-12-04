<script>
  import { onMount } from "svelte";
  import deckApi from "./api/decks";

  import FlashCard from "./FlashCard.svelte";
  import Loader from "./Loader.svelte";
  import Error from "./Error.svelte";

  import { getNotificationsContext } from "./notifications/context";

  import MOVES from "./flashcardEngine/moves";

  import { Engine as FlashCardEngine } from "./flashcardEngine/engine";

  import { useFocus } from "svelte-navigator";

  const registerFocus = useFocus();

  export let slug;

  let isLoading = true;

  let hasError = false;

  let questionProvider = null;

  onMount(async () => {
    try {
      deck = await deckApi.getBySlug(slug);

      var allDecks = await deckApi.getDecks();
      var currentDeck = allDecks.find((x) => x.slug === slug);

      color = currentDeck.theme;
      name = currentDeck.name;

      questionProvider = new FlashCardEngine(deck);
      currentCard = questionProvider.next();
    } catch (error) {
      hasError = true;
      console.error(error);
    } finally {
      isLoading = false;
    }
  });

  const { addNotification } = getNotificationsContext();

  function onStreak(streakCount) {
    addNotification({
      msg: "You are on a streak!",
      subtitle: `Your current streak is ${streakCount}`,
    });
  }

  export function onSuccess() {
    questionProvider.move(currentCard, MOVES.INCREMENT, onStreak);
    currentCard = questionProvider.next();
  }

  export function onFailure() {
    questionProvider.move(currentCard, MOVES.DECREMENT, onStreak);
    currentCard = questionProvider.next();
  }

  let currentCard = null;

  let deck = [];
  let color = "";
  let name = "";
</script>

<div class="max-w-3xl mx-auto w-full mt-8">
  <div class="flex justify-center items-center h-full mt-16">
    {#if isLoading}
      <Loader />
    {:else if hasError}
      <Error error="This deck does not exist" />
    {:else}
      <FlashCard
        {name}
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
