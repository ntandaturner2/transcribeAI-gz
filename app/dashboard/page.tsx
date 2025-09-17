"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { UploadArea } from "@/components/upload-area"
import { TranscriptionResultComponent } from "@/components/transcription-result"
import { TranscriptionHistory } from "@/components/transcription-history"
import { Search, FileText, Clock, Target, TrendingUp } from "lucide-react"

interface TranscriptionResult {
  text: string
  confidence: number
  duration: number
  filename: string
}

export default function DashboardPage() {
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleTranscriptionComplete = (result: TranscriptionResult) => {
    setTranscriptionResult(result)
  }

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    transcriptionsUsed: 47,
    transcriptionsLimit: 100,
    minutesUsed: 1250,
    minutesLimit: 5000,
  }

  const usagePercentage = (userData.transcriptionsUsed / userData.transcriptionsLimit) * 100

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-balance">Welcome back, {userData.name}</h1>
              <p className="text-muted-foreground mt-1 text-pretty">Manage your transcriptions and track your usage</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {userData.plan} Plan
            </Badge>
          </div>
        </div>

        {/* Usage Overview */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Transcriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{userData.transcriptionsUsed}</span>
                  <span className="text-sm text-muted-foreground">/ {userData.transcriptionsLimit}</span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {userData.transcriptionsLimit - userData.transcriptionsUsed} remaining this month
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Minutes Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{userData.minutesUsed.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">/ {userData.minutesLimit.toLocaleString()}</span>
                </div>
                <Progress value={(userData.minutesUsed / userData.minutesLimit) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {(userData.minutesLimit - userData.minutesUsed).toLocaleString()} minutes remaining
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Avg. Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">94.2%</span>
                </div>
                <p className="text-xs text-muted-foreground">Across all transcriptions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">+23%</span>
                </div>
                <p className="text-xs text-muted-foreground">vs. last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">New Transcription</h2>
          <UploadArea onTranscriptionComplete={handleTranscriptionComplete} />
        </div>

        {/* Current Result */}
        {transcriptionResult && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Latest Result</h2>
            <TranscriptionResultComponent result={transcriptionResult} />
          </div>
        )}

        {/* Search and History */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Transcription History</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transcriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent"
              />
            </div>
          </div>

          <TranscriptionHistory searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  )
}
