const state = {
  checkoutStep: 0,
  customer: {},
  shipping: {},
  billing: {},
}

const getters = {
  getCheckoutStep: state => state.checkoutStep,
  getCustomer: state => state.customer,
  getShipping: state => state.shipping
}

const mutations = {
  setCheckoutStep (state, data) {
    state.checkoutStep = data
  },
  setCustomer (state, data) {
    state.customer = data
  },
  setShipping (state, data) {
    state.shipping = data
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
