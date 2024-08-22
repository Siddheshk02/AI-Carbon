import { useState } from 'react'
import { CarIcon, PlaneIcon, TrainIcon, ZapIcon } from 'lucide-react'
import React from 'react'

export default function CarbonFootprintCalculator() {
  const [carbonFootprint, setCarbonFootprint] = useState(0)
  const [aiSuggestion, setAiSuggestion] = useState('')

  const calculateCarbonFootprint = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const traditionalEnergy = parseFloat(formData.get('traditionalEnergy') as string) || 0
    const cleanEnergy = parseFloat(formData.get('cleanEnergy') as string) || 0
    const carTravel = parseFloat(formData.get('carTravel') as string) || 0
    const flight = parseFloat(formData.get('flight') as string) || 0
    const publicTransport = parseFloat(formData.get('publicTransport') as string) || 0

    const result = (traditionalEnergy * 0.6) + (cleanEnergy * 0.05) + (carTravel * 0.25) + (flight * 0.15) + (publicTransport * 0.07)
    setCarbonFootprint(result)

    const suggestions = [
      "Consider increasing your use of clean energy sources to reduce reliance on traditional energy.",
      "Try carpooling or using electric vehicles to decrease your car travel emissions.",
      "For shorter distances, consider alternatives to flying such as train travel when possible.",
      "Increase your use of public transportation to significantly reduce your carbon footprint.",
      "Invest in energy-efficient appliances and smart home systems to optimize your energy consumption."
    ]
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="w-full max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-400 mb-2">Carbon Footprint Calculator</h2>
          <p className="text-gray-400 mb-6">Calculate your carbon footprint and get suggestions to reduce it.</p>
          <form onSubmit={calculateCarbonFootprint} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="traditionalEnergy" className="block text-gray-300">Monthly Traditional Energy Usage (kWh)</label>
              <div className="flex items-center space-x-2">
                <ZapIcon className="text-yellow-500" />
                <input id="traditionalEnergy" name="traditionalEnergy" type="number" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="cleanEnergy" className="block text-gray-300">Monthly Clean Energy Usage (kWh)</label>
              <div className="flex items-center space-x-2">
                <ZapIcon className="text-green-500" />
                <input id="cleanEnergy" name="cleanEnergy" type="number" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="carTravel" className="block text-gray-300">Monthly Car Travel (km)</label>
              <div className="flex items-center space-x-2">
                <CarIcon className="text-blue-500" />
                <input id="carTravel" name="carTravel" type="number" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="flight" className="block text-gray-300">Annual Flight Distance (km)</label>
              <div className="flex items-center space-x-2">
                <PlaneIcon className="text-purple-500" />
                <input id="flight" name="flight" type="number" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="publicTransport" className="block text-gray-300">Monthly Public Transportation (km)</label>
              <div className="flex items-center space-x-2">
                <TrainIcon className="text-orange-500" />
                <input id="publicTransport" name="publicTransport" type="number" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white" required />
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-bold">Calculate</button>
          </form>

          {carbonFootprint > 0 && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-400">Your Carbon Footprint</h3>
              <p className="text-3xl font-bold text-white">{carbonFootprint.toFixed(2)} kg CO2e/year</p>
            </div>
          )}

          {aiSuggestion && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-green-400">Suggestion</h3>
              <p className="text-white">{aiSuggestion}</p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-900 border-t border-gray-800 rounded-b-lg">
          <p className="text-sm text-gray-400">This calculator provides an estimate. For a more accurate assessment, please consult with environmental experts.</p>
        </div>
      </div>
    </div>
  )
}