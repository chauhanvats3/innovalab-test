import { createStore } from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
  users: []
}
export default createStore({
  state,
  getters,
  actions,
  mutations
})
