<template>
  <v-app-bar app dense>
    <v-toolbar-title class="headline">
      <span>sip.js</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-switch
        style="padding:.75em;"
        true-value="hideConfigCard"
        label="hide config"
        v-on:change="setHideConfigCard"
      />
      <v-spacer />
      <v-switch
        style="padding:.75em;"
        true-value="hideLogCard"
        label="hide log"
        v-on:change="setHideLogCard"
      />
      <v-spacer />
      <v-switch style="padding:.75em;" v-model="$vuetify.theme.dark" label="lights out" />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['hideConfigCard', 'hideLogCard'])
  },
  methods: {
    ...mapActions(['setHideConfigCard', 'setHideLogCard'])
  }
})
</script>
