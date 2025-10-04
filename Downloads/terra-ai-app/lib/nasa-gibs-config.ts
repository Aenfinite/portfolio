/**
 * Client-Safe NASA GIBS Configuration
 * Pure configuration without Three.js dependencies
 */

// NASA GIBS WMTS tile endpoints (free, no login required)
export const NASA_GIBS_LAYERS = {
  // Vegetation & Agriculture
  MODIS_NDVI: {
    id: 'MODIS_Terra_NDVI_8Day',
    name: 'MODIS NDVI (8-day)',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_NDVI_8Day/default/{date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png',
    description: 'Vegetation health index'
  },
  MODIS_TRUE_COLOR: {
    id: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    name: 'MODIS True Color',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/{date}/GoogleMapsCompatible_Level9/{z}/{y}/{x}.png',
    description: 'Satellite true color imagery'
  },
  VIIRS_NDVI: {
    id: 'VIIRS_SNPP_NDVI',
    name: 'VIIRS NDVI',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_SNPP_NDVI/default/{date}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
    description: 'High-resolution vegetation index'
  },
  // Soil & Water
  SMAP_SOIL_MOISTURE: {
    id: 'SMAP_L4_SM_gph',
    name: 'SMAP Soil Moisture',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/SMAP_L4_SM_gph/default/{date}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png',
    description: 'Surface soil moisture'
  },
  // Precipitation
  GPM_PRECIPITATION: {
    id: 'GPM_3IMERGHH_06_precipitation',
    name: 'GPM Precipitation',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/GPM_3IMERGHH_06_precipitation/default/{date}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
    description: 'Half-hourly precipitation rate'
  }
}

// Utility functions for tile calculations
export const tileUtils = {
  // Convert lat/lng to tile coordinates at given zoom level
  latLngToTile: (lat: number, lng: number, zoom: number) => {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom))
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))
    return { x, y, z: zoom }
  },

  // Convert tile coordinates to lat/lng bounds
  tileToBounds: (x: number, y: number, z: number) => {
    const n = Math.pow(2, z)
    const west = x / n * 360 - 180
    const east = (x + 1) / n * 360 - 180
    const north = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI
    const south = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI
    return { west, south, east, north }
  },

  // Format date for NASA GIBS (YYYY-MM-DD)
  formatDate: (date: Date = new Date()) => {
    return date.toISOString().split('T')[0]
  },

  // Build tile URL with date
  buildTileUrl: (layer: typeof NASA_GIBS_LAYERS[keyof typeof NASA_GIBS_LAYERS], x: number, y: number, z: number, date?: string) => {
    const formattedDate = date || tileUtils.formatDate()
    return layer.baseUrl
      .replace('{x}', x.toString())
      .replace('{y}', y.toString())
      .replace('{z}', z.toString())
      .replace('{date}', formattedDate)
  }
}

// Default layer configurations
export const defaultLayers = ['MODIS_TRUE_COLOR', 'MODIS_NDVI'] as const

// Layer categories for UI organization
export const layerCategories = {
  vegetation: ['MODIS_NDVI', 'VIIRS_NDVI'],
  imagery: ['MODIS_TRUE_COLOR'],
  soil: ['SMAP_SOIL_MOISTURE'],
  weather: ['GPM_PRECIPITATION']
} as const