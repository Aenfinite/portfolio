/**
 * NASA Farm Navigators - Real NASA Data Integration
 * Educational farming game using authentic NASA satellite data
 * Challenge: Bridge gap between complex NASA data and practical farming applications
 */

export interface NASADataConfig {
  earthdataLoginToken?: string;
  baseUrls: {
    earthdata: string;
    giovanni: string;
    appeears: string;
    worldview: string;
    gis: string;
    usgs: string;
    nasa_harvest: string;
  };
}

// Real NASA Dataset Identifiers for Agricultural Applications
export const NASA_DATASETS = {
  // Soil Moisture - Critical for irrigation decisions
  SMAP_L3: 'SPL3SMP_E.003', // Enhanced Level-3 radiometer global daily 9 km EASE-Grid
  SMAP_L4: 'SPL4SMGP.007', // Level-4 Global 3-hourly 9 km EASE-Grid
  
  // Vegetation Health - NDVI, EVI for crop monitoring
  MODIS_NDVI: 'MOD13Q1.061', // Terra MODIS 250m 16-day NDVI
  MODIS_EVI: 'MOD13A1.061', // Terra MODIS 500m 16-day EVI
  VIIRS_NDVI: 'VNP13A1.001', // VIIRS 500m 16-day NDVI
  
  // Precipitation - GPM for water management
  GPM_IMERG: 'GPM_3IMERGHH.06', // Half-hourly precipitation
  GPM_MONTHLY: 'GPM_3IMERGM.06', // Monthly precipitation
  
  // Temperature and Evapotranspiration
  ECOSTRESS_ET: 'ECO3ETPTJPL.001', // Evapotranspiration PT-JPL
  ECOSTRESS_LST: 'ECO2LSTE.001', // Land Surface Temperature & Emissivity
  
  // Land Cover and Crop Type
  MODIS_LANDCOVER: 'MCD12Q1.061', // Land Cover Type Yearly Global 500m
  CROP_DATA_LAYER: 'NASS_CDL', // USDA NASS Cropland Data Layer
  
  // High-resolution imagery
  LANDSAT_8: 'LANDSAT_LC08_C02_T1_L2', // Landsat 8 Level-2 Surface Reflectance
  LANDSAT_9: 'LANDSAT_LC09_C02_T1_L2', // Landsat 9 Level-2 Surface Reflectance
  
  // Climate and Weather
  AIRS_TEMPERATURE: 'AIRS3STD.007', // Atmospheric temperature profiles
  MERRA2_WEATHER: 'M2T1NXSLV.5.12.4', // Modern-Era weather reanalysis
}

// Educational farming scenarios based on real agricultural challenges
export interface FarmingScenario {
  id: string;
  name: string;
  description: string;
  farmType: 'smallholder' | 'commercial' | 'industrial';
  region: 'midwest_us' | 'california' | 'great_plains' | 'southeast_us' | 'global';
  crops: string[];
  challenges: string[];
  datasets_required: string[];
  educational_objectives: string[];
}

export interface GeographicBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface TimeRange {
  start: string; // ISO date string
  end: string;   // ISO date string
}

export interface SMAPData {
  soilMoisture: number;
  timestamp: string;
  coordinates: [number, number];
  qualityFlag: number;
}

export interface MODISData {
  ndvi: number;
  evi: number;
  timestamp: string;
  coordinates: [number, number];
  pixelReliability: number;
}

export interface GPMData {
  precipitationRate: number;
  precipitationCal: number;
  timestamp: string;
  coordinates: [number, number];
}

export interface ECOSTRESSData {
  evapotranspiration: number;
  landSurfaceTemperature: number;
  timestamp: string;
  coordinates: [number, number];
  cloudMask: number;
}

export interface LandsatData {
  bands: {
    red: number;
    green: number;
    blue: number;
    nir: number;
    swir1: number;
    swir2: number;
  };
  timestamp: string;
  coordinates: [number, number];
  cloudCover: number;
}

export class NASADataClient {
  private config: NASADataConfig;

