<template>
  <v-app :dark="this.darkTheme">
    <audio id="remoteAudio"/>
    <audio id="localAudio" muted="muted"/>

    <v-toolbar app dense>
      <v-toolbar-title>sip.js</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-switch style="padding:.75em;" v-model="hideConfigCard" label="hide config card"/>
        <v-spacer/>
        <v-switch style="padding:.75em;" v-model="hideLogCard" label="hide log card"/>
        <v-spacer/>
        <v-switch style="padding:.75em;" v-model="darkTheme" label="use dark theme"/>
      </v-toolbar-items>
      <v-spacer/>
    </v-toolbar>

    <v-content>
      <ButtonPanelCard/>
      <ConfigCard :hidden="hideConfigCard"/>
      <LogCard :hidden="hideLogCard"/>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import ButtonPanelCard from './components/ButtonPanelCard.vue'
import ConfigCard from './components/ConfigCard.vue'
import LogCard from './components/LogCard.vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    darkTheme: false,
    hideConfigCard: false,
    hideLogCard: false
  }),
  components: {
    ButtonPanelCard,
    ConfigCard,
    LogCard
  }
})
</script>
