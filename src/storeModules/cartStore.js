import MoltinService from '@/services/moltin'

const state = {
  cart: {},
  freeShip: 6500,
  numProduct: 0,
  itemsCart: [],
  subtotal: {
    value: null,
    formatted: ''
  },
  shipStandard: {
    name: 'Standard Shipping (7 - 10 days)',
    sku: 'stand-ship',
    description: 'Standard shipping',
    quantity: 1,
    price: {
      amount: 990
    },
    display_price: {
      formatted: '$9.90'
    }
  },
  shipExpress: {
    name: 'Express Shipping (2 - 3 days)',
    sku: 'express-ship',
    description: 'Express shipping',
    quantity: 1,
    price: {
      amount: 1690
    },
    display_price: {
      formatted: '$16.90'
    }
  }
}

const getters = {
  getCart: state => state.cart,
  getItemsCart: state => state.itemsCart,
  getSubtotal: state => state.subtotal,
  getNumProduct: state => state.numProduct,
  getFreeShip: state => state.freeShip,
  getShipStandard: state => state.shipStandard,
  getShip: state => {
    let ship = state.itemsCart.find(i => i.type === 'custom_item')
    if (ship) {
      return ship.meta.display_price.without_tax.value.formatted
    } else {
      return '*FREE'
    }
  }
}

const mutations = {
  setCart (state, data) {
    state.cart = data.meta
    state.itemsCart = data.data
    let sub = 0
    let num = 0
    state.itemsCart.forEach(function (i) {
      if (i.type !== 'custom_item') {
        num = num + i.quantity
        sub = sub + i.meta.display_price.without_tax.value.amount
      }
    })
    state.numProduct = num
    state.subtotal.value = sub
    sub = sub / 100
    state.subtotal.formatted = '$' + sub + '0'
  }
}

const actions = {
  pullCart (context) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.getCart()
        .then(res => {
          context.commit('setCart', res)
          resolve(res)
        })
    })
    return promise
  },
  pushProductCart (context, data) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.addToCart(data.product, data.qty)
        .then(res => {
          context.commit('setCart', res)
          resolve(res)
        })
    })
    return promise
  },
  pushProductCustom (context, data) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.addItemCustomCart(data)
        .then(res => {
          context.commit('setCart', res)
          resolve(res)
        })
    })
    return promise
  },
  deleteItemCart (context, id) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.removeItemCart(id)
        .then(res => {
          context.commit('setCart', res)
          resolve(res)
        })
    })
    return promise
  },
  changeItemCart (context, data) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.updateItemCart(data.id, data.cantidad)
        .then(res => {
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
