<script>
  import { createEventDispatcher } from "svelte";

  import IconTurn from "./icons/IconTurn.svelte";
  import IconSuccess from "./icons/IconSuccess.svelte";
  import IconNext from "./icons/IconNext.svelte";
  import BaseCard from "./base/BaseCard.svelte";

  import { flipHorizontally, flipVertically } from "./misc/customTransitions";

  let showFront = true;

  let isFlipping = false;

  function handleFlip() {
    isFlipping = true;
    showFront = !showFront;
  }

  // Flip the card back when the card value is changed
  $: card, ((showFront = true), (isFlipping = false));

  $: flipTransition = isFlipping ? flipVertically : flipHorizontally;

  const dispatch = createEventDispatcher();

  export let card;
</script>

<BaseCard title="Svelte flashcards" theme="yellow">
  <!-- Body -->

  {#key card.id}
    <div class="card h-64">
      {#if showFront}
        <div
          transition:flipTransition
          class="side border-t border-b bg-yellow-50"
        >
          Q: {card.question}
        </div>
      {:else}
        <div transition:flipTransition class="side border-t border-b back">
          A: {card.answer}
        </div>
      {/if}
    </div>
  {/key}

  <!-- Footer -->
  <div class="flex space-x-8" slot="footer">
    {#if showFront}
      <div class="flex flex-col items-center">
        <button
          title="Show me the answer"
          class="h-16 w-16 rounded-full bg-yellow-50 border-none flex items-center justify-center flex-shrink-0"
          on:click={handleFlip}
        >
          <IconTurn classes="text-yellow-600 h-6 w-6" />
        </button>
        Turn
      </div>

      <div class="flex flex-col items-center">
        <button
          title="Show me the next question"
          class="h-16 w-16 rounded-full bg-yellow-50 border-none flex items-center justify-center flex-shrink-0"
          on:click={() => dispatch("success")}
        >
          <IconSuccess classes="text-yellow-600 h-6 w-6" />
        </button>
        I know this
      </div>
    {:else}
      <div class="flex flex-col items-center">
        <button
          title="Next card"
          class="h-16 w-16 rounded-full bg-yellow-50 border-none flex items-center justify-center flex-shrink-0"
          on:click={() => dispatch("failure")}
        >
          <IconNext classes="text-yellow-600 h-6 w-6" />
        </button>
        Next card
      </div>
    {/if}
  </div>
</BaseCard>

<style>
  .card {
    width: 100%;
    height: 100%;
    position: absolute;
    perspective: 600;
    margin-left: -1rem;
  }

  .side {
    @apply absolute flex items-center justify-center;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
