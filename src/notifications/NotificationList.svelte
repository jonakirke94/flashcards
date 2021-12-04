<script>
  import Notification from "./Notification.svelte";

  import { setContext } from "svelte";

  import context from "./context";

  import store from "./store";

  setContext(context, store);

  export function onRemoveNotification(evt) {
    // custom data is available on the detail property on a custom event object
    // in this case, the data is the notification id
    store.removeNotification(evt.detail);
  }
</script>

<div
  class="absolute top-2 right-2  w-full pointer-events-none flex flex-col justify-end items-end space-y-2"
>
  <!-- Using a $ in front of a store is a shorthand for subscription to that store
       so it accesses the reactive value directly
  -->
  {#each $store as notification (notification.id)}
    <Notification {notification} on:removeNotification={onRemoveNotification} />
  {/each}
</div>

<slot />
