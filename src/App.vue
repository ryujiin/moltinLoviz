<template lang="pug">
  v-app
    Header
    v-content
      router-view
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Header from './components/layaut/Header'
import MoltinService from '@/services/moltin.js'

export default {
  name: 'App',
  components: {
    HelloWorld, Header
  },
  data () {
    return {
      //
    }
  }
}
</script>
