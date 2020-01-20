<template>
  <v-app>
    <audio id="remoteAudio"/>
    <audio id="localAudio" muted="muted"/>
    <AppBar/>
    <v-content>
      <ButtonPanelCard/>
      <ConfigCard :hidden="hideConfigCard"/>
      <LogCard :hidden="hideLogCard"/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import AppBar from './components/AppBar.vue'
import ButtonPanelCard from './components/ButtonPanelCard.vue'
import ConfigCard from './components/ConfigCard.vue'
import LogCard from './components/LogCard.vue'
import { mapActions, mapGetters } from 'vuex'

export default Vue.extend({
  name: 'App',
  components: {
    AppBar,
    ButtonPanelCard,
    ConfigCard,
    LogCard
  },
  computed: {
    ...mapGetters(['hideConfigCard', 'hideLogCard'])
  }
})
</script>
