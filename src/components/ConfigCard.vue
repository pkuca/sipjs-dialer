<template>
  <v-container>
    <v-layout align-center column fill-height justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-text style="width:22em">
            <v-text-field
              style="font-family:monospace;font-size:10px"
              v-model="userAgentConfig.user"
              label="User"
            />
            <v-text-field
              style="font-family:monospace;font-size:10px"
              v-model="userAgentConfig.realm"
              label="Realm"
            />
            <v-text-field
              style="font-family:monospace;font-size:10px"
              v-model="userAgentConfig.wsServer"
              label="Websocket Server"
            />
            <v-text-field
              style="font-family:monospace;font-size:10px"
              v-model="destinationURI"
              label="Destination URI"
            />
          </v-card-text>
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
    ...mapGetters(['destinationURI', 'userAgentConfig'])
  }
})
</script>
