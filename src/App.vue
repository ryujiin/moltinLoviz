<template lang="pug">
  v-app
    Header
    v-content()
      router-view
    Footer
</template>

<script>
import Header from './components/layaut/Header'
import Footer from '@/components/layaut/Footer'

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>
