<script>
  import { createEventDispatcher } from "svelte";

  import IconFire from "../icons/IconFire.svelte";
  import IconX from "../icons/IconX.svelte";

  import { onDestroy } from "svelte";

  export let notification;

  const dispatch = createEventDispatcher();

  // deconstruct the passed notification object
  const { id, removeAfter } = notification;

  const removeNotificationHandler = () => {
    // dispatch an event so this component can be "dumb" and not having to know about the notification context/store
    dispatch("removeNotification", id);
  };

  let timeout = null;

  if (removeAfter) {
    timeout = setTimeout(removeNotificationHandler, removeAfter);
  }

  export function onExplicitRemove() {
    removeNotificationHandler();

    // also clear the current timer
    if (removeAfter && timeout) clearTimeout(timeout);
  }

  onDestroy(() => {
    // clear timeout to prevent memory leak just in case
    if (removeAfter && timeout) clearTimeout(timeout);
  });
</script>

<div
  class="max-w-md w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
>
  <div class="w-0 flex-1 p-2">
    <div class="flex items-start">
      <div class="flex-shrink-0 pt-0.5">
        <IconFire class="h-8 w-8 text-red-500" />
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {notification.msg}
        </p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-200">
          {notification.subtitle}
        </p>
      </div>
    </div>
  </div>
  <div class="flex border-l border-gray-200">
    <button
      on:click={onExplicitRemove}
      class="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600"
    >
      <IconX class="h-4 w-4 text-gray-700 dark:text-white" />
    </button>
  </div>
</div>
