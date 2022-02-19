import { parseColor } from './utils'

const canvasRenderer = {
  create (runtimeOptions) {
    const rootElement = document.querySelector(runtimeOptions.root) || document.body
    const canvas = document.createElement('canvas')

    canvas.classList.add('zettai__renderer-canvas')
    canvas.width = runtimeOptions.width
    canvas.height = runtimeOptions.height

    const ctx = canvas.getContext('2d')
    rootElement.appendChild(canvas)

    const renderer = {
      _backgroundColor: 'cornflowerblue',

      get ctx () {
        return ctx
      },

      get backgroundColor () {
        return renderer._backgroundColor
      },

      set backgroundColor (color) {
        renderer._backgroundColor = parseColor(color)
      },

      get renderables () {
        return renderer._entities || []
      },

      set renderables (r) {
        renderer._entities = r || []
      },

      // clears the frame to background color
      preFrame () {
        ctx.fillStyle = renderer._backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      },

      // renders all renderables
      update () {
        renderer.renderables.length > 0 && renderer.renderables.forEach(entity => {
          entity && typeof entity.draw === 'function' && entity.draw(ctx, canvas, renderer)
        })
      },

      // applies post-processing effects
      postFrame () {

      }
    }

    return renderer
  }
}

export default canvasRenderer
