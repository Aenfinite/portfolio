"use client"

import { useEffect, useState, useRef } from "react"
import { MapPin } from "lucide-react"

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
  initialLat?: number
  initialLng?: number
}

export function MapPicker({ onLocationSelect, initialLat = 20, initialLng = 0 }: MapPickerProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<[number, number] | null>(
    initialLat && initialLng ? [initialLat, initialLng] : null,
  )
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    let cleanup: (() => void) | null = null;

    // Dynamically import Leaflet only on client side
    import("leaflet").then((L) => {
      // Fix for default marker icons in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      const mapContainer = document.getElementById("map")
      if (!mapContainer) return

      // Clean up existing map if it exists
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      // Clear container content
      mapContainer.innerHTML = ""

      // Initialize map
      const map = L.map("map").setView([initialLat, initialLng], 3)
      mapRef.current = map

      // Add tile layer with dark theme
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Add click handler
      map.on("click", async (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng

        // Remove existing marker
        if (markerRef.current) {
          map.removeLayer(markerRef.current)
        }

        // Add new marker
        markerRef.current = L.marker([lat, lng]).addTo(map)

        // Reverse geocode to get address
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          const data = await response.json()
          const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`

          markerRef.current.bindPopup(`<b>Selected Location</b><br/>${address}`).openPopup()

          setSelectedPosition([lat, lng])
          onLocationSelect(lat, lng, address)
        } catch (error) {
          console.error("Geocoding error:", error)
          const address = `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          markerRef.current.bindPopup(`<b>Selected Location</b><br/>${address}`).openPopup()
          onLocationSelect(lat, lng, address)
        }
      })

      // Add initial marker if position exists
      if (selectedPosition) {
        markerRef.current = L.marker(selectedPosition).addTo(map)
        map.setView(selectedPosition, 8)
      }

      cleanup = () => {
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }
        markerRef.current = null
      }
    })

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [mounted, initialLat, initialLng])

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      markerRef.current = null
    }
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2 animate-pulse" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div id="map" className="w-full h-[400px] rounded-xl border-2 border-border" />
    </>
  )
}
