export const getAllUsers = ({ commit }) => {
  fetch('https://jsonplaceholder.typicode.com/users/')
    .then((response) => response.json())
    .then((users) => commit('addUsers', users))
}
