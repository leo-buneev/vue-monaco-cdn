<template>
  <div>
    Language:
    <select v-model="language">
      <option v-for="o in languageOptions" :key="o" :value="o">{{ o }}</option>
    </select>
    Theme:
    <select v-model="theme">
      <option v-for="o in themeOptions" :key="o" :value="o">{{ o }}</option>
    </select>
    <br />
    <br />
    <MonacoEditor class="editor" :theme="theme" :language="language" v-model="sampleCode" />
  </div>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor.js'
import dedent from 'dedent'

export default {
  name: 'app',
  components: {
    MonacoEditor,
  },
  data() {
    return {
      language: 'javascript',
      theme: 'vs',
      languageOptions: [
        'apex',
        'azcli',
        'bat',
        'clojure',
        'coffee script',
        'cpp',
        'csharp',
        'csp',
        'css',
        'dockerfile',
        'fsharp',
        'go',
        'handlebars',
        'html',
        'ini',
        'java',
        'javascript',
        'less',
        'lua',
        'markdown',
        'msdax',
        'mysql',
        'objective-c',
        'pgsql',
        'php',
        'postiats',
        'powershell',
        'pug',
        'python',
        'r',
        'razor',
        'ruby',
        'rust',
        'small basic',
        'scheme',
        'scss',
        'solidity',
        'sql',
        'st',
        'swift',
        'typescript',
        'vb',
        'xml',
        'yaml',
      ],
      themeOptions: ['vs', 'vs-dark', 'hc-black'],
      sampleCode: dedent`
        import capitalize from './capitalize.js'
        import words from './words.js'

        /**
         * Converts string to CamelCase.
         */
        const camelCase = (string) => (
          words(\`\${string}\`.replace(/['\u2019]/g, '')).reduce((result, word, index) => {
            word = word.toLowerCase()
            return result + (index ? capitalize(word) : word)
          }, '')
        )

        export default camelCase`,
    }
  },
}
</script>

<style>
body {
  background: lightgray;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: white;
  width: 800px;
  padding: 50px;
  border-radius: 15px;
  margin: auto;
  margin-top: 100px;
}
.editor {
  width: 800px;
  height: 400px;
  border: 2px solid #2c3e50;
}
</style>
