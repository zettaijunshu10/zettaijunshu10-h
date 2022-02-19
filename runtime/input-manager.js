
const enableKeyboard = inputDevice => {

}

const enableMouse = (inputDevice, canvas) => {

}

const enableTouch = (inputDevice, canvas) => {

}

const inputManager = {
  create (runtimeOptions) {
    const input = {}

    // keyboard support?
    runtimeOptions.useKeyboard && enableKeyboard(input)

    // mouse and touch require the canvas element
    // so input has to be invoked after the renderer
    // the renderers will be given a classname of zettai__renderer-canvas
    // and will be a child of the runtime options root element
    const selector = `.zettai__renderer-canvas`
    const canvas = document.querySelector(selector)

    // mouse support?
    runtimeOptions.useMouse && enableMouse(input, canvas)

    // touch support?
    runtimeOptions.useTouch && enableTouch(input, canvas)

    return input
  }
}

export default inputManager
