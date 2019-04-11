<template lang="pug">
  .pageCollection
    v-card(flat)
      v-img(src="https://cdn.shopify.com/s/files/1/0257/6087/collections/ABSTRACT_2_LP-DESKTOP_1024x.jpg?v=1524755205")
    v-container(fluid grid-list-md)
      v-layout
        v-flex(xs12)
          h1.header_title.text-xs-center {{title}}
      v-layout(wrap row)
        v-flex(v-for="item in getCollection.data" d-flex :key="item.id")
          v-hover
            v-card(slot-scope="{ hover }", :class="`elevation-${hover ? 12 : 2}`")
              router-link(:to="`/product/${item.slug}`")
                v-img(:src="getThum(item.relationships.main_image.data.id)")
                v-card-title(primary-title)
                  div
                    h3.headline.mb-0 {{ item.name}}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: 'Love'
    }
  },
  computed: {
    ...mapGetters(['getCollection'])
  },
  methods: {
    ...mapActions(['pullProducts']),
    getThum (id) {
      let img = ''
      this.getCollection.included.main_images.forEach(i => {
        if (i.id === id) {
          img = i.link.href
        }
      })
      return img
    }
  },
  mounted () {
    this.pullProducts({ like: { sku: 'PR-*' } })
  }
}
</script>

<style lang="css" scoped>
</style>
