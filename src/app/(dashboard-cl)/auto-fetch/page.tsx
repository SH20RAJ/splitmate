import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, HelpCircle } from "lucide-react"
import Image from 'next/image'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Split Online Bills - SplitMate',
  description: 'Fetch online bills from your order history and split them item-wise fast & fair.',
}

const supportedApps = [
  {
    id: 'swiggy',
    name: 'Swiggy',
    icon: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/swiggy-logo-app-icon.png",
    color: 'bg-orange-500',
  },
  {
    id: 'zomato',
    name: 'Zomato',
    icon: 'https://cdn.brandfetch.io/idEql8nEWn/w/2048/h/2048/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1724311594781',
    color: 'bg-red-500',
  },
  {
    id: 'instamart',
    name: 'Instamart',
    icon: 'https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/swiggy-instamart-logo-app-icon.png',
    color: 'bg-purple-500',
  },
]

export default function AutoFetchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      <div className="container mx-auto px-4 py-16 max-w-md">
        {/* Header */}
        <div className="text-center text-white mb-12">
          <h1 className="text-3xl font-bold mb-4">Split Online Bills</h1>
          <p className="text-purple-100 text-lg leading-relaxed">
            Fetch online bills from your order history and split them item-wise fast & fair
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-12">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 border-white/30 border"
          >
            How it works <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 border-white/30 border"
          >
            FAQs <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Link Accounts Card */}
        <Card className="bg-white/95 backdrop-blur border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Link your accounts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            {supportedApps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${app.color} rounded-full flex items-center justify-center text-white text-xl`}>
                    <Image src={app.icon} alt={app.name} width={24} height={24} className="object-contain" />
                  </div>
                  <span className="font-medium text-gray-800">{app.name}</span>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6">
                  Link account <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* How it Works Section */}
        <div className="mt-12 bg-white/95 backdrop-blur rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">How it Works</h2>
            <Button variant="ghost" size="sm" className="text-blue-500">
              Close
            </Button>
          </div>
          
          <div className="space-y-6">
            {[
              "Link the online account whose bill you wish to split.",
              "Click on the order that you wish to split.",
              "Add people/group you wish to split with.",
              "The item-wise bill is displayed with name tabs with each item.",
              "Tap on the names of people who consumed each item.",
              "You are done. The bill is split fairly."
            ].map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
