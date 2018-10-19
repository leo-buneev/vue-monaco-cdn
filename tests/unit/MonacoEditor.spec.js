import { shallowMount } from '@vue/test-utils'
import MonacoEditor from '@/components/MonacoEditor.js'
jest.mock('@/services/monaco-loader', () => ({
  ensureMonacoIsLoaded: jest.fn(() => Promise.resolve()),
}))

function resetEditorMock() {
  const editorInstance = {
    onDidChangeModelContent: jest.fn(),
    setTheme: jest.fn(),
    setModelLanguage: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    getModel: jest.fn(),
    updateOptions: jest.fn(),
  }
  window.monaco = {
    editor: {
      create: jest.fn(() => {
        return editorInstance
      }),
    },
  }
  return editorInstance
}
describe('MonacoEditor.js', () => {
  test('should mount editor', async () => {
    const editorInstance = resetEditorMock()
    const meInstance = shallowMount(MonacoEditor, {})
    await meInstance.vm.$nextTick()
    expect(meInstance.vm.getMonaco()).toEqual(editorInstance)
    expect(window.monaco.editor.create.mock.calls.length).toBe(1)
  })
  test('should pass all props', async () => {
    resetEditorMock()
    const props = {
      value: 'v1',
      language: 'l1',
      theme: 't1',
      options: { o1: 'o1', o2: 'o2' },
    }
    const expectedEditorOptions = {
      value: 'v1',
      language: 'l1',
      theme: 't1',
      o1: 'o1',
      o2: 'o2',
    }
    const meInstance = shallowMount(MonacoEditor, { propsData: props })
    await meInstance.vm.$nextTick()
    expect(window.monaco.editor.create.mock.calls[0][1]).toEqual(expectedEditorOptions)
  })
  test('prop updates should be reflected in editor', async () => {
    const editorInstance = resetEditorMock()
    const props = {
      value: 'v1',
      language: 'l1',
      theme: 't1',
      options: { o1: 'o1', o2: 'o2' },
    }
    const meInstance = shallowMount(MonacoEditor)
    await meInstance.vm.$nextTick()
    meInstance.setProps(props)
    await meInstance.vm.$nextTick()
    expect(editorInstance.setValue.mock.calls[0][0]).toEqual('v1')
    expect(editorInstance.setTheme.mock.calls[0][0]).toEqual('t1')
    expect(editorInstance.setModelLanguage.mock.calls[0][1]).toEqual('l1')
    expect(editorInstance.updateOptions.mock.calls[0][0]).toEqual(props.options)
  })
  test('editor code update should trigger input event', async () => {
    const editorInstance = resetEditorMock()
    let modelChangedHandler = null
    editorInstance.onDidChangeModelContent = jest.fn(handler => (modelChangedHandler = handler))
    editorInstance.getValue = jest.fn(() => 'code')
    const meInstance = shallowMount(MonacoEditor)
    await meInstance.vm.$nextTick()
    modelChangedHandler()
    expect(meInstance.emitted('input')[0]).toEqual(['code', undefined])
  })
})
