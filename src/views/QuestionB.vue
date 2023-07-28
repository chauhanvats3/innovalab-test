<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import UserCard from '../components/QueB/UserCard.vue'

const store = useStore()
let currentPage = ref(1)
let eachPageUserCount = ref(3)
const eachPageUserCountptions = ref([
  { text: 'Three', value: 3 },
  { text: 'Five', value: 5 },
  { text: 'Seven', value: 7 },
  { text: 'Ten', value: 10 }
])

let totalUsers = computed(() => store.getters.userCount)
let usersToShow = computed(() => store.getters.fewUsers(currentPage.value, eachPageUserCount.value))
let possiblePageOptions = computed(() => {
  return Math.ceil(totalUsers.value / eachPageUserCount.value)
})
</script>
<template>
  <div class="que-b">
    <div class="settings">
      <div class="page-options">
        <div class="results">
          <label for="resultPerPage">Results Per Page</label>
          <select
            name="resultsPerPage"
            id="resultPerPage"
            v-model="eachPageUserCount"
            @change="() => (currentPage = 1)"
          >
            <option disabled value="">Select Option</option>
            <option
              v-for="option in eachPageUserCountptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="number">
          <label for="resultPerPage">Page Number</label>
          <select name="pageNumber" id="pageNumber" v-model="currentPage">
            <option disabled value="">Select Page</option>
            <option v-for="n in possiblePageOptions" :value="n" :key="n">{{ n }}</option>
          </select>
        </div>
      </div>
      <div class="search"></div>
      <div class="filter"></div>
    </div>
    <div class="users">
      <div class="user" v-for="eachUser in usersToShow" :key="eachUser.id">
        <UserCard :user="eachUser" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.que-b {
  width: 100%;
  min-height: calc(100% - 70px);
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
}
.settings {
  width: 100%;
}
.settings .page-options {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  justify-content: space-between;
}
.results > * {
  margin: 5px 10px;
}
.users {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  margin: 25px;
}
.users .user {
  margin: 10px 20px;
}
</style>
