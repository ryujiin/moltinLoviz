import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'SWsMjkKvotipfTQkeKmU1MVgIxg3SCoDBf5RQXJTFZ'
})

export default {
  getProducts (filtro) {
    return Moltin.Products.Filter(filtro).With('main_image').All()
  },
  getById (id) {
    return Moltin.Products.With(['main_image', 'files']).Get(id)
  },
  findBySlug (slug) {
    return Moltin.Products.Filter({ eq: { slug: slug } }).Limit(1).All()
  },
  getCart () {
    return Moltin.Cart().Items()
  },
  addToCart (productId, qty) {
    return Moltin.Cart().AddProduct(productId, qty)
  },
  removeItemCart (itemId) {
    return Moltin.Cart().RemoveItem(itemId)
  },
  updateItemCart (itemId, quantity) {
    return Moltin.Cart().UpdateItemQuantity(itemId, quantity)
  },
  addItemCustomCart (item) {
    return Moltin.Cart().AddCustomItem(item)
  },
  addPromCode (code) {
    return Moltin.Cart().AddPromotion(code)
  }
}
