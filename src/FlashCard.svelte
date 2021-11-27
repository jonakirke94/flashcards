<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import deckApi from "./api/decks";

  export let slug;

  let hasLoaded = false;

  onMount(async () => {
    deck = await deckApi.getBySlug(slug);
    hasLoaded = true;
    console.log(deck);
  });

  let deck = [];
  let showFront = true;

  function handleFlip() {
    console.log("handling click");
    showFront = !showFront;
  }
</script>

<div class="max-w-3xl mx-auto w-full mt-8">
  <h1>Pick a question</h1>
  <div class="flex justify-center items-center h-full mt-16">
    {#if hasLoaded}
      <div class="w-full bg-yellow-100 h-96 rounded-md">
        {#if showFront}
          <div transition:fade>
            {deck[0].question}
          </div>
        {:else}
          <div transition:fade>
            {deck[0].answer}
          </div>
        {/if}
      </div>
    {/if}

    <button class="bg-yellow-400 py-2.5 px-6 rounded-md" on:click={handleFlip}
      >Flip</button
    >
  </div>
</div>

<svelte:head>
  <title>{slug}</title>
</svelte:head>
