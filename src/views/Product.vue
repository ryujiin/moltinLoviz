<template lang="pug">
  .productSingle(v-if="getProduct.data")
    .product_details
      h1.header_title.text-xs-center {{ getProduct.data.name }}
      h3.text_category.text-xs-center Womens, Love
      h3.subtitle.text-xs-center Love print lalaland
    .product_images
      v-carousel(height="auto" hide-delimiters)
        v-carousel-item(v-for="(item,i) in getProduct.included.files" :key="i" :src="item.link.href")
    .action
      v-container
        v-layout(justify-space-between)
          h5 Choose Size
          span Size Guide
        v-layout(wrap row)
          v-btn(v-for="opt in getProduct.data.meta.variations[0].options"
                :key="opt.id" :dark="getSize.id === opt.id" @click="setSize(opt)") {{opt.name}}
        v-layout(wrap row)
          v-flex(xs12 v-if="alert")
            v-icon(color="error") close
            span(class="error--text") Please Select Size
          v-flex(xs12)
            v-btn(block round large color="deep-orange" dark @click="addtocart") ADD TO CART
    .product_info
      v-container(fluid)
        v-layout
          v-flex(xs12)
            h1.text-xs-center DETAILS
            p {{getProduct.data.description}}
            strong Specs:
            ul
              li Synthetic fiber material highly resistant, very soft and comfortable.
              li The upper part of the slipper is of Plush bison of medium hair with high density.
              li The print is direct on the fabric which achieves a perfect touch and when done with a sublimation method.
              li The stamped will not diminish or lose quality over time.
              li The padding of the template has 3 layers (the top is 5mm latex, the second is high density EVA and finally 8mm foam)
              li The sole is made of non-slip PVC with high durability for interiors and exteriors.
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      alert: false
    }
  },
  computed: {
    ...mapGetters(['getProduct', 'getSize'])
  },
  beforeMount () {
    this.loadProductBySlug(this.$route.params.slug).then(res => {
      this.loadProductById(res.data[0].id)
    })
  },
  methods: {
    ...mapMutations(['setSize']),
    ...mapActions(['loadProductBySlug', 'loadProductById', 'pushProductCart']),
    getImg: function (file) {
      return file.link.href
    },
    borrarAlert () {
      this.alert = false
    },
    addtocart () {
      if (this.getSize.id) {
        let data = {
          product: this.getProduct.data.meta.variation_matrix[this.getSize.id],
          qty: 1
        }
        this.pushProductCart(data).then(res => {
          console.log('adadad')
        })
      } else {
        this.alert = true
      }
    }
  },
  watch: {
    'getSize': 'borrarAlert'
  }
}
</script>

<style lang="css" scoped>
.action{
  max-width: 450px;
  margin: auto;
}
</style>
