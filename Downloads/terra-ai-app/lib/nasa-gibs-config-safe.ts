/**
 * NASA GIBS Configuration Only
 * Safe for server-side rendering - no Three.js imports
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
    id: 'SMAP_L3_Passive_Soil_Moisture_Gamma',
    name: 'SMAP Soil Moisture',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/SMAP_L3_Passive_Soil_Moisture_Gamma/default/{date}/GoogleMapsCompatible_Level6/{z}/{y}/{x}.png',
    description: 'Soil moisture levels'
  },
  GPM_PRECIPITATION: {
    id: 'GPM_3IMERGHH_06_precipitationCal',
    name: 'GPM Precipitation',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/GPM_3IMERGHH_06_precipitationCal/default/{date}/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png',
    description: 'Real-time precipitation data'
  },
  // Temperature & Climate
  MODIS_LST_DAY: {
    id: 'MODIS_Terra_Land_Surface_Temp_Day',
    name: 'MODIS Land Surface Temperature (Day)',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Day/default/{date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    description: 'Daytime surface temperature'
  },
  MODIS_LST_NIGHT: {
    id: 'MODIS_Terra_Land_Surface_Temp_Night',
    name: 'MODIS Land Surface Temperature (Night)',
    baseUrl: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_Land_Surface_Temp_Night/default/{date}/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    description: 'Nighttime surface temperature'
  }
}

// Default layer configurations
export const DEFAULT_LAYERS = [
  NASA_GIBS_LAYERS.MODIS_TRUE_COLOR,
  NASA_GIBS_LAYERS.MODIS_NDVI,
  NASA_GIBS_LAYERS.SMAP_SOIL_MOISTURE
]

// Coordinate system utilities (no Three.js dependencies)
export const COORDINATE_UTILS = {
  // Convert lat/lng to tile coordinates for zoom level
  latLngToTile: (lat: number, lng: number, zoom: number) => {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom))
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))
    return { x, y, z: zoom }
  },
  
  // Convert tile coordinates to lat/lng bounds
  tileToBounds: (x: number, y: number, zoom: number) => {
    const n = Math.pow(2, zoom)
    const lonLeft = x / n * 360 - 180
    const lonRight = (x + 1) / n * 360 - 180
    const latTop = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI
    const latBottom = Math.atan(Math.sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180 / Math.PI
    return {
      north: latTop,
      south: latBottom,
      east: lonRight,
      west: lonLeft
    }
  }
}

// Date formatting for NASA GIBS API
export function formatDateForGIBS(date: Date = new Date()): string {
  return date.toISOString().split('T')[0]
}

// Build tile URL with parameters
export function buildTileUrl(layer: typeof NASA_GIBS_LAYERS[keyof typeof NASA_GIBS_LAYERS], x: number, y: number, z: number, date?: Date): string {
  const dateStr = formatDateForGIBS(date)
  return layer.baseUrl
    .replace('{date}', dateStr)
    .replace('{x}', x.toString())
    .replace('{y}', y.toString())
    .replace('{z}', z.toString())
}