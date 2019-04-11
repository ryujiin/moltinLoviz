<template lang="pug">
v-footer(color="primary lighten-1" height="auto")
  v-layout(justify-center row wrap)
    v-btn(v-for="link in links" :key="link" color="white" flat round) {{link}}
    v-flex(primary lighten-2 py-3 text-xs-center white--text xs12)
      | © 2019 —
      strong LOVIZ DC LLC. ALL RIGHTS RESERVED
</template>

<script>
export default {
  data () {
    return {
      links: [
        'Order Status', 'Shipping', 'Return & Exchanges', 'Terms of Service'
      ]
    }
  }
}
</script>
