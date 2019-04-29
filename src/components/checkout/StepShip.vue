<template lang="pug">
v-form.step
  v-layout(column)
    .title Shipping method
    p *Please allow 6 days processing time with an Upload Your Own Custom Slippers
  v-layout
    v-radio-group.select_radio(v-model="shipping" column)
      v-card
        v-list(two-line)
          template(v-for="(m, index) in getMetodos")
            v-list-tile(@click="" v-if="m.show")
              v-list-tile-action
                v-radio(:value="m")
              v-list-tile-content(@click="shipping = m")
                v-list-tile-title {{m.name}}
                v-list-tile-sub-title {{m.description}}
              v-list-tile-action(@click="shipping = m")
                v-list-tile-action-text
                  .subheading.font-weight-bold.black--text {{m.display_price.formatted}}
            v-divider(v-if="index + 1 < getMetodos.length" :key="index")
  v-layout(wrap)
    v-flex(xs12)
      v-btn(block color="deep-orange" class="white--text" @click="setCheckoutStep(3)") Continue to payment method
    v-flex.text-xs-center(xs12)
      v-btn(flat small color="info" @click="setCheckoutStep(1)")
        v-icon chevron_left
        | Return to information
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      Ship: '',
      metodos: [this.getShipStandard, this.getShipExpress],
      shipping: null
    }
  },
  computed: {
    ...mapGetters(['getCart', 'getMetodos', 'getFreeShip', 'getSubtotal', 'getItemsCart'])
  },
  methods: {
    ...mapMutations(['setCheckoutStep']),
    ...mapActions(['pushProductCustom', 'deleteItemCart']),
    gravarShipping () {
      let ship = this.getItemsCart.find(i => i.type === 'custom_item')
      if (ship) {
        if (ship.sku !== this.shipping.sku) {
          this.deleteItemCart(ship.id).then(res => {
            this.pushProductCustom(this.shipping)
          })
        }
      } else {
        if (this.shipping.sku !== 'free-ship') {
          this.pushProductCustom(this.shipping)
        }
      }
    }
  },
  mounted () {
    let ship = this.getItemsCart.find(i => i.type === 'custom_item')
    if (ship) {
      this.getMetodos.forEach((m) => {
        if (m.sku === ship.sku) {
          this.shipping = m
        }
      })
    } else {
      this.shipping = this.getMetodos[0]
    }
  },
  watch: {
    'shipping': 'gravarShipping'
  }
}
</script>

<style lang="scss">
.select_radio{
  padding-left: 2px;
  padding-right: 2px;
  .v-input__control{
    flex-grow: inherit;
  }
}
</style>
