import MoltinService from '@/services/moltin'

const state = {
  collection: {}
}

const getters = {
  getCollection: state => state.collection
}

const mutations = {
  setCollection (state, data) {
    state.collection = data
  }
}

const actions = {
  pullProducts (context, filtro) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.getProducts(filtro)
        .then(res => {
          context.commit('setCollection', res)
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
