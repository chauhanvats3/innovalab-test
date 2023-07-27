export const users = (state) => state.users

export const userCount = (state) => state.users.length

export const fewUsers = (state) => (page, howMany) => {
  console.log(howMany.value)
  let fromIndex = (page - 1) * howMany
  let result = state.users.slice(fromIndex, fromIndex + howMany)
  return result
}
