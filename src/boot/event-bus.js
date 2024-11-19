import { reactive } from 'vue';

// Reactive object for events
const eventBus = reactive({
  events: {},
  $on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  $emit(event, payload) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(payload));
    }
  },
  $off(event) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }
});

export default eventBus;