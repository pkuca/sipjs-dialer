<template>
  <v-container fluid>
    <v-layout align-center column fill-height justify-center>
      <v-flex xs12>
        <v-card id="logbox" style="max-height:46em; overflow-y: scroll;">
          <template v-for="log in userAgentLog">
            <p
              style="font-family:monospace;font-size:10px;margin:0;"
              :key="log.id"
            >{{ log.timestamp }} {{ log.category }}.{{ log.level }} {{ log.content }}</p>
          </template>
        </v-card>
        <br>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapGetters(['userAgentLog'])
  },
  watch: {
    userAgentLog: () => {
      const logbox = document.getElementById('logbox')
      setTimeout(() => {
        if (logbox) logbox.scrollTo(0, logbox.scrollHeight)
      }, 0)
    }
  }
})
</script>
