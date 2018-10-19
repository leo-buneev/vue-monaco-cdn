import monacoLoader from '@/services/monaco-loader.js'
export default {
  name: 'MonacoEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: 'javascript',
    },
    theme: {
      type: String,
      default: 'vs',
    },
    options: {
      type: Object,
      default: null,
    },
  },
  async mounted() {
    this.init()
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.dispose()
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        if (this.editor) {
          this.editor.updateOptions(options)
        }
      },
    },
    value(newValue) {
      if (this.editor) {
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue)
        }
      }
    },
    language(newVal) {
      if (this.editor) {
        this.editor.setModelLanguage(this.editor.getModel(), newVal)
      }
    },
    theme(newVal) {
      if (this.editor) {
        this.editor.setTheme(newVal)
      }
    },
  },
  methods: {
    async init() {
      try {
        await monacoLoader.ensureMonacoIsLoaded()
        this.initMonaco()
      } catch (e) {
        console.error('Failure during loading monaco editor:', e)
      }
    },
    initMonaco() {
      const options = {
        value: this.value,
        theme: this.theme,
        language: this.language,
        ...this.options,
      }

      this.editor = window.monaco.editor.create(this.$el, options)
      this.$emit('editorDidMount', this.editor)
      this.editor.onDidChangeModelContent(event => {
        const value = this.editor.getValue()
        if (this.value !== value) {
          this.$emit('input', value, event)
        }
      })
    },

    getMonaco() {
      return this.editor
    },
  },
  render(h) {
    return h('div')
  },
}
