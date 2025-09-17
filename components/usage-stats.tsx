"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, Clock, Target, TrendingUp } from "lucide-react"

interface UsageStatsProps {
  transcriptionsUsed: number
  transcriptionsLimit: number
  minutesUsed: number
  minutesLimit: number
  averageAccuracy: number
  monthlyGrowth: number
}

export function UsageStats({
  transcriptionsUsed,
  transcriptionsLimit,
  minutesUsed,
  minutesLimit,
  averageAccuracy,
  monthlyGrowth,
}: UsageStatsProps) {
  const transcriptionPercentage = (transcriptionsUsed / transcriptionsLimit) * 100
  const minutesPercentage = (minutesUsed / minutesLimit) * 100

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <Card className="glass-effect">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Transcriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{transcriptionsUsed}</span>
              <span className="text-sm text-muted-foreground">/ {transcriptionsLimit}</span>
            </div>
            <Progress value={transcriptionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {transcriptionsLimit - transcriptionsUsed} remaining this month
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Minutes Used
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{minutesUsed.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">/ {minutesLimit.toLocaleString()}</span>
            </div>
            <Progress value={minutesPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {(minutesLimit - minutesUsed).toLocaleString()} minutes remaining
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Avg. Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{averageAccuracy}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Across all transcriptions</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-effect">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">+{monthlyGrowth}%</span>
            </div>
            <p className="text-xs text-muted-foreground">vs. last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
