<template lang="pug">
.home
  v-card(flat)
    v-img(src="https://cdn.vuetifyjs.com/images/cards/docks.jpg")
  v-stepper(v-model="e1")
    v-stepper-header
      v-stepper-step(:complete="e1 > 1" step="1") Name of step 1
      v-divider
      v-stepper-step(:complete="e1 > 2" step="2") Name of step 2
      v-divider
      v-stepper-step(:complete="e1 > 3" step="3") Name of step 3
    v-stepper-items
      v-stepper-content(step="1")
        v-expansion-panel
          v-expansion-panel-content(v-for="(item,i) in 5" :key="i")
            template(v-slot:header)
              .title Item
            v-card
              v-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        v-btn(color="primary" @click="e1 = 2") Continue
      v-stepper-content(step="2")
        v-card(class="mb-5" color="grey lighten-1" height="200px")
        v-btn(color="primary" @click="e1 = 3") Continue
      v-stepper-content(step="3")
        v-card(class="mb-5" color="grey lighten-1" height="200px")
        v-btn(color="primary" @click="e1 = 1") Continue
  v-container
    v-expansion-panel
      v-expansion-panel-content(v-for="(item,i) in 5" :key="i")
        template(v-slot:header)
          .title Item
        v-card
          v-card-text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
</template>

<script>
export default {
  data () {
    return {
      e1: 0
    }
  }
}
</script>
