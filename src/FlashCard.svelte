<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  let showFront = false;

  function handleFlip() {
    console.log("handling click");
    showFront = !showFront;
  }

  const dispatch = createEventDispatcher();

  export let card;
</script>

{#if showFront}
  <div transition:fade>
    {card.question}
  </div>
{:else}
  <div transition:fade>
    {card.answer}
  </div>
{/if}

<button class="bg-yellow-400 py-2.5 px-6 rounded-md" on:click={handleFlip}
  >Flip</button
>
<button
  class="bg-yellow-400 py-2.5 px-6 rounded-md"
  on:click={() => dispatch("success")}>Success</button
>
<button
  class="bg-yellow-400 py-2.5 px-6 rounded-md"
  on:click={() => dispatch("failure")}>Failure</button
>
