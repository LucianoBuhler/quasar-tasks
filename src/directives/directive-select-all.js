// select all text in field field when focus and it's not empty
export const selectAll = {
  inserted(el) {
    let input = el.querySelector('.q-field__native')
    input.addEventListener('focus', () => {
      if (input.value.length) {
        input.select()
      }
    })
  }
}
