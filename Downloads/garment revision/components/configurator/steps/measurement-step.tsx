"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Ruler, Video, Edit3, ChevronLeft, ChevronRight, CheckCircle, Info } from "lucide-react"

interface MeasurementStepProps {
  sizeType?: "standard" | "custom"
  standardSize?: string
  fitType?: string
  garmentType: "pants" | "jacket" | "shirt" | "suit" | "blazer"
  customMeasurements: {
    neck: number
    chest: number
    stomach: number
    hip: number
    length: number
    shoulder: number
    sleeve: number
  }
  customMeasurementMethod?: "sketches" | "videos" | "manual"
  onUpdate: (updates: any) => void
}

interface MeasurementData {
  neck: string
  chest: string
  stomach: string
  hip: string
  length: string
  shoulder: string
  sleeve: string
  waist: string
  inseam: string
  thigh: string
  knee: string
  outseam: string
  biceps: string
  back_length: string
  armhole: string
  front_width: string
  back_width: string
  forearm: string
  wrist: string
  hem: string
  front_length: string
  backmass: string
  sleeve_opening: string
  first_button: string
  [key: string]: string
}

// Three measurement methods for each garment type - Updated with real video URLs
const GARMENT_MEASUREMENTS = {
  shirt: {
    measurements: [
      { 
        key: "neck", 
        label: "Neck Circumference", 
        description: "Measure around the neck where collar sits.", 
        detailedGuide: "Place the measuring tape around your neck at the base, where your collar would normally sit. Make sure the tape is snug but not tight.",
        unit: "inches",
        videoUrl: "https://youtu.be/8eTJzzDZ-Ps",
        sketchImage: "/measurement-guides/shirt/neck-sketch.svg"
      },
      { 
        key: "chest", 
        label: "Chest Circumference", 
        description: "Measure around the fullest part of your chest.", 
        detailedGuide: "Wrap the measuring tape around your chest at the fullest point. Keep your arms relaxed at your sides and breathe normally.",
        unit: "inches",
        videoUrl: "https://youtu.be/fN7ChyTlAS8",
        sketchImage: "/measurement-guides/shirt/chest-sketch.svg"
      },
      { 
        key: "waist", 
        label: "Waist Circumference", 
        description: "Measure around your natural waistline.", 
        detailedGuide: "Find your natural waist and wrap the tape around this area while standing straight.",
        unit: "inches",
        videoUrl: "https://youtu.be/3xVdy8Azqhs",
        sketchImage: "/measurement-guides/shirt/waist-sketch.svg"
      },
      { 
        key: "shoulder", 
        label: "Shoulder Width", 
        description: "Measure from shoulder point to shoulder point.", 
        detailedGuide: "Have someone help you measure across your back from the edge of one shoulder to the edge of the other.",
        unit: "inches",
        videoUrl: "https://youtu.be/8bT5sg4-Q0o",
        sketchImage: "/measurement-guides/shirt/shoulder-sketch.svg"
      },
      { 
        key: "sleeve", 
        label: "Sleeve Length", 
        description: "Measure from shoulder to wrist.", 
        detailedGuide: "With your arm slightly bent, measure from the edge of your shoulder down to your wrist bone.",
        unit: "inches",
        videoUrl: "https://youtu.be/D9StvHaSgM8",
        sketchImage: "/measurement-guides/shirt/sleeve-sketch.svg"
      },
      { 
        key: "length", 
        label: "Shirt Length", 
        description: "Measure from neck to desired shirt length.", 
        detailedGuide: "Start at the base of your neck and measure straight down to where you want the shirt to end.",
        unit: "inches",
        videoUrl: "https://youtu.be/Yi1Zd1MigyM",
        sketchImage: "/measurement-guides/shirt/length-sketch.svg"
      }
    ]
  },
  jacket: {
    measurements: [
      { 
        key: "chest", 
        label: "Chest Width (Pit to Pit)", 
        description: "Button or zip the jacket fully and lay it flat. Measure from the lowest point of one underarm seam straight across to the other, then double this measurement to get the full chest circumference.", 
        detailedGuide: "Button or zip the jacket fully and lay it flat. Measure from the lowest point of one underarm seam straight across to the other, then double this measurement to get the full chest circumference.",
        unit: "inches",
        videoUrl: "https://youtu.be/fN7ChyTlAS8",
        sketchImage: "/images/jacket/chest.png"
      },
      { 
        key: "waist", 
        label: "Waist / Midsection Width", 
        description: "With the jacket flat, buttoned and secured, measure across the narrowest part of the jacket (mid-torso area). Double the result for the full waist circumference.", 
        detailedGuide: "With the jacket flat, buttoned and secured, measure across the narrowest part of the jacket (mid-torso area). Double the result for the full waist circumference.",
        unit: "inches",
        videoUrl: "https://youtu.be/3xVdy8Azqhs",
        sketchImage: "/images/jacket/waist.png"
      },
      { 
        key: "hem", 
        label: "Hem", 
        description: "With the jacket laid flat, buttoned, and smoothed out, measure approximately 5 inches (12.5 cm) down from the front pockets, straight across from one side seam to the other, keeping the tape parallel to the hem. Double this measurement to obtain the full hem circumference.", 
        detailedGuide: "With the jacket laid flat, buttoned, and smoothed out, measure approximately 5 inches (12.5 cm) down from the front pockets, straight across from one side seam to the other, keeping the tape parallel to the hem. Double this measurement to obtain the full hem circumference.",
        unit: "inches",
        videoUrl: "https://youtu.be/DVy9E71T3cI",
        sketchImage: "/images/jacket/hem.png"
      },
      { 
        key: "shoulder", 
        label: "Shoulder Width / Yoke", 
        description: "Lay the jacket face down, smooth it out, then measure from one shoulder seam to the other straight across the back.", 
        detailedGuide: "Lay the jacket face down, smooth it out, then measure from one shoulder seam to the other straight across the back.",
        unit: "inches",
        videoUrl: "https://youtu.be/QY9CK9wqHMw",
        sketchImage: "/images/jacket/shoulder-width.png"
      },
      { 
        key: "sleeve", 
        label: "Sleeve Length", 
        description: "Lay the jacket with sleeves extended flat. Measure from the shoulder seam (where the sleeve meets the body) down the outer edge to the end of the cuff.", 
        detailedGuide: "Lay the jacket with sleeves extended flat. Measure from the shoulder seam (where the sleeve meets the body) down the outer edge to the end of the cuff.",
        unit: "inches",
        videoUrl: "https://youtu.be/aFgKOHLwRuE",
        sketchImage: "/images/jacket/sleeve-length.png"
      },
      { 
        key: "front_length", 
        label: "Front Length", 
        description: "With the jacket laid flat, buttoned, and smoothed out, measure from the highest point of the shoulder seam at the collar straight down the front over the buttons to the bottom edge of the hem.", 
        detailedGuide: "With the jacket laid flat, buttoned, and smoothed out, measure from the highest point of the shoulder seam at the collar straight down the front over the buttons to the bottom edge of the hem.",
        unit: "inches",
        videoUrl: "https://youtu.be/T0JZoBpEz7A",
        sketchImage: "/images/jacket/front-length.png"
      },
      {
        key: "back_length",
        label: "Center Back Length",
        description: "Turn the jacket face down. From the intersection of the collar and center back seam, measure straight down along the center back to the hem.",
        detailedGuide: "Turn the jacket face down. From the intersection of the collar and center back seam, measure straight down along the center back to the hem.",
        unit: "inches",
        videoUrl: "https://youtu.be/dJgJkL_EXqM",
        sketchImage: "/images/jacket/back-length.png"
      },
      {
        key: "backmass",
        label: "Back Mass",
        description: "With the jacket laid flat and face down, measure straight across the back just below the armholes, where the side seams meet the sleeves, from the left point to the right point.",
        detailedGuide: "With the jacket laid flat and face down, measure straight across the back just below the armholes, where the side seams meet the sleeves, from the left point to the right point.",
        unit: "inches",
        videoUrl: "https://youtu.be/d8NKrPTpUzI",
        sketchImage: "/images/jacket/backmass.png"
      },
      {
        key: "biceps",
        label: "Sleeve Bicep Width",
        description: "Measure about 1 inch below the underarm, straight across the sleeve.",
        detailedGuide: "Measure about 1 inch below the underarm, straight across the sleeve.",
        unit: "inches",
        videoUrl: "https://youtu.be/h5GvZbTVSH8",
        sketchImage: "/images/jacket/biceps.png"
      },
      {
        key: "sleeve_opening",
        label: "Sleeve Opening / Cuff Width",
        description: "Measure across the fully buttoned cuff.",
        detailedGuide: "Measure across the fully buttoned cuff.",
        unit: "inches",
        videoUrl: "https://youtu.be/fmmIXzBVVVU",
        sketchImage: "/images/jacket/sleeve-opening.png"
      },
      {
        key: "armhole",
        label: "Armhole Circumference",
        description: "With the jacket laid flat and buttoned, measure from the top shoulder point along the seam where the sleeve is attached, following the curve all the way around back to the starting point. Tip: For greater accuracy, measure with a string along the seam first, then measure the string's length with a measuring tape.",
        detailedGuide: "With the jacket laid flat and buttoned, measure from the top shoulder point along the seam where the sleeve is attached, following the curve all the way around back to the starting point. Tip: For greater accuracy, measure with a string along the seam first, then measure the string's length with a measuring tape.",
        unit: "inches",
        videoUrl: "https://youtu.be/TBFxP6pX-GE",
        sketchImage: "/images/jacket/armhole.png"
      },
      {
        key: "first_button",
        label: "Shoulder-to-first-button distance",
        description: "With the jacket laid flat and buttoned, measure from the shoulder point where the seam meets the collar straight down the front to the center of the first button.",
        detailedGuide: "With the jacket laid flat and buttoned, measure from the shoulder point where the seam meets the collar straight down the front to the center of the first button.",
        unit: "inches",
        videoUrl: "https://youtu.be/8eTJzzDZ-Ps",
        sketchImage: "/images/jacket/image.png"
      }
    ]
  },
  pants: {
    measurements: [
      { 
        key: "waist", 
        label: "Waist Circumference", 
        description: "Measure around your natural waistline.", 
        detailedGuide: "Find your natural waist (usually the narrowest part) and measure around it, keeping the tape snug but not tight.",
        unit: "inches",
        videoUrl: "https://youtu.be/3xVdy8Azqhs",
        sketchImage: "/measurement-guides/pants/waist-sketch.svg"
      },
      { 
        key: "hip", 
        label: "Hip Circumference", 
        description: "Measure around the fullest part of your hips.", 
        detailedGuide: "Stand with feet together and measure around the fullest part of your hips and buttocks.",
        unit: "inches",
        videoUrl: "https://youtu.be/DVy9E71T3cI",
        sketchImage: "/measurement-guides/pants/hip-sketch.svg"
      },
      { 
        key: "inseam", 
        label: "Inseam Length", 
        description: "Measure from crotch to ankle.", 
        detailedGuide: "Measure from your crotch down the inside of your leg to your ankle bone.",
        unit: "inches",
        videoUrl: "https://youtu.be/qJ8-OeFpGUg",
        sketchImage: "/measurement-guides/pants/inseam-sketch.svg"
      },
      { 
        key: "thigh", 
        label: "Thigh Circumference", 
        description: "Measure around the fullest part of your thigh.", 
        detailedGuide: "Measure around the fullest part of your upper thigh, usually about 2 inches below the crotch.",
        unit: "inches",
        videoUrl: "https://youtu.be/yHkL-9z_6Lg",
        sketchImage: "/measurement-guides/pants/thigh-sketch.svg"
      },
      { 
        key: "knee", 
        label: "Knee Circumference", 
        description: "Measure around your knee.", 
        detailedGuide: "Measure around your knee at the kneecap level.",
        unit: "inches",
        videoUrl: "https://youtu.be/tN8v4L2QP_I",
        sketchImage: "/measurement-guides/pants/knee-sketch.svg"
      },
      { 
        key: "outseam", 
        label: "Outseam Length", 
        description: "Measure from waist to ankle on the outside.", 
        detailedGuide: "Measure from your waist down the outside of your leg to your ankle.",
        unit: "inches",
        videoUrl: "https://youtu.be/x4E7fG3-PvY",
        sketchImage: "/measurement-guides/pants/outseam-sketch.svg"
      }
    ]
  },
  suit: {
    measurements: [
      { 
        key: "chest", 
        label: "Chest Circumference", 
        description: "Measure around the fullest part of your chest.", 
        detailedGuide: "Wrap the measuring tape around your chest at nipple level, keeping the tape parallel to the floor.",
        unit: "inches",
        videoUrl: "https://youtu.be/fN7ChyTlAS8",
        sketchImage: "/measurement-guides/jacket/chest-sketch.svg"
      },
      { 
        key: "waist", 
        label: "Waist Circumference", 
        description: "Measure around your natural waistline.", 
        detailedGuide: "Find your natural waist (usually the narrowest part) and measure around it, keeping the tape snug but not tight.",
        unit: "inches",
        videoUrl: "https://youtu.be/3xVdy8Azqhs",
        sketchImage: "/measurement-guides/jacket/waist-sketch.svg"
      },
      { 
        key: "inseam", 
        label: "Inseam Length (Pants)", 
        description: "Measure from crotch to ankle for suit pants.", 
        detailedGuide: "Measure from your crotch down the inside of your leg to your ankle bone.",
        unit: "inches",
        videoUrl: "https://youtu.be/qJ8-OeFpGUg",
        sketchImage: "/measurement-guides/pants/inseam-sketch.svg"
      },
      {
        key: "shoulder",
        label: "Shoulder Width",
        description: "Measure from shoulder point to shoulder point.",
        detailedGuide: "Have someone help you measure across your back from the edge of one shoulder to the edge of the other.",
        unit: "inches",
        videoUrl: "https://youtu.be/8bT5sg4-Q0o",
        sketchImage: "/measurement-guides/jacket/shoulder-sketch.svg"
      },
      {
        key: "sleeve",
        label: "Sleeve Length",
        description: "Measure from shoulder point to wrist.",
        detailedGuide: "With your arm slightly bent, measure from the edge of your shoulder down to your wrist bone.",
        unit: "inches",
        videoUrl: "https://youtu.be/D9StvHaSgM8",
        sketchImage: "/measurement-guides/jacket/sleeve-sketch.svg"
      }
    ]
  },
  blazer: {
    measurements: [
      { 
        key: "chest", 
        label: "Chest Circumference", 
        description: "Measure around the fullest part of your chest.", 
        detailedGuide: "Wrap the measuring tape around your chest at nipple level, keeping the tape parallel to the floor.",
        unit: "inches",
        videoUrl: "https://youtu.be/fN7ChyTlAS8",
        sketchImage: "/measurement-guides/jacket/chest-sketch.svg"
      },
      { 
        key: "length", 
        label: "Blazer Length", 
        description: "Measure from neck to desired blazer length.", 
        detailedGuide: "Start at the base of your neck and measure straight down your front to where you want the blazer to end.",
        unit: "inches",
        videoUrl: "https://youtu.be/Yi1Zd1MigyM",
        sketchImage: "/measurement-guides/jacket/front-length-sketch.svg"
      },
      {
        key: "shoulder",
        label: "Shoulder Width",
        description: "Measure from shoulder point to shoulder point.",
        detailedGuide: "Have someone help you measure across your back from the edge of one shoulder to the edge of the other.",
        unit: "inches",
        videoUrl: "https://youtu.be/8bT5sg4-Q0o",
        sketchImage: "/measurement-guides/jacket/shoulder-sketch.svg"
      }
    ]
  }
}

