"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Download, Clock, Target, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TranscriptionResultProps {
  result: {
    text: string
    confidence: number
    duration: number
    filename: string
  }
}

export function TranscriptionResultComponent({ result }: TranscriptionResultProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.text)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "Transcription text has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = (format: string) => {
    const blob = new Blob([result.text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${result.filename.replace(/\.[^/.]+$/, "")}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download started",
      description: `Transcription saved as ${format.toUpperCase()} file.`,
    })
  }

  return (
    <Card className="glass-effect animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Transcription Result</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Target className="h-3 w-3" />
              {Math.round(result.confidence * 100)}% confidence
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {result.duration}s
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ScrollArea className="h-48 w-full rounded-md border bg-muted/30 p-4">
          <p className="text-sm leading-relaxed text-pretty">{result.text}</p>
        </ScrollArea>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">From: {result.filename}</p>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass-effect">
                <DropdownMenuItem onClick={() => handleDownload("txt")}>Download as TXT</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("srt")}>Download as SRT</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload("vtt")}>Download as VTT</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
