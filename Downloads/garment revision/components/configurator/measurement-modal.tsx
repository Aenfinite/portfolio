"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ruler, User, Calculator } from "lucide-react"

interface MeasurementOption {
  id: string
  name: string
  price: number
  measurements: string
}

interface MeasurementModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  sizes: MeasurementOption[]
  selectedSize: string
  onSizeSelect: (sizeId: string) => void
  onConfirm: () => void
}

export function MeasurementModal({
  isOpen,
  onClose,
  title,
  sizes,
  selectedSize,
  onSizeSelect,
  onConfirm
}: MeasurementModalProps) {
  const [activeTab, setActiveTab] = useState<"standard" | "custom">("standard")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Choose your size or provide custom measurements for the perfect fit.
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("standard")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "standard"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-4 h-4" />
              Standard Sizes
            </div>
          </button>
          <button
            onClick={() => setActiveTab("custom")}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "custom"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Custom Measurements
            </div>
          </button>
        </div>

        {/* Standard Sizes Tab */}
        {activeTab === "standard" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sizes.map((size) => (
                <div
                  key={size.id}
                  onClick={() => onSizeSelect(size.id)}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md
                    ${
                      selectedSize === size.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-semibold text-lg">{size.name}</div>
                    {size.price > 0 && (
                      <Badge variant="secondary" className="text-green-600">
                        +${size.price}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">{size.measurements}</div>
                  {size.id === "custom" && (
                    <div className="mt-2 text-xs text-blue-600 font-medium">
                      Professional measurements required
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Size Guide */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Size Guide</h4>
              <p className="text-sm text-blue-700">
                Not sure about your size? Our size guide helps you find the perfect fit. 
                For the most accurate fit, we recommend professional measurements.
              </p>
              <Button variant="link" className="text-blue-600 p-0 h-auto mt-1">
                View detailed size guide →
              </Button>
            </div>
          </div>
        )}

        {/* Custom Measurements Tab */}
        {activeTab === "custom" && (
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <div className="flex items-start gap-3">
                <Calculator className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Custom Measurements</h4>
                  <p className="text-sm text-amber-700">
                    For custom measurements, please provide accurate measurements or visit our store 
                    for professional fitting. Additional charges may apply.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chest (inches)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Length (inches)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 29"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shoulder (inches)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 18"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleeve (inches)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 25"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Need Help with Measurements?</h4>
              <p className="text-sm text-blue-700 mb-3">
                Watch our measurement guide video or schedule a virtual fitting session.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Watch Video Guide
                </Button>
                <Button variant="outline" size="sm">
                  Schedule Fitting
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={!selectedSize && activeTab === "standard"}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm Selection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
