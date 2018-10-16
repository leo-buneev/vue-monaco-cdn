import monacoLoader from '@/services/monaco-loader'

beforeEach(() => {
  // Cleanup DOM
  document.getElementsByTagName('html')[0].innerHTML = ''
  window.require = null
  monacoLoader.reset()
})

describe('monaco-loader.js', () => {
  test('should append only one script tag with correct src', async () => {
    monacoLoader.ensureMonacoIsLoaded('http://cdnPath')
    monacoLoader.ensureMonacoIsLoaded('http://cdnPath')
    const scripts = window.document.getElementsByTagName('script')
    expect(scripts.length).toEqual(1)
    expect(scripts[0].src).toEqual('http://cdnpath/vs/loader.js')
  })
  test('should succeed after script is loaded', async () => {
    const p = monacoLoader.ensureMonacoIsLoaded('http://cdnPath')
    const script = window.document.getElementsByTagName('script')[0]

    // Imitate script load
    window.require = jest.fn((path, resolve) => resolve())
    window.require.config = jest.fn()
    script.dispatchEvent(new Event('load'))

    await p
    expect(window.require.mock.calls[0][0]).toEqual(['vs/editor/editor.main'])
  })
  test('should fail if script is not loaded', async () => {
    const promise = monacoLoader.ensureMonacoIsLoaded('http://cdnPath')
    const script = window.document.getElementsByTagName('script')[0]

    // Imitate script fail
    script.dispatchEvent(new Event('error'))
    let error = null
    try {
      await promise
    } catch (e) {
      error = e
    }
    expect(error).toBeTruthy()
  })
  test('should correctly handle repeated calls before resolving', async () => {
    const promises = [
      monacoLoader.ensureMonacoIsLoaded('cdnPath'),
      monacoLoader.ensureMonacoIsLoaded('cdnPath'),
      monacoLoader.ensureMonacoIsLoaded('cdnPath'),
    ]

    const scripts = window.document.getElementsByTagName('script')
    expect(scripts.length).toBe(1)

    window.require = jest.fn((path, resolve) => resolve())
    window.require.config = jest.fn()
    scripts[0].dispatchEvent(new Event('load'))

    await Promise.all(promises)
    expect(window.require.mock.calls.length).toBe(3)
  })
  test('should correctly handle repeated calls after resolving', async () => {
    const p = monacoLoader.ensureMonacoIsLoaded('cdnPath')
    const script = window.document.getElementsByTagName('script')[0]

    window.require = jest.fn((path, resolve) => resolve())
    window.require.config = jest.fn()
    script.dispatchEvent(new Event('load'))

    await p
    await monacoLoader.ensureMonacoIsLoaded('cdnPath')

    expect(window.require.mock.calls.length).toBe(2)
  })
})
