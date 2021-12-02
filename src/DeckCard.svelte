<script>
  import { Link } from "svelte-navigator";

  export let deck;

  $: themeClasses = {
    red: "bg-red-50 border-red-200 focus-within:ring-red-500 hover:border-red-400",
    green:
      "bg-green-50 border-green-200 focus-within:ring-green-500 hover:border-green-400",
    purple:
      "bg-purple-50 border-purple-200 focus-within:ring-purple-500 hover:border-purple-400",
  }[deck.theme];
</script>

<li
  class="{themeClasses} relative border dark:bg-gray-700 dark:focus-within:ring-gray-800 dark:hover:border-gray-800 dark:border-gray-500 px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 focus-within:ring-offset-2"
>
  <div class="flex-shrink-0">
    <img class="h-10 w-10 rounded-full" src={deck.icon} alt="Deck Icon" />
  </div>
  <div class="flex-1 min-w-0">
    <Link to="/{deck.slug}" class="focus:outline-none">
      <span class="absolute inset-0" aria-hidden="true" />
      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {deck.name}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-200 truncate">
        {deck.description}
      </p>
    </Link>
  </div>
</li>
