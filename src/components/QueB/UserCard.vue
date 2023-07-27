<script setup>
const props = defineProps(['user'])
</script>

<template>
  <div class="user-card">
    <div class="mid">
      <p class="name">{{ props.user.name }}</p>
      <p>{{ props.user.phone }}</p>
      <p>{{ props.user.email }}</p>
    </div>
    <div class="top">
      <p>@{{ props.user.username }}</p>

      <a :href="`https://${props.user.website}`" target="_blank">
        <p>🌐 {{ props.user.website }}</p></a
      >
    </div>
    <div class="company">
      <h2>{{ props.user.company.name }}</h2>
      <p>{{ props.user.company.catchPhrase }}</p>
    </div>
    <div class="address">
      <p>{{ props.user.address.suite }}</p>
      <p>{{ props.user.address.street }}</p>
      <p>{{ props.user.address.city }}</p>
      <p>{{ props.user.address.zipcode }}</p>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  background: #252525;
  border-radius: 10px;
  color: white;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  padding-bottom: 0;
  width: 25vw;
}
.top {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 10px;
}
.top p {
  background: #202020;
  border-radius: 5px;
  padding: 5px 15px;
}
.mid {
  padding: 5px 20px;
  margin: 5px 0;
}
.mid .name {
  font-size: 1.5rem;
}

.company,
.address {
  background: #202020;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  position: relative;
}
.company p {
  font-size: 0.85rem;
}
.company::before,
.address::before {
  content: 'Company';
  position: absolute;
  background: gray;
  padding: 2px 10px;
  top: -5px;
  right: -4px;
  font-size: 0.5rem;
  border-radius: 2px;
  color: #252525;
  font-weight: 600;
}
.address::before {
  content: 'Address';
}
</style>
