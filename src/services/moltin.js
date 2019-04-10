import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'SWsMjkKvotipfTQkeKmU1MVgIxg3SCoDBf5RQXJTFZ'
})

export default {
  getProducts (filtro) {
    return Moltin.Products.Filter(filtro).With('main_image').All()
  },
  getCart () {
    return Moltin.Cart().Items()
  }
}
