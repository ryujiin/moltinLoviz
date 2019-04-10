<template lang="pug">
v-navigation-drawer(dark, absolute, temporary, v-model="drawer")
  v-list
    v-list-tile(v-for="item in items" :key="item.title" @click="")
      v-list-tile-action
        v-icon {{ item.icon }}
      v-list-tile-content
        v-list-tile-title  {{ item.title }}
</template>

<script>
export default {
  props: ['drawer'],
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Account', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
