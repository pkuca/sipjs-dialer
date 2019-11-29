import Vue from 'vue'
import Vuex from 'vuex'
import { generate } from 'randomstring'
import { UA } from 'sip.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    sessionConfig: { destinationURI: 'sip:hello@example.org' },
    userAgent: null,
    userAgentConfig: {
      logLevel: 1,
      realm: generate({ length: 8, charset: 'abcdefghijklmnopqrstuvwxyz' }),
      user: generate({ length: 8, charset: 'abcdefghijklmnopqrstuvwxyz' }),
      wsServer: 'wss://example.org'
    },
    userAgentLog: <Array<Object>>[],
    iceUp: false
  },
  getters: {
    session: state => state.session,
    sessionConfig: state => state.sessionConfig,
    userAgent: state => state.userAgent,
    userAgentConfig: state => state.userAgentConfig,
    userAgentLog: state => state.userAgentLog,
    iceUp: state => state.iceUp
  },
  mutations: {
    SET_ICE_UP (state, val) {
      Vue.set(state, 'iceUp', val)
    },
    SET_SESSION (state, session) {
      Vue.set(state, 'session', session)
    },
    INIT_USER_AGENT (state) {
      const { userAgentLog } = state
      const { realm, user, wsServer } = state.userAgentConfig
      const transportOptions = {
        traceSip: false,
        wsServers: [wsServer],
        maxReconnectionAttempts: 100
      }
      const log = {
        builtinEnabled: false,
        level: 3,
        connector: (level: string, category: string, label: string | undefined, content: any) => {
          const current = userAgentLog
          current.push({
            id: generate(),
            timestamp: new Date().toISOString(),
            level,
            category,
            label,
            content
          })
          Vue.set(state, 'userAgentLog', current)
        }
      }
      const userAgent = new UA({
        log,
        transportOptions,
        register: false,
        uri: `${user}@${realm}`
      })
      Vue.set(state, 'userAgent', userAgent)
    }
  },
  actions: {
    startUserAgent (context) {
      context.commit('INIT_USER_AGENT')
    },
    startSession (context) {
      const { userAgent } = context.getters
      const { destinationURI } = context.getters.sessionConfig
      const options = {
        sessionDescriptionHandlerOptions: {
          constraints: { audio: true, video: false }
        }
      }
      const session = userAgent.invite(destinationURI, options)
      session.on('SessionDescriptionHandler-created', () => {
        const { sessionDescriptionHandler } = session
        sessionDescriptionHandler.once('addTrack', (trackEvent: RTCTrackEvent) => {
          const [stream] = trackEvent.streams
          const remoteAudioElement = <HTMLAudioElement>document.getElementById('remoteAudio')
          if (remoteAudioElement) {
            remoteAudioElement.srcObject = stream
            remoteAudioElement.play()
            context.commit('SET_ICE_UP', true)
          }
        })
        sessionDescriptionHandler.once('iceConnectionClosed', () => {
          context.dispatch('stopSession')
        })
      })
      context.commit('SET_SESSION', session)
    },
    stopSession (context) {
      const { session } = context.getters
      if (session) {
        session.terminate()
        context.commit('SET_ICE_UP', false)
        context.commit('SET_SESSION', null)
      }
    }
  }
})
