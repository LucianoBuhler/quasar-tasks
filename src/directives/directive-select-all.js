export const selectAll = {
  mounted(el) {
    // Find the native input element within the Quasar field
    const input = el.querySelector('.q-field__native');

    // Define the focus event handler
    const focusHandler = () => {
      if (input.value.length) {
        input.select(); // Select all text if there is content
      }
    };

    // Add the focus event listener
    input.addEventListener('focus', focusHandler);

    // Store the handler for future reference
    el.__vueSelectAllFocusHandler__ = focusHandler;
  },
  
  // beforeUnmount(el) {
  //   // Remove the event listener before unmounting
  //   const input = el.querySelector('.q-field__native');
  //   if (input && el.__vueSelectAllFocusHandler__) {
  //     input.removeEventListener('focus', el.__vueSelectAllFocusHandler__);
  //     delete el.__vueSelectAllFocusHandler__;
  //   }
  // }
}