  constructor(config: NASADataConfig) {
    this.config = {
      earthdataLoginToken: process.env.NASA_EARTHDATA_TOKEN || config.earthdataLoginToken,
      baseUrls: {
        earthdata: config.baseUrls?.earthdata || 'https://search.earthdata.nasa.gov',
        giovanni: config.baseUrls?.giovanni || 'https://giovanni.gsfc.nasa.gov/giovanni',
        appeears: config.baseUrls?.appeears || 'https://appeears.earthdatacloud.nasa.gov/api/v1',
        worldview: config.baseUrls?.worldview || 'https://worldview.earthdata.nasa.gov/api/v1',
        gis: config.baseUrls?.gis || 'https://gis.earthdata.nasa.gov/api/v1',
        usgs: config.baseUrls?.usgs || 'https://earthexplorer.usgs.gov/api/json/stable',
        nasa_harvest: config.baseUrls?.nasa_harvest || 'https://nasaharvest.org/api/v1',
      },
    };
  }

  private async makeRequest(url: string, options: RequestInit = {}) {
    const headers = {
      'Authorization': `Bearer ${this.config.earthdataLoginToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(`NASA API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('NASA API Request failed:', error);
      throw error;
    }
  }

  // SMAP Soil Moisture Data
  async getSMAPData(bounds: GeographicBounds, timeRange: TimeRange): Promise<SMAPData[]> {
    const url = `${this.config.baseUrls.appeears}/sample/point`;
    const payload = {
      dataset: 'SPL3SMP_E',
      layers: ['Soil_Moisture_Retrieval_Data_AM_soil_moisture'],
      coordinates: [
        { longitude: bounds.west, latitude: bounds.south },
        { longitude: bounds.east, latitude: bounds.north },
      ],
      startDate: timeRange.start,
      endDate: timeRange.end,
    };

    const response = await this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response.data.map((item: any) => ({
      soilMoisture: item.value,
      timestamp: item.date,
      coordinates: [item.longitude, item.latitude],
      qualityFlag: item.quality,
    }));
  }

  // MODIS Vegetation Health Data
  async getMODISData(bounds: GeographicBounds, timeRange: TimeRange): Promise<MODISData[]> {
    const url = `${this.config.baseUrls.appeears}/sample/area`;
    const payload = {
      dataset: 'MOD13Q1',
      layers: ['_250m_16_days_NDVI', '_250m_16_days_EVI'],
      coordinates: [
        [bounds.west, bounds.south],
        [bounds.east, bounds.south],
        [bounds.east, bounds.north],
        [bounds.west, bounds.north],
        [bounds.west, bounds.south],
      ],
      startDate: timeRange.start,
      endDate: timeRange.end,
    };

    const response = await this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response.data.map((item: any) => ({
      ndvi: item.ndvi / 10000, // Scale factor
      evi: item.evi / 10000,
      timestamp: item.date,
      coordinates: [item.longitude, item.latitude],
      pixelReliability: item.pixel_reliability,
    }));
  }

  // GPM Precipitation Data
  async getGPMData(bounds: GeographicBounds, timeRange: TimeRange): Promise<GPMData[]> {
    const url = `${this.config.baseUrls.giovanni}/data/GPM_3IMERGDL`;
    const params = new URLSearchParams({
      bbox: `${bounds.west},${bounds.south},${bounds.east},${bounds.north}`,
      startTime: timeRange.start,
      endTime: timeRange.end,
      variables: 'precipitationCal,precipitationUncal',
    });

    const response = await this.makeRequest(`${url}?${params}`);

    return response.data.map((item: any) => ({
      precipitationRate: item.precipitationCal,
      precipitationCal: item.precipitationUncal,
      timestamp: item.time,
      coordinates: [item.lon, item.lat],
    }));
  }

