<script>
  export let title;

  export let color = "yellow";

  const styles = {
    backgrounds: {
      yellow: "bg-yellow-100 border-yellow-800",
    },
    titles: {
      yellow: "text-yellow-900",
    },
    body: {
      yellow: "text-yellow-900",
    },
  };

  $: theme = {
    background: styles.backgrounds[color],
    title: styles.titles[color],
    body: styles.body[color],
  };
</script>

<div
  class="{theme.background} w-full relative flex flex-col items-center rounded-md"
>
  <!-- Header -->
  <div class="py-4 px-4">
    <slot name="header">
      <h1 class="{theme.title} font-semibold text-3xl">{title}</h1>
    </slot>
  </div>

  <!-- Body -->
  <div
    class="{theme.body} py-4 px-4 relative flex-1 flex items-center w-full text-xl text-center"
  >
    <slot />
  </div>

  <!-- Footer -->
  <div class="py-4 px-8 flex space-x-8">
    <slot name="footer" />
  </div>
</div>
