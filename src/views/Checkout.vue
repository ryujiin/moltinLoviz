<template lang="pug">
.checkout(v-if="getCart.display_price")
  button(class="order-summary-toggle" @click="show = !show")
    .marco
      v-layout(align-center justify-space-between row fill-height)
        v-flex
          v-icon(color="blue lighten-2") shopping_basket
          span(class="info--text") Show order summary
          v-btn(icon)
            v-icon(color="blue lighten-2") {{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
        v-flex
          .title(class="text-xs-right") {{getCart.display_price.without_tax.formatted}}
  v-slide-y-transition
    v-card.summary(v-show="show" color="#fafafa")
      OrdenSummaty
  .marco
    v-stepper.pasos(v-model="step")
      v-stepper-header.hidden-xs-only
        v-stepper-step(:complete="step > 1" step="1") Name of step 1
        v-divider
        v-stepper-step(:complete="step > 2" step="2") Name of step 2
        v-divider
        v-stepper-step(:complete="step > 3" step="3") Name of step 3
      v-stepper-items
        v-stepper-content(step="1")
          StepInfo
        v-stepper-content(step="2")
          StepShip
        v-stepper-content(step="3")
          StepPay
    .legacy
      p.caption Your data are processed by Loviz DC LLC in order to manage your order and the payment of your order, to deliver the product to you, to manage a return of the product, to contact you with regards to your order, to ensure the good functioning of the website, and to send you newsletters if you have agreed to. You must fill all the fields that are not labeled as mandatory in order to make an order. You have a right of access, rectification deletion of your personal data, a right to oppose, restrict the processing in certain circumstances, a right to data portability, a right to lodge a complaint with a supervisory authority, a right to withdraw your consent at any time, and a right to set specific instructions regarding the use of your personal data after your death. If you wish to exercise these rights and/or obtain information about your data, please contact support.
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import OrdenSummaty from '@/components/checkout/OrdenSummary'
import StepInfo from '@/components/checkout/StepInfo.vue'
import StepShip from '@/components/checkout/StepShip.vue'
import StepPay from '@/components/checkout/StepPay.vue'

export default {
  components: {
    OrdenSummaty, StepInfo, StepShip, StepPay
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters(['getCart', 'getCheckoutStep']),
    step: {
      get () { return this.$store.getters.getCheckoutStep },
      set (newValue) { this.$store.commit('setCheckoutStep', newValue) }
    }
  },
  methods: {
    ...mapMutations(['setCheckoutStep'])
  }
}
</script>

<style lang="scss" scoped>
.order-summary-toggle{
  background: #fafafa;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  padding: 2px 0;
  flex-shrink: 0;
  text-align: left;
  width: 100%;
}
.marco {
  display: block;
  margin: 0 auto;
  max-width: 40em;
  zoom: 1;
  @media (max-width: 999px){
    padding: 0 1em;
  }
}
.pasos{
  box-shadow: none;
}
.legacy{
  margin: 20px 0;
}
.v-stepper__content{
  padding: 20px 0;
}
.summary{
  margin-bottom: 10px;
}
</style>
