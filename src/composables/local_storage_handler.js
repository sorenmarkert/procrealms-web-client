import { state, resetInputMappings } from '@/static/state'

export function useLocalStorageHandler () {
  function saveOptions () {
    localStorage.setItem('options', JSON.stringify(state.options))
  }

  function loadOptions () {
    try {
      const options = JSON.parse(localStorage.getItem('options'))
      if (options !== null) {
        state.options = Object.assign(state.options, options)
      }

      if (state.options.fontFamily) {
        document.getElementById('app').style.fontFamily = state.options.fontFamily
      }

      document.getElementById('app').style.fontSize = state.options.fontSize
    } catch (err) {
      console.log(err.stack)
      localStorage.setItem('options', '')
    }
  }

  function saveInputMappings () {
    localStorage.setItem('inputMappings', JSON.stringify(state.inputMappings))
  }

  function loadInputMappings () {
    try {
      const json = localStorage.getItem('inputMappings')
      if (json === null) {
        state.inputMappings = resetInputMappings()
        return
      }
      state.inputMappings = JSON.parse(json)
    } catch (err) {
      state.inputMappings = resetInputMappings()
    }
  }

  function getTokens () {
    try {
      let json = localStorage.getItem('tokens')
      if (!json) {
        return []
      }
      return JSON.parse(json)
    } catch (err) {
      return []
    }
  }

  function addToken (name, token) {
    let tokens = getTokens()
    let existingToken = tokens.find(token => token.name == name)

    if (existingToken) {
      existingToken.token = token
    } else {
      tokens.push({ name, token })
    }

    localStorage.setItem('tokens', JSON.stringify(tokens))
  }

  function deleteToken (name) {
    let tokens = getTokens()
    tokens = tokens.filter(token => token.name != name)
    localStorage.setItem('tokens', JSON.stringify(tokens))
  }


  return {
    saveOptions,
    loadOptions,
    saveInputMappings,
    loadInputMappings,
    getTokens,
    addToken,
    deleteToken
  }
}
