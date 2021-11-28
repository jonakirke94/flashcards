<script>
  import { onMount } from "svelte";

  import { Router, Route, Link } from "svelte-navigator";
  import DeckCardList from "./DeckCardList.svelte";
  import FlashCardSession from "./FlashCardSession.svelte";
  import InputSearch from "./InputSearch.svelte";
  import ButtonDarkMode from "./ButtonDarkMode.svelte";

  import { toggle, setThemeOnLoad } from "./misc/darkmode";

  onMount(() => {
    isDarkMode = setThemeOnLoad();
  });

  function toggleDarkMode() {
    console.log("togglign dark mode");
    isDarkMode = toggle();
  }

  let isDarkMode = false;

  import { query } from "./stores/query";
</script>

<Router>
  <header class="max-w-3xl mx-auto flex justify-between w-full mt-8 ">
    <nav>
      <Link to="/">Home</Link>
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

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-white dark:bg-gray-800;
  }
</style>
