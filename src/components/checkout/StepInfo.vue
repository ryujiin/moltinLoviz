<template lang="pug">
v-form.step(v-model="valid")
  v-layout(wrap align-center justify-space-between fill-height)
    .title(xs12) Contact information
    .help(xs12 text-xs-right v-if="false")
      | Already have an account?
      v-btn(small flat color="info") Log in
  v-layout(column fill-height)
    v-text-field(label="Email" required v-model="checkoutData.customer.email" :rules="formRules.emailRules")
    v-checkbox.sin_margin(label="Keep me up to date on news and exclusive offers")
  v-layout(align-center justify-space-between fill-height)
    .title Shipping address
  v-layout(wrap)
    v-flex(xs12 grow pa-1)
      v-text-field(label="First Name" v-model="checkoutData.shipping_address.first_name" required :rules="formRules.isRequerido")
    v-flex(xs12 grow pa-1)
      v-text-field(label="Last Name"  v-model="checkoutData.shipping_address.last_name" required :rules="formRules.isRequerido")
    v-flex(xs12 grow pa-1)
      v-text-field(label="Company (optional)" v-model="checkoutData.shipping_address.company_name")
    v-flex(xs12 grow pa-1)
      v-text-field(label="Address" v-model="checkoutData.shipping_address.line_1" required :rules="formRules.isRequerido")
    v-flex(xs12)
      v-text-field(label="Apartment, suite, etc. (optional)" v-model="checkoutData.shipping_address.line_2")
    v-flex(xs12)
      v-text-field(label="City" v-model="checkoutData.shipping_address.city" required)
    v-flex(xs12)
      v-select(label="Country/Region" :items="paises" item-text="CountryName" v-model="checkoutData.shipping_address.country" required :rules="[v => !!v || 'Item is required']")
    v-flex(xs12)
      v-select(label="States/Region" :items="cities" item-text="StateName" v-model="checkoutData.shipping_address.county" required :rules="[v => !!v || 'Item is required']")
    v-flex(xs12)
      v-text-field(label="Postal Code" v-model="checkoutData.shipping_address.postcode" required :rules="formRules.isRequerido")
    v-flex(xs12)
      v-checkbox.sin_margin(label="Save this information for next time" value="true")
    v-flex.text-xs-right(xs12)
      v-btn(color="deep-orange" class="white--text" block @click="save" :disabled="!valid" large) Continue to Shipping method
    v-flex.text-xs-center(xs12)
      v-btn(flat small color="info" to="/cart")
        v-icon chevron_left
        | Return to cart
</template>

<script>
import { mapMutations } from 'vuex'
import countries from '@/storeModules/Contries.json'

export default {
  data () {
    return {
      formRules: {
        emailRules: [
          v => !!v || 'Email Name is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        isRequerido: [v => !!v || 'This is required']
      },
      valid: false,
      paises: countries.Countries,
      cities: [],
      checkoutData: {
        customer: {
          name: '',
          email: ''
        },
        shipping_address: {
          first_name: '',
          last_name: '',
          company_name: '',
          line_1: '',
          line_2: '',
          city: '',
          postcode: '',
          county: '',
          country: ''
        },
        billing_address: {}
      }
    }
  },
  methods: {
    ...mapMutations(['setCheckoutStep', 'setCustomer', 'setShipping']),
    changeCoutry () {
      this.cities = this.paises.find(p => p.CountryName === this.checkoutData.shipping_address.country).States
    },
    save () {
      if (this.valid) {
        this.checkoutData.customer.name = this.checkoutData.shipping_address.first_name + ' ' + this.checkoutData.shipping_address.last_name
        this.setCustomer(this.checkoutData.customer)
        this.setShipping(this.checkoutData.shipping_address)
        this.setCheckoutStep(2)
        localStorage.setItem('user', JSON.stringify(this.checkoutData))
      }
    }
  },
  mounted () {
    this.checkoutData.shipping_address.country = 'United States'
    if (localStorage.getItem('user')) {
      this.checkoutData = JSON.parse(localStorage.getItem('user'))
    } else {
      console.log('no hay')
    }
  },
  watch: {
    'checkoutData.shipping_address.country': 'changeCoutry'
  }
}
</script>

<style lang="scss" scoped>
.sin_margin{
  margin: 0px;
  padding: 0px;
}
</style>