export function MeasurementStep({
  garmentType = "jacket",
  onUpdate,
}: MeasurementStepProps) {
  const [isMethodSelectionOpen, setIsMethodSelectionOpen] = useState(false)
  const [isStepByStepOpen, setIsStepByStepOpen] = useState(false)
  const [isManualModalOpen, setIsManualModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentMeasurement, setCurrentMeasurement] = useState("")
  const [currentMethod, setCurrentMethod] = useState<"videos" | "sketches" | "manual">("videos")
  const [savedMeasurements, setSavedMeasurements] = useState<Record<string, string>>({})
  const [manualMeasurements, setManualMeasurements] = useState<MeasurementData>({
    neck: "", chest: "", stomach: "", hip: "", length: "", shoulder: "", sleeve: "",
    waist: "", inseam: "", thigh: "", knee: "", outseam: "", biceps: "", back_length: ""
  })

  // Auto-open method selection on mount
  useEffect(() => {
    setIsMethodSelectionOpen(true)
  }, [])

  // Helper functions
  const getGarmentMeasurements = () => {
    const garmentConfig = (GARMENT_MEASUREMENTS as any)[garmentType] || GARMENT_MEASUREMENTS.jacket
    return garmentConfig.measurements || []
  }

  const getTotalMeasurementCount = (garmentType: string) => {
    const garmentConfig = (GARMENT_MEASUREMENTS as any)[garmentType] || GARMENT_MEASUREMENTS.jacket
    return garmentConfig.measurements?.length || 0
  }

  const getActiveMeasurements = () => getGarmentMeasurements()
  const getCurrentField = () => getActiveMeasurements()[currentStep]

  const handleMeasurementChange = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0
    
    // Save to local state for display in cart/configuration
    setSavedMeasurements(prev => ({
      ...prev,
      [field]: value
    }))
    
    onUpdate({
      customMeasurements: {
        neck: field === "neck" ? numValue : 0,
        chest: field === "chest" ? numValue : 0,
        stomach: field === "stomach" || field === "waist" ? numValue : 0,
        hip: field === "hip" ? numValue : 0,
        length: field === "length" ? numValue : 0,
        shoulder: field === "shoulder" ? numValue : 0,
        sleeve: field === "sleeve" ? numValue : 0,
      },
      measurementData: savedMeasurements, // Pass all measurements for cart display
      measurementMethod: currentMethod
    })

    setManualMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStepMeasurementSubmit = () => {
    const field = getCurrentField()
    if (field && currentMeasurement) {
      handleMeasurementChange(field.key, currentMeasurement)
    }
    
    if (currentStep < getActiveMeasurements().length - 1) {
      setCurrentStep(prev => prev + 1)
      const nextField = getActiveMeasurements()[currentStep + 1]
      setCurrentMeasurement(manualMeasurements[nextField.key as keyof MeasurementData] || "")
    } else {
      setIsStepByStepOpen(false)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      const prevField = getActiveMeasurements()[currentStep - 1]
      setCurrentMeasurement(manualMeasurements[prevField.key as keyof MeasurementData] || "")
    }
  }

  const startStepByStepMeasurement = (method: "videos" | "sketches") => {
    setCurrentMethod(method)
    onUpdate({ customMeasurementMethod: method })
    setIsMethodSelectionOpen(false)
    setIsStepByStepOpen(true)
    setCurrentStep(0)
    const firstField = getActiveMeasurements()[0]
    setCurrentMeasurement(manualMeasurements[firstField.key as keyof MeasurementData] || "")
  }

  return (
    <>
      {/* Sidebar Content */}
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-green-600" />
            <h3 className="font-medium text-green-800">Three Measurement Methods</h3>
          </div>
          <p className="text-sm text-green-700">
            Choose from video tutorials, sketch guides, or manual input for your {garmentType} measurements.
          </p>
        </div>

        <Button 
          onClick={() => setIsMethodSelectionOpen(true)}
          className="w-full"
          variant="outline"
        >
          <Ruler className="w-4 h-4 mr-2" />
          Choose Measurement Method
        </Button>

        {/* Saved Measurements Summary */}
        {Object.keys(savedMeasurements).length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-blue-800">Your Measurements</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(savedMeasurements).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-blue-700 capitalize">{key.replace('_', ' ')}:</span>
                  <span className="text-blue-900 font-medium">{value}"</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <Badge variant="secondary" className="text-blue-700">
                Method: {currentMethod === "videos" ? "Video Tutorial" : currentMethod === "sketches" ? "Sketch Guide" : "Manual Input"}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Method Selection Modal */}
      <Dialog open={isMethodSelectionOpen} onOpenChange={setIsMethodSelectionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Choose Your Measurement Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <Ruler className="h-4 w-4" />
              <AlertDescription>
                Choose your measurement method for your {garmentType}. Each method provides a complete set of measurements.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-4">
              {/* Video Tutorial Method */}
              <Card 
                className="cursor-pointer border-2 hover:border-blue-300 transition-colors"
                onClick={() => startStepByStepMeasurement("videos")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Video className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <h3 className="font-medium">Video Tutorial Method</h3>
                      <p className="text-sm text-gray-600">
                        Step-by-step video guides for {getTotalMeasurementCount(garmentType)} {garmentType} measurements
                      </p>
                    </div>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Sketch Guide Method */}
              <Card 
                className="cursor-pointer border-2 hover:border-green-300 transition-colors"
                onClick={() => startStepByStepMeasurement("sketches")}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Edit3 className="w-8 h-8 text-green-600" />
                    <div className="flex-1">
                      <h3 className="font-medium">Sketch Guide Method</h3>
                      <p className="text-sm text-gray-600">
                        Visual diagram guides for {getTotalMeasurementCount(garmentType)} {garmentType} measurements
                      </p>
                    </div>
                    <Badge variant="outline">Visual Guide</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Input Method */}
              <Card 
                className="cursor-pointer border-2 hover:border-orange-300 transition-colors"
                onClick={() => {
                  setCurrentMethod("manual")
                  onUpdate({ customMeasurementMethod: "manual" })
                  setIsMethodSelectionOpen(false)
                  setIsManualModalOpen(true)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Ruler className="w-8 h-8 text-orange-600" />
                    <div className="flex-1">
                      <h3 className="font-medium">Manual Input Method</h3>
                      <p className="text-sm text-gray-600">
                        Enter all {getTotalMeasurementCount(garmentType)} {garmentType} measurements directly
                      </p>
                    </div>
                    <Badge variant="outline">Quick Entry</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step-by-Step Measurement Modal */}
      <Dialog open={isStepByStepOpen} onOpenChange={setIsStepByStepOpen}>
        <DialogContent className={`max-h-[90vh] overflow-y-auto ${currentMethod === "videos" ? "max-w-6xl" : "max-w-4xl"}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {currentMethod === "videos" ? (
                <Video className="w-5 h-5 text-blue-600" />
              ) : (
                <Edit3 className="w-5 h-5 text-green-600" />
              )}
              {currentMethod === "videos" ? "Video Tutorial" : "Sketch Guide"} - Step {currentStep + 1} of {getActiveMeasurements().length}: {getCurrentField()?.label}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{currentStep + 1} / {getActiveMeasurements().length}</span>
              </div>
              <Progress value={((currentStep + 1) / getActiveMeasurements().length) * 100} />
            </div>

            {getCurrentField() && (
              <>
                {/* VIDEO METHOD - Different Layout */}
                {currentMethod === "videos" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Player Section - Takes more space */}
                    <div className="lg:col-span-2 space-y-4">
                      <h3 className="text-xl font-semibold text-blue-900">{getCurrentField().label}</h3>
                      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        {getCurrentField().videoUrl ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={getCurrentField().videoUrl.replace('youtu.be/', 'youtube.com/embed/')}
                            title={`How to measure ${getCurrentField().label}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Video Instructions</h4>
                        <p className="text-sm text-blue-800">{getCurrentField().detailedGuide}</p>
                      </div>
                    </div>

                    {/* Input Section - Compact */}
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <Label htmlFor="measurement" className="text-sm font-medium text-gray-700 mb-3 block">
                          Enter {getCurrentField().label}
                        </Label>
                        <div className="space-y-3">
                          <Input
                            id="measurement"
                            type="number"
                            step="0.25"
                            min="0"
                            placeholder={`Enter in ${getCurrentField().unit}`}
                            value={currentMeasurement}
                            onChange={(e) => setCurrentMeasurement(e.target.value)}
                            className="text-lg text-center"
                          />
                          <div className="text-xs text-gray-500 text-center">
                            Unit: {getCurrentField().unit}
                          </div>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="space-y-2">
                        <Button
                          onClick={handleStepMeasurementSubmit}
                          className="w-full"
                          disabled={!currentMeasurement}
                        >
                          {currentStep === getActiveMeasurements().length - 1 ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Complete Measurements
                            </>
                          ) : (
                            <>
                              Next Measurement
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={handlePreviousStep}
                          disabled={currentStep === 0}
                          variant="outline"
                          className="w-full"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                      </div>

                      {/* Saved Measurements Summary */}
                      {Object.keys(savedMeasurements).length > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-green-800 mb-2">Saved Measurements</h4>
                          <div className="space-y-1">
                            {Object.entries(savedMeasurements).map(([key, value]) => (
                              <div key={key} className="text-xs text-green-700 flex justify-between">
                                <span className="capitalize">{key}:</span>
                                <span>{value} {getCurrentField().unit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SKETCH METHOD - Different Layout */}
                {currentMethod === "sketches" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sketch Diagram Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-green-800">{getCurrentField().label}</h3>
                      <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        {getCurrentField().sketchImage ? (
                          <img
                            src={getCurrentField().sketchImage}
                            alt={`Measurement guide for ${getCurrentField().label}`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="text-center">
                            <Edit3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500">Measurement Diagram</p>
                          </div>
                        )}
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Step-by-Step Guide</h4>
                        <p className="text-sm text-green-700">{getCurrentField().detailedGuide}</p>
                      </div>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="measurement" className="text-sm font-medium">
                          Enter {getCurrentField().label} ({getCurrentField().unit})
                        </Label>
                        <Input
                          id="measurement"
                          type="number"
                          step="0.25"
                          min="0"
                          placeholder={`Enter ${getCurrentField().label.toLowerCase()}`}
                          value={currentMeasurement}
                          onChange={(e) => setCurrentMeasurement(e.target.value)}
                          className="text-lg mt-2"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handlePreviousStep}
                          disabled={currentStep === 0}
                          variant="outline"
                          className="flex-1"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Previous
                        </Button>
                        <Button
                          onClick={handleStepMeasurementSubmit}
                          className="flex-1"
                          disabled={!currentMeasurement}
                        >
                          {currentStep === getActiveMeasurements().length - 1 ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Complete
                            </>
                          ) : (
                            <>
                              Next
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Measurement Tips */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-amber-800 mb-1">Measurement Tips</h4>
                        <ul className="text-xs text-amber-700 space-y-1">
                          <li>• Use a flexible measuring tape</li>
                          <li>• Stand straight and relaxed</li>
                          <li>• Don't pull the tape too tight</li>
                          <li>• Ask someone to help for accuracy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Manual Input Modal */}
      <Dialog open={isManualModalOpen} onOpenChange={setIsManualModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enter All {garmentType.charAt(0).toUpperCase() + garmentType.slice(1)} Measurements</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* All Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                {garmentType.charAt(0).toUpperCase() + garmentType.slice(1)} Measurements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getGarmentMeasurements().map((field: any) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key} className="text-sm font-medium">
                      {field.label} ({field.unit})
                    </Label>
                    <Input
                      id={field.key}
                      type="number"
                      step="0.25"
                      min="0"
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={manualMeasurements[field.key as keyof MeasurementData] || ""}
                      onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setIsManualModalOpen(false)}>
                Save Measurements
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