  // ECOSTRESS Evapotranspiration Data
  async getECOSTRESSData(bounds: GeographicBounds, timeRange: TimeRange): Promise<ECOSTRESSData[]> {
    const url = `${this.config.baseUrls.appeears}/sample/point`;
    const payload = {
      dataset: 'ECO3ETPTJPL',
      layers: ['Evapotranspiration_PT_JPL_ETactual', 'SurfaceTemperature'],
      coordinates: [
        { longitude: (bounds.west + bounds.east) / 2, latitude: (bounds.south + bounds.north) / 2 },
      ],
      startDate: timeRange.start,
      endDate: timeRange.end,
    };

    const response = await this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response.data.map((item: any) => ({
      evapotranspiration: item.et,
      landSurfaceTemperature: item.lst,
      timestamp: item.date,
      coordinates: [item.longitude, item.latitude],
      cloudMask: item.cloud_mask,
    }));
  }

  // Landsat Imagery Data
  async getLandsatData(bounds: GeographicBounds, timeRange: TimeRange): Promise<LandsatData[]> {
    const url = `${this.config.baseUrls.appeears}/sample/area`;
    const payload = {
      dataset: 'HLS_L30',
      layers: ['B02', 'B03', 'B04', 'B05', 'B06', 'B07'], // Blue, Green, Red, NIR, SWIR1, SWIR2
      coordinates: [
        [bounds.west, bounds.south],
        [bounds.east, bounds.south],
        [bounds.east, bounds.north],
        [bounds.west, bounds.north],
        [bounds.west, bounds.south],
      ],
      startDate: timeRange.start,
      endDate: timeRange.end,
    };

    const response = await this.makeRequest(url, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response.data.map((item: any) => ({
      bands: {
        red: item.B04,
        green: item.B03,
        blue: item.B02,
        nir: item.B05,
        swir1: item.B06,
        swir2: item.B07,
      },
      timestamp: item.date,
      coordinates: [item.longitude, item.latitude],
      cloudCover: item.cloud_cover,
    }));
  }

  // Comprehensive Agricultural Data
  async getAgriculturalData(bounds: GeographicBounds, timeRange: TimeRange) {
    try {
      const [smapData, modisData, gpmData, ecostressData, landsatData] = await Promise.all([
        this.getSMAPData(bounds, timeRange),
        this.getMODISData(bounds, timeRange),
        this.getGPMData(bounds, timeRange),
        this.getECOSTRESSData(bounds, timeRange),
        this.getLandsatData(bounds, timeRange),
      ]);

      return {
        soilMoisture: smapData,
        vegetation: modisData,
        precipitation: gpmData,
        evapotranspiration: ecostressData,
        imagery: landsatData,
        metadata: {
          bounds,
          timeRange,
          lastUpdated: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Failed to fetch agricultural data:', error);
      throw error;
    }
  }

  // Weather Analysis for Farm Planning
  async getWeatherAnalysis(coordinates: [number, number], days: number = 7) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    const bounds: GeographicBounds = {
      north: coordinates[1] + 0.01,
      south: coordinates[1] - 0.01,
      east: coordinates[0] + 0.01,
      west: coordinates[0] - 0.01,
    };

    const timeRange: TimeRange = {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    };

    const data = await this.getAgriculturalData(bounds, timeRange);

    // Calculate averages and trends
    const avgSoilMoisture = data.soilMoisture.reduce((sum, item) => sum + item.soilMoisture, 0) / data.soilMoisture.length;
    const avgNDVI = data.vegetation.reduce((sum, item) => sum + item.ndvi, 0) / data.vegetation.length;
    const totalPrecipitation = data.precipitation.reduce((sum, item) => sum + item.precipitationRate, 0);
    const avgET = data.evapotranspiration.reduce((sum, item) => sum + item.evapotranspiration, 0) / data.evapotranspiration.length;

    return {
      summary: {
        avgSoilMoisture,
        avgNDVI,
        totalPrecipitation,
        avgEvapotranspiration: avgET,
        vegetationHealth: avgNDVI > 0.6 ? 'Excellent' : avgNDVI > 0.4 ? 'Good' : avgNDVI > 0.2 ? 'Fair' : 'Poor',
        irrigationNeeded: avgSoilMoisture < 0.3,
        weatherRisk: totalPrecipitation > 50 ? 'High' : totalPrecipitation > 20 ? 'Medium' : 'Low',
      },
      rawData: data,
      trends: {
        soilMoistureTrend: this.calculateTrend(data.soilMoisture.map(d => d.soilMoisture)),
        vegetationTrend: this.calculateTrend(data.vegetation.map(d => d.ndvi)),
        precipitationTrend: this.calculateTrend(data.precipitation.map(d => d.precipitationRate)),
      },
    };
  }

  private calculateTrend(values: number[]): 'increasing' | 'decreasing' | 'stable' {
    if (values.length < 2) return 'stable';
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
    
    const change = (secondAvg - firstAvg) / firstAvg;
    
    if (change > 0.1) return 'increasing';
    if (change < -0.1) return 'decreasing';
    return 'stable';
  }
}

// Real farming scenarios for educational gameplay
export const FARMING_SCENARIOS: FarmingScenario[] = [
  {
    id: 'drought-management',
    name: 'Drought Management Challenge',
    description: 'Learn to manage water resources during drought conditions using SMAP soil moisture data',
    farmType: 'commercial',
    region: 'california',
    crops: ['almonds', 'grapes', 'citrus'],
    challenges: ['water_scarcity', 'heat_stress', 'irrigation_optimization'],
    datasets_required: [NASA_DATASETS.SMAP_L3, NASA_DATASETS.ECOSTRESS_ET, NASA_DATASETS.GPM_IMERG],
    educational_objectives: [
      'Understanding soil moisture depth profiles',
      'Interpreting evapotranspiration rates',
      'Optimizing irrigation timing and amounts'
    ]
  },
  {
    id: 'crop-health-monitoring',
    name: 'Crop Health Monitoring',
    description: 'Use MODIS vegetation indices to detect crop stress and optimize yields',
    farmType: 'smallholder',
    region: 'midwest_us',
    crops: ['corn', 'soybeans'],
    challenges: ['disease_detection', 'nutrient_deficiency', 'growth_monitoring'],
    datasets_required: [NASA_DATASETS.MODIS_NDVI, NASA_DATASETS.MODIS_EVI, NASA_DATASETS.LANDSAT_8],
    educational_objectives: [
      'Understanding NDVI vs EVI differences',
      'Recognizing stress patterns in vegetation indices',
      'Linking satellite data to field observations'
    ]
  },
  {
    id: 'precision-agriculture',
    name: 'Precision Agriculture Planning',
    description: 'Integrate multiple NASA datasets for comprehensive farm management decisions',
    farmType: 'industrial',
    region: 'great_plains',
    crops: ['wheat', 'corn', 'soybeans'],
    challenges: ['variable_rate_application', 'yield_optimization', 'resource_efficiency'],
    datasets_required: [
      NASA_DATASETS.SMAP_L4, 
      NASA_DATASETS.MODIS_NDVI, 
      NASA_DATASETS.GPM_MONTHLY,
      NASA_DATASETS.ECOSTRESS_LST,
      NASA_DATASETS.MODIS_LANDCOVER
    ],
    educational_objectives: [
      'Multi-sensor data fusion techniques',
      'Understanding spatial and temporal resolution trade-offs',
      'Creating management zones from satellite data'
    ]
  }
]

// Default NASA client instance for educational game
export const nasaClient = new NASADataClient({
  baseUrls: {
    earthdata: 'https://search.earthdata.nasa.gov',
    giovanni: 'https://giovanni.gsfc.nasa.gov/giovanni', 
    appeears: 'https://appeears.earthdatacloud.nasa.gov/api/v1',
    worldview: 'https://worldview.earthdata.nasa.gov/api/v1',
    gis: 'https://gis.earthdata.nasa.gov/api/v1',
    usgs: 'https://earthexplorer.usgs.gov/api/json/stable',
    nasa_harvest: 'https://nasaharvest.org/api/v1',
  },
});