<script>
  import BaseButtonRounded from "./base/BaseButtonRounded.svelte";
  import IconMoon from "./icons/IconMoon.svelte";
  import IconMoonSolid from "./icons/IconMoonSolid.svelte";

  export let isDarkMode = false;
</script>

<BaseButtonRounded
  theme={isDarkMode ? "darkPurple" : "purple"}
  size="m"
  on:click
  tooltip={isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
>
  <span slot="icon">
    {#if isDarkMode}
      <IconMoonSolid class="h-8 w-8 text-white" />
    {:else}
      <IconMoon class="h-8 w-8 text-purple-700" />
    {/if}
  </span>
</BaseButtonRounded>
