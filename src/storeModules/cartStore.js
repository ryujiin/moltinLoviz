import MoltinService from '@/services/moltin'

const state = {
  cart: {},
  freeShip: 6500,
  descuento: '',
  total: '',
  numProduct: 0,
  itemsCart: [],
  subtotal: {
    value: null,
    formatted: ''
  },
  metodos: [
    {
      name: 'Free Standard Shipping',
      sku: 'free-ship',
      description: 'Shipping time (7 - 10 days)',
      quantity: 1,
      show: false,
      price: {
        amount: 0
      },
      display_price: {
        formatted: 'FREE'
      }
    },
    {
      name: 'Standard Shipping',
      sku: 'stand-ship',
      description: 'Shipping time (7 - 10 days)',
      quantity: 1,
      show: true,
      price: {
        amount: 990
      },
      display_price: {
        formatted: '$9.90'
      }
    },
    {
      name: 'Express Shipping',
      sku: 'express-ship',
      description: 'Shipping time (2 - 3 days)',
      quantity: 1,
      show: true,
      price: {
        amount: 1690
      },
      display_price: {
        formatted: '$16.90'
      }
    }
  ]
}

const getters = {
  getCart: state => state.cart,
  getDescuento: state => state.descuento,
  getTotal: state => state.total,
  getItemsCart: state => state.itemsCart,
  getSubtotal: state => state.subtotal,
  getNumProduct: state => state.numProduct,
  getFreeShip: state => state.freeShip,
  getMetodos: state => state.metodos,
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
    let total = 0
    state.itemsCart.forEach(function (i) {
      if (i.type === 'cart_item') {
        num = num + i.quantity
        sub = sub + i.meta.display_price.without_tax.value.amount
        total = total + i.value.amount
      }
      if (i.type === 'custom_item') {
        total = total + i.value.amount
      }
    })
    if (total !== state.cart.display_price.without_tax.amount) {
      let descuento = (total - state.cart.display_price.without_tax.amount) / 100
      descuento = Number(descuento).toFixed(2)
      total = total / 100
      state.descuento = '$' + descuento
      state.total = '$' + Number(total).toFixed(2)
    } else {
      state.descuento = ''
      state.total = ''
    }
    state.numProduct = num
    state.subtotal.value = sub
    sub = sub / 100
    sub = Number(sub).toFixed(2)
    state.subtotal.formatted = '$' + sub
    // modificar mostrar metodos
    state.metodos.forEach((m) => {
      if (m.sku === 'free-ship') {
        if (state.freeShip > state.subtotal.value) {
          m.show = false
        } else {
          m.show = true
        }
      }
      if (m.sku === 'stand-ship') {
        if (state.freeShip < state.subtotal.value) {
          m.show = false
        } else {
          m.show = true
        }
      }
    })
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
  },
  AddPromotionToCart (context, code) {
    const promise = new Promise(function (resolve, reject) {
      MoltinService.addPromCode(code)
        .then(res => {
          context.commit('setCart', res)
          resolve(res)
        })
        .catch(error => {
          reject(error)
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
