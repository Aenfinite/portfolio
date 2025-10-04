import { NASAAPISetupGuide } from "@/components/nasa-api-setup"

export default function SetupPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">
          NASA API Setup Guide
        </h1>
        <p className="text-blue-300 text-lg max-w-2xl mx-auto">
          Configure your NASA API access to unlock real satellite data for educational farming scenarios.
        </p>
      </div>

      <NASAAPISetupGuide />
    </div>
  )
}