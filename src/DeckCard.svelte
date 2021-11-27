<script>
  import { Link } from "svelte-navigator";

  export let deck;
</script>

<li
  class="relative rounded-lg border bg-yellow-50 border-yellow-200  px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-yellow-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
>
  <div class="flex-shrink-0">
    <img class="h-10 w-10 rounded-full" src={deck.icon} alt="" />
  </div>
  <div class="flex-1 min-w-0">
    <Link to="/{deck.slug}" class="focus:outline-none">
      <span class="absolute inset-0" aria-hidden="true" />
      <p class="text-sm font-medium text-gray-900">
        {deck.name}
      </p>
      <p class="text-sm text-gray-500 truncate">{deck.description}</p>
    </Link>
  </div>
</li>
