<template lang="pug">
v-layout(align-center justify-center row fill-height)
  v-flex(xs12)
    v-card(color="rgba(18, 91, 152, 0.05)")
      v-form
        .caption.text-xs-center Pay with card
          v-card.card_tarjeta
            card.formulario(stripe='pk_test_TYooMQauvdEDq54NiTphI7jx', :options='stripeOptions' @change='complete = $event.complete')
            v-btn.pay(block color="#54c7c3" dark)
              v-icon.sep https
              | Pay
              .caption.sep {{getCart.display_price.without_tax.currency}}
              strong.sep {{getCart.display_price.without_tax.formatted}}
</template>

<script>
import { mapGetters } from 'vuex'
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  computed: {
    ...mapGetters(['getCart'])
  },
  components: { Card },
  data () {
    return {
      complete: false,
      stripeOptions: {
        style: {
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
    }
  },
  methods: {
    pay () {
      createToken().then(data => console.log(data.token))
    }
  }
}
</script>

<style>
.card_tarjeta{
  margin: 5px;
  padding: 5px;
}
.formulario{
  margin-top: 10px;
  margin-bottom: 10px;
}
.sep{
  margin: 0 1px;
}
.pay .caption{
  margin-left: 20px;
}
</style>
