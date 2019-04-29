<template lang="pug">
v-form.step
  CodePromo
  v-layout(column)
    .title Payment method
    .body-1 All transactions are secure and encrypted.
  v-expansion-panel(value='0').pagos
    v-expansion-panel-content()
      template(v-slot:header)
        .title Credit Card
      v-card(color="#f6f9fc")
        v-card-text
          PayStripe
    v-expansion-panel-content
      template(v-slot:header)
        .title Paypal
      v-card(color="#f6f9fc")
        v-card-text
          .blank_slate
            .icono
            .text-xs-center After clicking “Pay now”, you will be redirected to PayPal to complete your purchase securely.
            v-btn.pay(block color="#54c7c3" dark)
              v-icon.sep https
              | Pay Now
              .caption.sep {{getCart.display_price.without_tax.currency}}
              strong.sep {{getCart.display_price.without_tax.formatted}}
  v-layout.text-xs-center(justify-space-around)
    v-btn(small flat color="info" @click="setCheckoutStep(2)")
      v-icon chevron_left
      | Return to shipping method
</template>

<script>
import PayStripe from '@/components/checkout/PayStripe2.vue'
import CodePromo from '@/components/checkout/CodePromo.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getCart'])
  },
  methods: {
    ...mapMutations(['setCheckoutStep'])
  },
  components: {
    PayStripe, CodePromo
  }
}
</script>

<style>
.blank_slate .icono{
  width: 163px;
  height: 81px;
  margin: 0px auto 10px;
  background-image: url('../../assets/redirect.svg');
}
.pagos{
  border: 1px solid rgba(0,0,0,.12);
  margin-top: 20px;
}
</style>
