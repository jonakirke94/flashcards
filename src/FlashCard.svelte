<script>
  import { createEventDispatcher } from "svelte";
  import IconLightBulb from "./icons/IconLightBulb.svelte";
  import IconEmojiSad from "./icons/IconEmojiSad.svelte";
  import IconEye from "./icons/IconEye.svelte";
  import IconArchive from "./icons/IconArchive.svelte";
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
  export let name;

  export let registerFocus;
</script>

<BaseCard {color}>
  <!-- Body -->

  <div slot="header">
    <h1 class="text-white font-semibold text-3xl">{name} flashcards</h1>

    <span
      class="flex text-sm text-white font-semibold absolute right-2 top-2"
      title="Seen this card"
    >
      <IconEye class="text-gray-100 w-5 h-5 mr-1" />
      <span class="w-3 text-right">{card.seen}</span>
    </span>
    <span
      class="flex text-sm text-white font-semibold absolute right-2 top-8"
      title="Bucket"
    >
      <IconArchive class="text-gray-100 w-5 h-5 mr-1" />
      <!-- Bucket levels are zero-indexed so add 1 to make it user friendly -->
      <span class="w-3 text-right">{card.level + 1}</span>
    </span>
  </div>

  <!-- key'ing an element makes its content rerender if the key changes-->
  <!-- we need this to ensure the flip animation in "I know this -> I know this" sequences -->
  {#key card.id}
    <div class="h-64">
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
        <IconEmojiSad
          class="text-indigo-600 dark:text-white h-6 w-6"
          slot="icon"
        />
        <span class="action-text">Turn</span>
      </BaseButtonRounded>

      <BaseButtonRounded
        {registerFocus}
        tooltip="Show me the next question"
        on:click={() => dispatch("success")}
      >
        <IconLightBulb
          class="text-indigo-600 dark:text-white h-6 w-6"
          slot="icon"
        />
        <span class="action-text">I know this</span>
      </BaseButtonRounded>
    {:else}
      <BaseButtonRounded
        tooltip="Next card"
        on:click={() => dispatch("failure")}
      >
        <IconNext class="text-indigo-600 dark:text-white h-6 w-6" slot="icon" />
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
</style>
