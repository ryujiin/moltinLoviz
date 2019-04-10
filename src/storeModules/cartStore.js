import MoltinService from '@/services/moltin'

const state = {
  cart: {},
  numProduct: 0,
  itemsCart: [],
  subtotal: {
    value: null,
    formatted: ''
  }
}

const getters = {
  getCart: state => state.cart,
  getItemsCart: state => state.itemsCart,
  getSubtotal: state => state.subtotal,
  getNumProduct: state => state.numProduct
}

const mutations = {
  setCart (state, data) {
    state.cart = data.meta
    state.itemsCart = data.data
    let sub = 0
    let num = 0
    state.itemsCart.forEach(function (i) {
      if (i.type !== 'custom_item') {
        num++
        sub = sub + i.meta.display_price.without_tax.value.amount
      }
    })
    state.numProduct = num
    state.subtotal.value = sub
    sub = sub / 100
    state.subtotal.formatted = '$' + sub
  }
}

const actions = {
  pullCart (context) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.getCart()
        .then(res => {
          console.log(res)
          context.commit('setCart', res)
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
