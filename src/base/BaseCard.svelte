<script>
  export let title;

  export let color = "red";

  $: theme = {
    backgroundImage: `bg-striped-${color}`,
  };
</script>

<div class="relative w-full">
  <div class="flex flex-col items-center z-10">
    <!-- Header -->
    <div class="py-4 px-4  ">
      <slot name="header">
        <h1 class="text-white font-semibold text-3xl">{title}</h1>
      </slot>
    </div>

    <!-- Body -->
    <div
      class="py-4 px-4 relative flex-1 flex items-center w-full text-xl text-center"
    >
      <slot />
    </div>

    <!-- Footer -->
    <div class="py-4 px-8 flex space-x-8 ">
      <slot name="footer" />
    </div>
  </div>
  <div class="{theme.backgroundImage} absolute h-full w-full inset-0" />
</div>

<style>
  .bg-striped-red,
  .bg-striped-red::before {
    background: linear-gradient(
        117.88deg,
        rgba(254, 226, 226, 0.2) 2.87%,
        /* bg-red-100 */ rgba(239, 68, 68, 0.5) 99.42% /* bg-red-700 */
      ),
      url("/images/striped-pattern.svg") top center repeat-x, rgb(185, 28, 28); /* bg-red-700 */
    background-size: cover;
    z-index: -1;
  }

  .bg-striped-green,
  .my-bg-striped-green::before {
    background: linear-gradient(
        117.88deg,
        rgba(209, 250, 229, 0.2) 2.87%,
        /* bg-green-100 */ rgba(4, 120, 87, 0.5) 99.42% /* bg-green-700 */
      ),
      url("/images/striped-pattern.svg") top center repeat-x, rgb(16, 185, 129); /* bg-green-700 */
    background-size: cover;
    z-index: -1;
  }

  .bg-striped-purple,
  .bg-striped-purple::before {
    background: linear-gradient(
        117.88deg,
        rgba(237, 233, 254, 0.2) 2.87%,
        /* bg-purple-100 */ rgba(139, 92, 246, 0.5) 99.42% /* bg-purple-700 */
      ),
      url("/images/striped-pattern.svg") top center repeat-x, rgb(109, 40, 217); /* bg-purple-700 */
    background-size: cover;
    z-index: -1;
  }
</style>
