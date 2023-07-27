export const addUsers = (state, payload) => {
  console.log(payload)
  state.users.push(...payload)
}
