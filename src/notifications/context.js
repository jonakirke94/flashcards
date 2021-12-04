import { getContext } from "svelte";

// A context is a run-time construct that allows us to associate an arbitrary context object with a key.
// The context is then available to children of the component with getContext.
// getContext retrieves the context that belongs to the clost parent componet with the specific key. This is
// the primary difference from "just" using a shared object through javascript modules.

// The context object allows to use a shared notification store across all our components.

const context = {
  subscribe: null,
  addNotification: null,
  removeNotification: null,
  clearNotifications: null,
};

export const getNotificationsContext = () => getContext(context);

export default context;
