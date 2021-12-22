import monacoLoader from '@/services/monaco-loader.js'
import { h } from 'vue'

export default {
  name: 'MonacoEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: 'https://unpkg.com/monaco-editor@latest/min',
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
  beforeUnmount() {
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
        window.monaco.editor.setModelLanguage(this.editor.getModel(), newVal)
      }
    },
    theme(newVal) {
      window.monaco.editor.setTheme(newVal)
    },
  },
  methods: {
    async init() {
      try {
        await monacoLoader.ensureMonacoIsLoaded(this.url)
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
      this.editor.onDidChangeModelContent((event) => {
        const value = this.editor.getValue()
        if (this.value !== value) {
          this.$emit('update:modelValue', value, event)
        }
      })
    },

    getMonaco() {
      return this.editor
    },
  },
  render() {
    return h('div')
  },
}
