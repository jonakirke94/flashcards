<script>
  export let tooltip = "";

  export let size = "l"; // ["s", "m", "l"]
  export let theme = "white";

  export let registerFocus = () => {};

  $: sizeClasses = {
    l: "h-16 w-16",
    m: "h-12 w-12",
    s: "h-8 w-8",
  }[size];

  $: themeClasses = {
    white: "bg-white focus-within:ring-indigo-500",
    yellow: "bg-yellow-50 focus-within:ring-yellow-500",
    purple: "bg-purple-50 focus-within:ring-purple-500",
  }[theme];
</script>

<div class="flex flex-col items-center">
  <button
    use:registerFocus
    title={tooltip}
    class="{themeClasses} {sizeClasses} dark:bg-gray-700 dark:text-white dark:focus-within:ring-black rounded-md border-none flex items-center justify-center flex-shrink-0 focus-within:ring-2 focus-within:ring-offset-2"
    on:click
  >
    <slot name="icon" />
  </button>
  <slot />
</div>
