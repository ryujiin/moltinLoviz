<template>
v-card(color="grey lighten-3")
  v-layout(row wrap)
    v-flex(xs8 offset-xs2)
      v-layout(align-center justify-space-between row fill-height)
        v-flex
          v-icon(color="blue lighten-2") shopping_basket
          span(class="info--text") Show order summary
          v-btn(icon)
            v-icon {{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
        v-flex
          .title(class="text-xs-right") {{getCart.display_price.without_tax.formatted}}
    v-flex(xs8 offset-xs2)
      v-layout(v-for="item in getItemsCart" :key="item.id" align-center justify-space-between row fill-height)
        v-flex(xs3)
          v-img(:src="item.image.href")
        v-flex(xs7)
          v-badge
            template(v-slot:badge)
              span {{item.quantity}}
            span {{item.name}}
        v-flex(xs2)
          h4.text-xs-right {{item.meta.display_price.without_tax.value.formatted}}
</template>
