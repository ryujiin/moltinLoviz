<template lang="pug">
.code_promo.mb-4
  .codigo(v-if="!promotion")
    v-layout
      .subheading Have a promo code?
    v-layout(align-center row fill-height)
      v-flex(xs8 sm10 grow pa-1)
        v-text-field(label="Gift card or discount code" v-model="code" :error-messages="messageError")
      v-flex(xs4 sm2 grow pa-1)
        v-btn.text-uppercase(:disabled="code.length < 4" block color="deep-orange" class="white--text", :loading="loading" @click="applyCode")
          span.hidden-xs-only Apply
          v-icon.hidden-sm-only arrow_forward
  .conCodigo(v-else)
    v-layout()
      v-flex(xs12)
        v-card(color="#26c6da" dark)
          v-card-title
            v-icon(large left) redeem
            span(class="title font-weight-light")  {{promotion.name}}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      code: '',
      loading: false,
      messageError: ''
    }
  },
  computed: {
    ...mapGetters(['getItemsCart']),
    promotion () {
      return this.getItemsCart.find(i => i.type === 'promotion_item')
    }
  },
  methods: {
    ...mapActions(['AddPromotionToCart']),
    applyCode () {
      this.loading = true
      this.AddPromotionToCart(this.code).then(res => {
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.messageError = 'This code did not match any active gift card or discount. Was it entered correctly?'
        this.code = ''
        console.log(error)
      })
    },
    borrarMessageError () {
      if (this.code.length > 3) {
        this.messageError = ''
      }
    }
  },
  watch: {
    'code': 'borrarMessageError'
  }
}
</script>
