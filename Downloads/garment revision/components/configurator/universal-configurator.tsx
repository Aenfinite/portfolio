"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Maximize2,
  RotateCcw,
  Check,
  Palette,
  Shirt,
  Scissors,
  Package,
  Heart,
  Star,
  Ruler,
} from "lucide-react"
import { ModelViewer } from "@/components/3d-model-viewer"
import { motion, AnimatePresence } from "framer-motion"
import { getCustomizationOptions } from "@/lib/firebase/unified-product-service"
import { MeasurementStep } from "./steps/measurement-step"
import { JacketLiningStep } from "./steps/jacket-lining-step"
import { CheckoutModal } from "./checkout-modal"
import { ButtonStyleSelector } from "./button-style-selector"
import { ButtonConfiguration } from "./button-configuration"
import { MonogramConfigurator } from "./monogram-configurator"

interface UniversalConfiguratorProps {
  productId: string
  productName: string
  basePrice: number
  productType?: string
}

interface CustomizationOption {
  id: string
  name: string
  type: "color" | "texture" | "component" | "custom"
  category: string
  customComponent?: string
  values: CustomizationValue[]
}

interface CustomizationValue {
  id: string
  name: string
  value: string
  price: number
  thumbnail?: string
  color?: string
  layerControls?: {
    show: string[]
    hide: string[]
  }
}

interface ConfiguratorState {
  [key: string]: {
    optionId: string
    valueId: string
    price: number
    value: string
    color?: string
    layerControls?: {
      show: string[]
      hide: string[]
    }
  }
}

interface MeasurementData {
  sizeType: "standard" | "custom"
  standardSize?: string
  fitType?: string
  customMeasurements?: {
    neck: number
    chest: number
    stomach: number
    hip: number
    length: number
    shoulder: number
    sleeve: number
  }
}

