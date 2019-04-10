import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'SWsMjkKvotipfTQkeKmU1MVgIxg3SCoDBf5RQXJTFZ'
})

export default {
  getProducts () {
    return Moltin.Products.Filter({}).With('main_image').Limit(10).All()
  },
  getCart () {
    return Moltin.Cart.Items()
  },
}
