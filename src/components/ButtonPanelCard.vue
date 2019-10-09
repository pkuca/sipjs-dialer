<template>
  <v-container>
    <v-layout justify-space-around>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-btn
        tile
        width="10em"
        :disabled="!!userAgent"
        @click="startUserAgent"
      >Initialize</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        tile
        width="10em"
        :disabled="userAgent === null || session !== null"
        @click="startSession"
        color="green"
      >Start</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        tile
        width="10em"
        :disabled="session === null"
        @click="stopSession"
        color="red"
      >Stop</v-btn>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['session', 'userAgent', 'iceUp'])
  },
  methods: {
    ...mapActions(['startUserAgent', 'startSession', 'stopSession'])
  }
})
</script>
