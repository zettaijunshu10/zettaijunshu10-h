const unimplemented = {
  create (runtimeOptions) {
    const renderer = {
      error: 'Sorry, the WebGL Renderer is not yet implemented! set useCanvas runtime option to true!'
    }

    return renderer
  }
}

export default unimplemented
