<template>
  <v-container>
    <v-layout align-center column fill-height justify-center>
      <v-flex xs12>
        <v-card>
          <v-btn
            small
            style="width:13em"
            :disabled="!!userAgent"
            @click="startUserAgent"
          >Initialize User Agent</v-btn>
          <v-btn
            small
            style="width:13em"
            :disabled="userAgent === null || session !== null"
            @click="startSession"
            color="green"
          >Start Session</v-btn>
          <v-btn
            small
            style="width:13em"
            :disabled="session === null"
            @click="stopSession"
            color="red"
          >Stop Session</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['session', 'userAgent', 'iceUp'])
  },
  methods: {
    ...mapActions(['startUserAgent', 'startSession', 'stopSession'])
  }
}
</script>
