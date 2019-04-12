import MoltinService from '@/services/moltin'

const state = {
  productBySlug: {},
  product: {},
  size: {}
}

const getters = {
  getProduct: state => state.product,
  getIncludes: state => state.includes,
  getSize: state => state.size
}

const mutations = {
  setProduct (state, data) {
    state.product = data
  },
  setProductSlug (state, data) {
    state.productBySlug = data
  },
  setSize (state, data) {
    state.size = data
  }
}

const actions = {
  loadProductBySlug (context, slug) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.findBySlug(slug)
        .then(res => {
          context.commit('setProductSlug', res.data[0])
          resolve(res)
        })
    })
    return promise
  },
  loadProductById (context, id) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.getById(id)
        .then(res => {
          context.commit('setProduct', res)
          resolve(res)
        })
    })
    return promise
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
