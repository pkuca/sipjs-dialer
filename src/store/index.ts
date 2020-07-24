import Vue from 'vue'
import Vuex from 'vuex'
import { generate } from 'randomstring'
import { UA } from 'sip.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    sessionConfig: {
      proto: process.env.VUE_APP_PROTO || 'sip',
      user: process.env.VUE_APP_USER || 'hello',
      domain: process.env.VUE_APP_DOMAIN || 'example.com'
    },
    userAgent: null,
    userAgentConfig: {
      logLevel: 1,
      realm: generate({ length: 8, charset: 'abcdefghijklmnopqrstuvwxyz' }),
      user: generate({ length: 8, charset: 'abcdefghijklmnopqrstuvwxyz' }),
      wsServer: process.env.VUE_APP_WSSERVER || 'wss://example.com'
    },
    userAgentLog: [] as Array<Record<string, any>>,
    hideConfigCard: false,
    hideLogCard: false
  },
  getters: {
    destinationURI: state => {
      const { domain, proto, user } = state.sessionConfig
      return `${proto}:${user}@${domain}`
    },
    session: state => state.session,
    userAgent: state => state.userAgent,
    userAgentConfig: state => state.userAgentConfig,
    userAgentLog: state => state.userAgentLog,
    hideConfigCard: state => state.hideConfigCard,
    hideLogCard: state => state.hideLogCard
  },
  mutations: {
    SET_HIDE_CONFIG_VAL (state, val) {
      Vue.set(state, 'hideConfigCard', val)
    },
    SET_HIDE_LOG_VAL (state, val) {
      Vue.set(state, 'hideLogCard', val)
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
    setHideConfigCard (context, val) {
      context.commit('SET_HIDE_CONFIG_VAL', val)
    },
    setHideLogCard (context, val) {
      context.commit('SET_HIDE_LOG_VAL', val)
    },
    startUserAgent (context) {
      context.commit('INIT_USER_AGENT')
    },
    startSession (context) {
      const { destinationURI, userAgent } = context.getters
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
          const remoteAudioElement = document.getElementById('remoteAudio') as HTMLAudioElement
          if (remoteAudioElement) {
            remoteAudioElement.srcObject = stream
            remoteAudioElement.play()
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
        context.commit('SET_SESSION', null)
      }
    }
  }
})
