<script>
  export let query;
</script>

<div class="mb-4">
  <label class="text-gray-700  dark:text-gray-200 font-semibold" for="search"
    >Search all decks</label
  >
  <input
    id="search"
    placeholder="Svelte"
    autocomplete="off"
    class="py-2 px-4 w-full rounded-md dark:bg-black dark:text-gray-100"
    type="search"
    bind:value={query}
  />
</div>
