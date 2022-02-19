const unimplemented = {
  create (runtimeOptions) {
    if (!runtimeOptions.useAudio) {
      return undefined
    }

    const audio = {
      error: 'Sorry, the Audio Manager is not yet implemented! set useAudio runtime option to false!'
    }

    return audio
  }
}

export default unimplemented
