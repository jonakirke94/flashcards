<script>
  import { createEventDispatcher } from "svelte";
  import IconEmojiHappy from "./icons/IconEmojiHappy.svelte";
  import IconEmojiSad from "./icons/IconEmojiSad.svelte";
  import IconNext from "./icons/IconNext.svelte";
  import BaseCard from "./base/BaseCard.svelte";
  import BaseButtonRounded from "./base/BaseButtonRounded.svelte";

  import { flipHorizontally, flipVertically } from "./misc/customTransitions";

  let showFront = true;

  let isFlipping = false;

  function handleFlip() {
    isFlipping = true;
    showFront = !showFront;
  }

  // Flip the card back when the card value is changed
  $: card, ((showFront = true), (isFlipping = false));

  $: flipTransition = isFlipping ? flipHorizontally : flipVertically;

  const dispatch = createEventDispatcher();

  export let card;
  export let color;

  export let registerFocus;
</script>

<BaseCard title="Svelte flashcards" {color}>
  <!-- Body -->

  <!-- key'ing an element makes its content rerender if the key changes-->
  <!-- we need this to ensure the flip animation in "I know this -> I know this" sequences -->
  {#key card.id}
    <div class="h-64">
      <span
        class="absolute text-sm -top-0 right-2 z-10 text-white font-semibold"
        >Seen this card: {card.seen}</span
      >
      <span
        class="absolute text-sm top-8 right-2 text-white z-10 font-semibold"
      >
        <!-- Bucket levels are zero-indexed so add 1 to make it user friendly -->
        Bucket: {card.level + 1}</span
      >
      <div class="flippable">
        {#if showFront}
          <div transition:flipTransition class="side text-white text-2xl">
            Q: {card.question}
          </div>
        {:else}
          <div transition:flipTransition class="side text-white text-2xl back">
            A: {card.answer}
          </div>
        {/if}
      </div>
    </div>
  {/key}

  <!-- Footer -->
  <div class="flex space-x-8" slot="footer">
    {#if showFront}
      <BaseButtonRounded tooltip="Show me the answer" on:click={handleFlip}>
        <IconEmojiSad classes="action-icon" slot="icon" />
        <span class="action-text">Turn</span>
      </BaseButtonRounded>

      <BaseButtonRounded
        {registerFocus}
        tooltip="Show me the next question"
        on:click={() => dispatch("success")}
      >
        <IconEmojiHappy class="action-icon" slot="icon" />
        <span class="action-text">I know this</span>
      </BaseButtonRounded>
    {:else}
      <BaseButtonRounded
        tooltip="Next card"
        on:click={() => dispatch("failure")}
      >
        <IconNext classes="action-icon" slot="icon" />
        <span class="action-text">Next card</span>
      </BaseButtonRounded>
    {/if}
  </div>
</BaseCard>

<style>
  .flippable {
    perspective: 600;
    @apply py-12 absolute h-full w-full top-0 left-0;
  }

  .side {
    @apply absolute flex items-center justify-center overflow-hidden h-full w-full top-0 left-0;
  }

  .action-text {
    @apply text-sm text-white font-semibold mt-1.5;
  }

  .action-icon {
    @apply text-indigo-600 dark:text-white h-6 w-6;
  }
</style>
