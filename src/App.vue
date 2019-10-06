<template>
  <v-app>
    <audio id="remoteAudio"/>
    <audio id="localAudio" muted="muted"/>

    <v-app-bar app dense>
      <v-toolbar-title class="headline"><span>sip.js</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-switch style="padding:.75em;" v-model="hideConfigCard" label="hide config"/>
        <v-spacer/>
        <v-switch style="padding:.75em;" v-model="hideLogCard" label="hide log"/>
        <v-spacer/>
        <v-switch style="padding:.75em;" v-model="$vuetify.theme.dark" label="lights out"/>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <ButtonPanelCard/>
      <ConfigCard :hidden="hideConfigCard"/>
      <LogCard :hidden="hideLogCard"/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ButtonPanelCard from './components/ButtonPanelCard.vue'
import ConfigCard from './components/ConfigCard.vue'
import LogCard from './components/LogCard.vue'

export default Vue.extend({
  name: 'App',
  components: {
    ButtonPanelCard,
    ConfigCard,
    LogCard
  },
  data: () => ({
    hideConfigCard: false,
    hideLogCard: false
  })
})
</script>
