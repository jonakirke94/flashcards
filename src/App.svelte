<script>
  import { onMount } from "svelte";

  import { Router, Route, Link } from "svelte-navigator";
  import DeckCardList from "./DeckCardList.svelte";
  import FlashCardSession from "./FlashCardSession.svelte";
  import InputSearch from "./InputSearch.svelte";
  import ButtonDarkMode from "./ButtonDarkMode.svelte";
  import NotificationList from "./notifications/NotificationList.svelte";

  import { toggle, setThemeOnLoad } from "./misc/darkmode";

  onMount(() => {
    isDarkMode = setThemeOnLoad();
  });

  function toggleDarkMode() {
    isDarkMode = toggle();
  }

  let isDarkMode = false;

  import { query } from "./stores/query";
</script>

<NotificationList>
  <Router>
    <header class="max-w-3xl mx-auto flex justify-between w-full mt-8 ">
      <nav>
        <Link
          class="py-2 px-4 focus-within:ring-gray-800 rounded-md focus-within:ring-2 focus-within:ring-offset-2"
          to="/">Home</Link
        >
      </nav>

      <ButtonDarkMode on:click={toggleDarkMode} {isDarkMode} />
    </header>

    <main class="max-w-3xl mx-auto w-full mt-8">
      <Route path="/" primary={false}>
        <InputSearch bind:query={$query} />
        <DeckCardList />
      </Route>

      <Route path="/:slug" let:params>
        <FlashCardSession slug={params.slug} />
      </Route>
    </main>
  </Router>
</NotificationList>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-gray-100 dark:bg-gray-800;
  }
</style>
