<template lang="pug">
v-layout(align-center justify-center row fill-height)
  v-flex(xs12)
    v-card(color="rgba(18, 91, 152, 0.05)")
      v-form
        .caption.text-xs-center Pay with card
          v-card.card_tarjeta
            #card
            #card_errors
            v-btn(block color="#54c7c3" dark)
              v-icon https
              | Pay
              .caption {{getCart.display_price.without_tax.currency}}
              strong {{getCart.display_price.without_tax.formatted}}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getCart'])
  },
  data () {
    return {
      options: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    }
  },
  mounted () {
    var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx')
    var elements = stripe.elements()
    var card = elements.create('card', { style: this.options })
    card.mount('#card')
    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card_errors')
      if (event.error) {
        displayError.textContent = event.error.message
      } else {
        displayError.textContent = ''
      }
    })
  }
}
</script>

<style>
.card_tarjeta{
  margin: 5px;
  padding: 5px;
}
</style>
