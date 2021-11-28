<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let description;
  export let buttonText = "Clear query";

  const dispatch = createEventDispatcher();
</script>

<div
  class="text-center mt-12 border py-8 rounded-md bg-yellow-50 border-yellow-200 dark:bg-gray-600 dark:border-gray-200"
>
  <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
    {title}
  </h3>
  <p class="mt-1 text-sm text-gray-500 dark:text-gray-200">{description}</p>
  <div class="mt-6">
    <button
      on:click={() => dispatch("clear")}
      type="button"
      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-black bg-yellow-600 hover:bg-yellow-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-gray-500"
    >
      {buttonText}
    </button>
  </div>
</div>