export function UniversalConfigurator({
  productId,
  productName,
  basePrice,
  productType = "garment",
}: UniversalConfiguratorProps) {
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [configuratorState, setConfiguratorState] = useState<ConfiguratorState>({})
  const [measurementData, setMeasurementData] = useState<MeasurementData>({
    sizeType: "standard",
    standardSize: "m",
    fitType: "regular",
    customMeasurements: {
      neck: 0,
      chest: 0,
      stomach: 0,
      hip: 0,
      length: 0,
      shoulder: 0,
      sleeve: 0,
    },
  })
  const [jacketLiningData, setJacketLiningData] = useState({
    liningType: "standard" as "standard" | "custom" | "none",
    standardLiningColor: "",
    customLiningColor: "",
    monogramEnabled: false,
    monogramType: "none" as "initials" | "fullname" | "none",
    monogramText: "",
    monogramFont: "england" as "england" | "arial",
    threadColor: "navy",
  })
  const [buttonData, setButtonData] = useState({
    style: "classic-round",
    color: "natural",
    material: "horn",
  })
  const [buttonConfigData, setButtonConfigData] = useState({
    configuration: "two-button",
  })
  const [monogramData, setMonogramData] = useState({
    text: "",
    position: "no-monogram",
    style: "classic-serif",
    color: "navy",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)

  // Load customization options
  useEffect(() => {
    const loadCustomizationOptions = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log(`Loading customization options for product: ${productId}`)
        const options = await getCustomizationOptions(productId)

        console.log(`Loaded ${options.length} customization options:`, options)
        setCustomizationOptions(options)

        if (options.length === 0) {
          setError(`No customization options found for product ${productId}`)
        }
      } catch (err) {
        console.error("Error loading customization options:", err)
        setError("Failed to load customization options")
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadCustomizationOptions()
    }
  }, [productId])

  // Total steps = customization options + measurement step
  const totalSteps = customizationOptions.length + 1
  const currentStepData = customizationOptions[currentStep]
  const isMeasurementStep = currentStep === customizationOptions.length
  const isJacketLiningStep = currentStepData?.type === "custom" && currentStepData?.customComponent === "jacket-lining"
  const isButtonStep = currentStepData?.id === "button-style" || currentStepData?.id === "button-color"
  const isButtonConfigStep = currentStepData?.id === "button-configuration"
  const isMonogramStep = currentStepData?.id === "embroidered-monogram" || currentStepData?.id === "monogram-text" || currentStepData?.id === "monogram-style" || currentStepData?.id === "monogram-color"

  // Calculate total price including measurement surcharge
  const calculatePrice = () => {
    let total = basePrice || 0
    Object.values(configuratorState).forEach((selection) => {
      total += selection.price || 0
    })
    // Add custom measurement surcharge
    if (measurementData.sizeType === "custom") {
      total += 25 // $25 surcharge for custom measurements
    }
    // Add jacket lining costs
    if (jacketLiningData.liningType === "custom") {
      total += 25 // Custom lining surcharge
    } else if (jacketLiningData.liningType === "none") {
      total -= 15 // Discount for no lining
    }
    // Add monogram costs
    if (jacketLiningData.monogramEnabled) {
      total += jacketLiningData.monogramType === "initials" ? 8.5 : 15.0
    }
    return total
  }

  // Calculate completion percentage
  const calculateCompletion = () => {
    const completedCustomizations = Object.keys(configuratorState).length
    const measurementCompleted =
      measurementData.sizeType === "standard"
        ? measurementData.standardSize && measurementData.fitType
        : Object.values(measurementData.customMeasurements || {}).some((val) => val > 0)

    const totalCompleted = completedCustomizations + (measurementCompleted ? 1 : 0)
    return totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const selectOption = (
    optionId: string,
    valueId: string,
    price: number,
    value: string,
    color?: string,
    layerControls?: any,
  ) => {
    console.log(`Selecting option: ${optionId}, value: ${value}, color: ${color}`)
    setConfiguratorState((prev) => ({
      ...prev,
      [optionId]: {
        optionId,
        valueId,
        price: price || 0,
        value,
        color,
        layerControls,
      },
    }))
  }

  const updateMeasurementData = (updates: Partial<MeasurementData>) => {
    setMeasurementData((prev) => ({ ...prev, ...updates }))
  }

  const updateJacketLiningData = (updates: any) => {
    setJacketLiningData((prev) => ({ ...prev, ...updates }))
  }

  const updateButtonData = (updates: any) => {
    setButtonData((prev) => ({ ...prev, ...updates }))
  }

  const updateButtonConfigData = (updates: any) => {
    setButtonConfigData((prev) => ({ ...prev, ...updates }))
  }

  const updateMonogramData = (updates: any) => {
    setMonogramData((prev) => ({ ...prev, ...updates }))
  }

  const isStepCompleted = (stepIndex: number) => {
    if (stepIndex < customizationOptions.length) {
      const option = customizationOptions[stepIndex]
      if (option?.type === "custom" && option?.customComponent === "jacket-lining") {
        // Jacket lining step is completed if a lining type is selected
        return jacketLiningData.liningType !== "none"
      }
      if (option?.id === "button-style") {
        return buttonData.style !== ""
      }
      if (option?.id === "button-color") {
        return buttonData.color !== ""
      }
      if (option?.id === "embroidered-monogram") {
        return monogramData.position !== ""
      }
      if (option?.id === "monogram-text") {
        return monogramData.position === "no-monogram" || monogramData.text !== ""
      }
      if (option?.id === "monogram-style") {
        return monogramData.position === "no-monogram" || monogramData.style !== ""
      }
      if (option?.id === "monogram-color") {
        return monogramData.position === "no-monogram" || monogramData.color !== ""
      }
      return option && configuratorState[option.id]
    } else {
      // Measurement step
      return measurementData.sizeType === "standard"
        ? measurementData.standardSize && measurementData.fitType
        : Object.values(measurementData.customMeasurements || {}).some((val) => val > 0)
    }
  }

  const getModelUrl = () => {
    switch (productType) {
      case "pants":
        return "sample-pants"
      case "jacket":
        return "sample-jacket"
      case "dress":
        return "sample-dress"
      default:
        return "sample-shirt"
    }
  }

  // Generate customizations for 3D model
  const generateCustomizations = () => {
    const customizations: Record<string, any> = {}

    Object.values(configuratorState).forEach((selection) => {
      const option = customizationOptions.find((opt) => opt.id === selection.optionId)
      const value = option?.values.find((val) => val.id === selection.valueId)

      if (value && option) {
        // Handle colors but NOT for button color changes
        const colorValue = selection.color || value.color
        const optionNameLower = option.name.toLowerCase().replace(/\s+/g, "")
        
        if (colorValue && !optionNameLower.includes("button")) {
          customizations.color = colorValue
          customizations.fabricColor = colorValue

          // Also set specific color properties based on option name
          if (optionNameLower.includes("fabric") || optionNameLower.includes("main")) {
            customizations.fabricColor = colorValue
            customizations.mainColor = colorValue
          } else if (optionNameLower.includes("collar")) {
            customizations.collarColor = colorValue
          } else if (optionNameLower.includes("cuff")) {
            customizations.cuffColor = colorValue
          } else if (optionNameLower.includes("pocket")) {
            customizations.pocketColor = colorValue
          } else if (optionNameLower.includes("sleeve")) {
            customizations.sleeveColor = colorValue
          } else if (optionNameLower.includes("lining")) {
            customizations.liningColor = colorValue
          } else if (optionNameLower.includes("trim")) {
            customizations.trimColor = colorValue
          } else if (optionNameLower.includes("accent")) {
            customizations.accentColor = colorValue
          }
        }

        // Handle fabric types
        if (option.type === "texture") {
          customizations.fabrictype = value.value
        }

        // Handle ALL style customizations by mapping option names to customization keys
        if (optionNameLower.includes("collar")) {
          customizations.collarstyle = value.value
        } else if (optionNameLower.includes("cuff")) {
          customizations.cuffstyle = value.value
        } else if (optionNameLower.includes("pocket")) {
          customizations.pocketstyle = value.value
        } else if (optionNameLower.includes("button") && optionNameLower.includes("style")) {
          customizations.buttonstyle = value.value
        } else if (optionNameLower.includes("button") && optionNameLower.includes("configuration")) {
          customizations.buttonConfiguration = value.value
        } else if (optionNameLower.includes("fit")) {
          customizations.fitstyle = value.value
        } else if (optionNameLower.includes("monogram")) {
          customizations.monogram = value.value
        } else if (optionNameLower.includes("waistband")) {
          customizations.waistbandstyle = value.value
        } else if (optionNameLower.includes("hem")) {
          customizations.hemstyle = value.value
        } else if (optionNameLower.includes("belt")) {
          customizations.beltloops = value.value
        } else if (optionNameLower.includes("lapel")) {
          customizations.lapelstyle = value.value
        } else if (optionNameLower.includes("vent")) {
          customizations.ventstyle = value.value
        } else if (optionNameLower.includes("lining")) {
          customizations.liningstyle = value.value
        } else if (optionNameLower.includes("sleeve") && optionNameLower.includes("button")) {
          customizations.sleevebuttonstyle = value.value
        }
      }
    })

    // Add button customizations
    if (buttonData.style || buttonData.color || buttonData.material) {
      customizations.buttonStyle = buttonData.style
      customizations.button_style = buttonData.style
      customizations.buttonColor = getButtonColorValue(buttonData.color)
      customizations.button_color = getButtonColorValue(buttonData.color)
      customizations.buttonMaterial = buttonData.material
      customizations.button_material = buttonData.material
    }

    // Add button configuration
    if (buttonConfigData.configuration) {
      customizations.buttonConfiguration = buttonConfigData.configuration
    }

    // Add monogram customizations
    if (monogramData.text && monogramData.position !== "no-monogram") {
      customizations.monogramText = monogramData.text
      customizations.monogramPosition = monogramData.position
      customizations.monogramColor = getMonogramColorValue(monogramData.color)
      customizations.monogramData = JSON.stringify(monogramData)
    }

    console.log("Generated customizations for 3D model:", customizations)
    return customizations
  }

  // Helper function to get button color value
  const getButtonColorValue = (colorId: string) => {
    const colorMap: Record<string, string> = {
      "natural": "#F5E6D3",
      "dark-brown": "#4A2C2A",
      "black": "#1A1A1A",
      "navy": "#1565C0",
      "gold": "#FFD700",
      "silver": "#C0C0C0",
      "bronze": "#CD7F32",
      "pearl-white": "#F8F8FF",
    }
    return colorMap[colorId] || "#F5E6D3"
  }

  // Helper function to get monogram color value
  const getMonogramColorValue = (colorId: string) => {
    const colorMap: Record<string, string> = {
      "navy": "#1565C0",
      "black": "#000000",
      "white": "#FFFFFF",
      "gold": "#FFD700",
      "silver": "#C0C0C0",
      "burgundy": "#8E24AA",
      "forest": "#2E7D32",
      "royal-blue": "#4169E1",
    }
    return colorMap[colorId] || "#1565C0"
  }

  // Generate layer controls for 3D model
  const generateLayerControls = () => {
    const layerControls: Record<string, string[]> = {}

    Object.values(configuratorState).forEach((selection) => {
      const option = customizationOptions.find((opt) => opt.id === selection.optionId)
      const value = option?.values.find((val) => val.id === selection.valueId)

      if (value?.layerControls) {
        if (value.layerControls.show) {
          layerControls.show = [...(layerControls.show || []), ...value.layerControls.show]
        }
        if (value.layerControls.hide) {
          layerControls.hide = [...(layerControls.hide || []), ...value.layerControls.hide]
        }
      }
    })

    return layerControls
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fabric":
        return <Palette className="w-4 h-4" />
      case "style":
        return <Shirt className="w-4 h-4" />
      case "fit":
        return <Scissors className="w-4 h-4" />
      case "personalization":
        return <Star className="w-4 h-4" />
      case "interior":
        return <Package className="w-4 h-4" />
      case "details":
        return <Heart className="w-4 h-4" />
      case "measurements":
        return <Ruler className="w-4 h-4" />
      default:
        return <Shirt className="w-4 h-4" />
    }
  }

  // Generate order summary for checkout
  const generateOrderSummary = () => {
    const customizations = Object.values(configuratorState).map((selection) => {
      const option = customizationOptions.find((opt) => opt.id === selection.optionId)
      return {
        category: option?.name || "Unknown",
        value: selection.value,
        price: selection.price || 0,
      }
    })

    return {
      productName,
      basePrice: basePrice || 0,
      customizations,
      measurementData,
      totalPrice: calculatePrice(),
    }
  }

  const handleAddToCart = () => {
    setShowCheckoutModal(true)
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customization options...</p>
          <p className="text-sm text-gray-500 mt-2">Product: {productName}</p>
        </div>
      </div>
    )
  }

  if (error || customizationOptions.length === 0) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Customization Not Available</h2>
          <p className="text-gray-600 mb-4">{error || "No customization options are configured for this product."}</p>
          <p className="text-sm text-gray-500 mb-4">Product ID: {productId}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  const currentPrice = calculatePrice()

  return (
    <>
      <div className="w-full h-screen bg-gray-50 flex">
        {/* LEFT SIDEBAR - FIXED - Matches Reference Design */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Sidebar Header - Matches Reference */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{productName}</h1>
                <p className="text-sm text-gray-600">{Object.keys(configuratorState).length} customizations applied</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">${currentPrice.toFixed(2)}</div>
                <Badge variant="outline" className="text-xs mt-1">
                  Step {currentStep + 1} of {totalSteps}
                </Badge>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {Object.keys(configuratorState).length + (isStepCompleted(customizationOptions.length) ? 1 : 0)} of{" "}
                  {totalSteps} completed
                </span>
                <span className="text-sm text-gray-600">{calculateCompletion()}%</span>
              </div>
              <Progress value={calculateCompletion()} className="h-2" />
            </div>
          </div>

          {/* Current Step Header */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <div className="flex items-center gap-2">
              {isMeasurementStep ? <Ruler className="w-4 h-4" /> : getCategoryIcon(currentStepData?.category || "")}
              <h2 className="font-semibold text-gray-900">
                {isMeasurementStep 
                  ? "Measurements" 
                  : isJacketLiningStep 
                    ? "Lining & Monogram" 
                    : isButtonStep
                      ? "Button Customization"
                      : isMonogramStep
                        ? "Embroidered Monogram"
                    : currentStepData?.name || "Customize"}
              </h2>
              {!isMeasurementStep && !isJacketLiningStep && !isButtonStep && !isMonogramStep && currentStepData && (
                <Badge variant="secondary" className="text-xs">
                  {currentStepData.values.length} options
                </Badge>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                {isMeasurementStep ? (
                  <MeasurementStep
                    sizeType={measurementData.sizeType}
                    standardSize={measurementData.standardSize || "m"}
                    fitType={measurementData.fitType || "regular"}
                    customMeasurements={
                      measurementData.customMeasurements || {
                        neck: 0,
                        chest: 0,
                        stomach: 0,
                        hip: 0,
                        length: 0,
                        shoulder: 0,
                        sleeve: 0,
                      }
                    }
                    garmentType={productType as "pants" | "jacket" | "shirt" | "suit" | "blazer"}
                    onUpdate={updateMeasurementData}
                  />
                ) : isJacketLiningStep ? (
                  <JacketLiningStep
                    liningType={jacketLiningData.liningType}
                    standardLiningColor={jacketLiningData.standardLiningColor}
                    customLiningColor={jacketLiningData.customLiningColor}
                    monogramEnabled={jacketLiningData.monogramEnabled}
                    monogramType={jacketLiningData.monogramType === "none" ? "initials" : jacketLiningData.monogramType}
                    monogramText={jacketLiningData.monogramText}
                    monogramFont={jacketLiningData.monogramFont}
                    threadColor={jacketLiningData.threadColor}
                    onUpdate={updateJacketLiningData}
                  />
                ) : isButtonStep ? (
                  <ButtonStyleSelector
                    selectedStyle={buttonData.style}
                    selectedColor={buttonData.color}
                    selectedMaterial={buttonData.material}
                    onStyleChange={(style) => {
                      updateButtonData({ style })
                      // Don't call selectOption for button changes to avoid fabric color conflicts
                    }}
                    onColorChange={(color) => {
                      updateButtonData({ color })
                      // Don't call selectOption for button color changes to avoid fabric color conflicts
                    }}
                  />
                ) : isButtonConfigStep ? (
                  <ButtonConfiguration
                    selectedConfiguration={buttonConfigData.configuration}
                    onConfigurationChange={(config) => {
                      setButtonConfigData({ configuration: config })
                      selectOption(currentStepData!.id, config, 0, config)
                    }}
                  />
                ) : isMonogramStep ? (
                  <MonogramConfigurator
                    selectedMonogram={monogramData.position}
                    selectedStyle={monogramData.style}
                    selectedColor={monogramData.color}
                    monogramText={monogramData.text}
                    onMonogramChange={(config) => {
                      updateMonogramData(config)
                      // Don't call selectOption for monogram changes to avoid conflicts
                    }}
                  />
                ) : (
                  currentStepData && (
                    <div className="space-y-4">
                      {/* Color Options - Matches Reference Grid Layout */}
                      {currentStepData.type === "color" && (
                        <div className="grid grid-cols-4 gap-3">
                          {currentStepData.values.map((value) => (
                            <div
                              key={value.id}
                              onClick={() =>
                                selectOption(
                                  currentStepData.id,
                                  value.id,
                                  value.price,
                                  value.value,
                                  value.color || value.value,
                                  value.layerControls,
                                )
                              }
                              className={`
                                relative p-2 rounded-lg border-2 cursor-pointer transition-all hover:scale-105
                                ${
                                  configuratorState[currentStepData.id]?.valueId === value.id
                                    ? "border-blue-500 ring-2 ring-blue-200"
                                    : "border-gray-200 hover:border-gray-300"
                                }
                              `}
                            >
                              <div className="text-center">
                                <div
                                  className="w-12 h-12 rounded-lg mx-auto mb-2 border border-gray-300"
                                  style={{ backgroundColor: value.color || value.value }}
                                />
                                <div className="text-xs font-medium text-gray-900 truncate">{value.name}</div>
                                {value.price > 0 && (
                                  <div className="text-xs text-green-600 font-semibold">+${value.price}</div>
                                )}
                              </div>
                              {/* Green checkmark for selected option - matches reference */}
                              {configuratorState[currentStepData.id]?.valueId === value.id && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Non-Color Options */}
                      {(currentStepData.type === "texture" || currentStepData.type === "component") && (
                        <div className="space-y-3">
                          {currentStepData.values.map((value) => (
                            <div
                              key={value.id}
                              onClick={() =>
                                selectOption(
                                  currentStepData.id,
                                  value.id,
                                  value.price,
                                  value.value,
                                  value.color,
                                  value.layerControls,
                                )
                              }
                              className={`
                                p-4 rounded-lg border-2 cursor-pointer transition-all
                                ${
                                  configuratorState[currentStepData.id]?.valueId === value.id
                                    ? "border-blue-500 bg-blue-50 shadow-sm"
                                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                }
                              `}
                            >
                              <div className="flex items-center gap-3">
                                {value.thumbnail && (
                                  <img
                                    src={value.thumbnail || "/placeholder.svg"}
                                    alt={value.name}
                                    className="w-12 h-12 rounded-lg object-cover border"
                                  />
                                )}
                                {value.color && !value.thumbnail && (
                                  <div
                                    className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                                    style={{ backgroundColor: value.color }}
                                  />
                                )}
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-gray-900">{value.name}</div>
                                  {value.price > 0 && (
                                    <div className="text-green-600 font-semibold text-sm">+${value.price}</div>
                                  )}
                                  {value.price === 0 && <div className="text-gray-500 text-xs">Included</div>}
                                </div>
                                {configuratorState[currentStepData.id]?.valueId === value.id && (
                                  <Check className="w-5 h-5 text-blue-500" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar Footer - Matches Reference */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {currentStep < totalSteps - 1 ? (
                <Button onClick={nextStep} size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT AREA - 3D MODEL + CONTROLS */}
        <div className="flex-1 relative h-screen bg-gray-100">
          {/* Top Controls */}
          <div className="absolute top-0 right-0 z-10 p-6 flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* 3D Model Viewer - FULL HEIGHT */}
          <div className="absolute inset-0 w-full h-full">
            <ModelViewer
              modelUrl={getModelUrl()}
              customizations={generateCustomizations()}
              layerControls={generateLayerControls()}
            />
          </div>

          {/* Bottom Instructions - Matches Reference */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-lg">
              Drag to rotate • Scroll to zoom • Double-click to reset view
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        orderSummary={generateOrderSummary()}
      />
    </>
  )
}
