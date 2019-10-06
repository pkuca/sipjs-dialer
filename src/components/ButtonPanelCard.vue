<template>
  <v-container>
    <v-layout align-center column fill-height justify-center>
      <v-flex xs12>
        <v-card>
          <v-btn
            tile
            style="width:13em"
            :disabled="!!userAgent"
            @click="startUserAgent"
          >Initialize</v-btn>
          <v-btn
            tile
            style="width:13em"
            :disabled="userAgent === null || session !== null"
            @click="startSession"
            color="green"
          >Start</v-btn>
          <v-btn
            tile
            style="width:13em"
            :disabled="session === null"
            @click="stopSession"
            color="red"
          >Stop</v-btn>
        </v-card>
      </v-flex>
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
