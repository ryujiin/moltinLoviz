import Vue from 'vue'
import Vuex from 'vuex'

import cart from '@/storeModules/cartStore'
import collection from '@/storeModules/collectionStore'
import product from '@/storeModules/productStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    collection,
    product
  }
})
