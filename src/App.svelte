<script>
  import { Router, Route, Link } from "svelte-navigator";
  import DeckCardList from "./DeckCardList.svelte";
  import FlashCard from "./FlashCard.svelte";
</script>

<Router>
  <header class="max-w-3xl mx-auto w-full mt-8">
    <nav>
      <Link to="/">Home</Link>
    </nav>
  </header>

  <main class="max-w-3xl mx-auto w-full mt-8">
    <Route path="/">
      <DeckCardList />
    </Route>

    <Route path="/:slug" let:params>
      <FlashCard slug={params.slug} />
    </Route>
  </main>
</Router>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
