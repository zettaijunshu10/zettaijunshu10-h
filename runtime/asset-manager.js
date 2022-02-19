const assetManager = {
  create () {
    const assetCollection = {
      images: {},
      atlases: {},
      sounds: {},
      music: {},
      data: {}
    }

    const assets = {
      load (manifest, onLoadComplete) {
        const keysToLoad = Object.keys(manifest)
        const toLoad = keysToLoad.length

        if (!toLoad) {
          return onLoadComplete()
        }

        let loaded = 0

        const onAssetLoaded = (category, key, asset) => {
          assetCollection[category][key] = asset
          loaded += 1
          if (loaded >= toLoad) {
            return onLoadComplete()
          }
        }

        const loaders = {
          image (key, src) {
            const imageAsset = new Image()
            imageAsset.onload = () => {
              onAssetLoaded('images', key, imageAsset)
            }
            imageAsset.onerror = err => {
              throw new Error(err)
            }
            imageAsset.src = src
          },

          atlas (key, src) {
            const atlasAsset = new Image()
            atlasAsset.onload = () => {
              onAssetLoaded('atlases', key, atlasAsset)
            }
            atlasAsset.onerror = err => {
              throw new Error(err)
            }
            atlasAsset.src = src
          }

          // TODO: implement the other asset types
          // sound (key, src) {

          // },

          // music (key, src) {

          // },

          // data (key, src) {

          // }
        }

        const failedToLoad = (src, type) => {
          throw new Error(`Unable to load ${src} Unknown asset type: ${type}`)
        }

        keysToLoad.forEach(key => {
          const { src, type } = manifest[key]
          const loader = loaders[type]
          loader && loader(key, src)
          !loader && failedToLoad(src, type)
        })
      }
    }

    return [ assets, assetCollection ]
  }
}

export default assetManager
