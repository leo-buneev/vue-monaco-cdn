# vue-monaco-cdn

[Monaco Editor](https://github.com/Microsoft/monaco-editor) is the code editor that powers VS Code. This project aims to provide simple and lightweight Vue.js component, that downloads editor files lazily from cdn. Heavily inspired by [vue-monaco](https://github.com/egoist/vue-monaco/).

Similar projects:

* [vue-monaco](https://github.com/egoist/vue-monaco/) - requires bundling monaco editor files via webpack and a special webpack plugin. Sometimes this may be undesirable because:
    * it requires additional webpack configuration
    * webpack processing can lead to [issues](https://github.com/Microsoft/monaco-editor-webpack-plugin/issues/17)
    * it can significantly [increase](https://github.com/Microsoft/monaco-editor-webpack-plugin/issues/40) webpack bundle size and build time.
* [vue-monaco-editor](https://github.com/matt-oconnell/vue-monaco-editor) - supports CDN but isn't maintained.


## Install

```bash
yarn add vue-monaco-cdn
# or
npm install vue-monaco-cdn
```

## Usage

```vue
<template>
  <monaco-editor
    class="editor"
    v-model="code"
    language="javascript"
  />
  </monaco-editor>
</template>

<script>
import MonacoEditor from 'vue-monaco-cdn'

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: 'const noop = () => {}'
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 400px;
}
</style>
```

### Props

- `value` - code
- `language` - programming language that code will be in. [List of supported languages](https://github.com/Microsoft/monaco-languages) 
- `theme` - visual theme for editor
- `options` - [monaco editor additional options](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html)

### Events

| Event              | IStandaloneCodeEditor Event | Parameters                                  |
|--------------------|-----------------------------|---------------------------------------------|
| `editorMount`      |                             | IStandaloneCodeEditor                       |
| `contextMenu`      | onContextMenu               | IEditorMouseEvent                           |
| `blur`             | onDidBlurEditor             |                                             |
| `blurText`         | onDidBlurEditorText         |                                             |
| `configuration`    | onDidBlurEditorText         | IConfigurationChangedEvent                  |
| `position`         | onDidChangeCursorPosition   | ICursorPositionChangedEvent                 |
| `selection`        | onDidChangeCursorSelection  | ICursorSelectionChangedEvent                |
| `model`            | onDidChangeModel            | IModelChangedEvent                          |
| `change`           | onDidChangeModelContent     | value: string, e: IModelContentChangedEvent |
| `modelDecorations` | onDidChangeModelDecorations | IModelDecorationsChangedEvent               |
| `modelLanguage`    | onDidChangeModelLanguage    | IModelLanguageChangedEvent                  |
| `modelOptions`     | onDidChangeModelOptions     | IModelOptionsChangedEvent                   |
| `afterDispose`     | onDidDispose                |                                             |
| `focus`            | onDidFocusEditor            |                                             |
| `focusText`        | onDidFocusEditorText        |                                             |
| `layout`           | onDidLayoutChange           | EditorLayoutInfo                            |
| `scroll`           | onDidScrollChange           | IScrollEvent                                |
| `keydown`          | onKeyDown                   | IKeyboardEvent                              |
| `keyup`            | onKeyUp                     | IKeyboardEvent                              |
| `mouseDown`        | onMouseDown                 | IEditorMouseEvent                           |
| `mouseLeave`       | onMouseLeave                | IEditorMouseEvent                           |
| `mouseMove`        | onMouseMove                 | IEditorMouseEvent                           |
| `mouseUp`          | onMouseUp                   | IEditorMouseEvent                           |

### Methods

- `getMonaco(): IStandaloneCodeEditor`: Return the [editor instance](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandalonecodeeditor.html).

Use `ref` to interact with the `MonacoEditor` component in order to access methods: `<MonacoEditor ref="editor"></MonacoEditor>`, then `this.$refs.editor.getMonaco()` will be available.

## Author

**vue-monaco-cli**. Released under the [MIT](./LICENSE) License.

Authored and maintained by [leo-buneev](https://github.com/leo-buneev/) and contributors. Huge thanks to [egoist](https://github.com/egoist/) for initial webpack version.
