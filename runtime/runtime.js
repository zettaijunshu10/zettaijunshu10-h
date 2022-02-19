import assetManager from './asset-manager'
import inputManager from './input-manager'
import audioManager from './audio-manager'
import canvasRenderer from './canvas-renderer'
import glRenderer from './gl-renderer'

export const defaultOptions = {
  title: 'Untitled Zettai Project',
  root: 'div#game',
  width: 640,
  height: 480,
  scale: 'match-aspect-fill-height',
  manifest: {},
  useCanvas: true,
  useAudio: false,
  useMouse: false,
  useKeyboard: false,
  useTouch: false,
  debug: false
}

export const validateOptions = options => {
  // TODO: implement option argument type validators
}

export const runtime = {
  create (options) {
    validateOptions(options)

    const runtimeOptions = { ...defaultOptions, ...options }

    const [ assets, assetCollection ] = assetManager.create()

    const audio = audioManager.create(runtimeOptions)
    const renderer = runtimeOptions.useCanvas
      ? canvasRenderer.create(runtimeOptions)
      : glRenderer.create(runtimeOptions)

    const input = inputManager.create(runtimeOptions)

    const entities = []
    const addedEntities = []
    const removedEntities = []
    const addEntity = entity => { addedEntities.push(entity) }
    const clearAddedList = () => { addedEntities.length = 0 }
    const removeEntity = entity => { removedEntities.push(entity) }
    const clearRemovedList = () => { removedEntities.length = 0 }
    const ySortEntities = (a, b) => b.y - a.y

    const entityManager = {
      get updatables () {
        return entityManager._entities || []
      },

      set updatables (r) {
        entityManager._entities = r || []
      },

      addEntity,

      removeEntity,

      update (deltaTime) {
        entityManager.updatables.length > 0 && entityManager.updatables.forEach(entity => {
          entity && typeof entity.update === 'function' && entity.update(deltaTime)
        })
      }
    }

    let lastTime = Date.now() * 0.001
    let deltaTime = 0

    const mainLoop = () => {
      const currentTime = Date.now() * 0.001
      deltaTime = currentTime - lastTime
      lastTime = currentTime

      const updatables = []
      const renderables = []

      // make one pass through the entities to send them to the right system
      entities.length > 0 && entities.forEach(entity => {
        entity && entity.updatable && updatables.push(entity)
        entity && entity.renderable && renderables.push(entity)
      })

      // pass all updatable entities to the entity manager
      entityManager.updatables = updatables

      entityManager.update(deltaTime)

      // y sort the renderable entities
      renderables.sort(ySortEntities)

      // pass all renderable entities to the renderer
      renderer.renderables = renderables

      // clears the frame to background color
      renderer.preFrame && renderer.preFrame()

      // renders all renderables
      renderer.update && renderer.update()

      // applies post-processing effects
      renderer.postFrame && renderer.postFrame()

      // add entities
      addedEntities.length > 0 && addedEntities.forEach(entity => {
        entities.push(entity)
      })

      addedEntities.length > 0 && clearAddedList()

      // remove entities
      removedEntities.length > 0 && removedEntities.forEach(entity => {
        const start = entities.indexOf(entity)
        const deleteCount = 1
        entities.splice(start, deleteCount)
      })

      removedEntities.length > 0 && clearRemovedList()

      window.requestAnimationFrame(mainLoop)
    }

    const game = {
      get width () {
        return runtimeOptions.width
      },

      get height () {
        return runtimeOptions.height
      },

      start () {
        mainLoop()
      }
    }

    const rt = {
      ready (fn) {
        document.addEventListener('DOMContentLoaded', () => {
          assets.load(runtimeOptions.manifest, () => {
            fn && typeof fn === 'function' && fn({
              game,
              assets: assetCollection,
              input,
              audio,
              renderer
            })
          })
        })
      }
    }

    document.title = runtimeOptions.title

    return rt
  }
}

export default runtime
