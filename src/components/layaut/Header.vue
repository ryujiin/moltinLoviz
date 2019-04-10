<template lang="pug">
header
  v-toolbar(fixed)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title Loviz DC
    v-spacer
    v-toolbar-items
      v-btn(icon)
        v-icon search
      v-btn(icon)
        v-icon shopping_cart
  v-navigation-drawer(absolute, temporary, v-model="drawer")
    v-list
      v-list-tile(v-for="item in items" :key="item.title" @click="navegar(item.link)")
        v-list-tile-action
          v-icon {{ item.icon }}
        v-list-tile-content
          v-list-tile-title  {{ item.title }}
</template>

<script>

export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'home', link: '/' },
        { title: 'Shop', link: 'shop' },
        { title: 'Custom', link: 'custom' }
      ]
    }
  },
  methods: {
    navegar (link) {
      console.log(link)
      this.$router.push(link)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
