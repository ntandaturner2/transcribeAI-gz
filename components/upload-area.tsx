"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileAudio, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadAreaProps {
  onTranscriptionComplete: (result: TranscriptionResult) => void
}

interface TranscriptionResult {
  text: string
  confidence: number
  duration: number
  filename: string
}

export function UploadArea({ onTranscriptionComplete }: UploadAreaProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setError(null)
      setUploadedFile(file)
      setIsProcessing(true)
      setUploadProgress(0)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      try {
        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Mock transcription result
        const mockResult: TranscriptionResult = {
          text: "Welcome to our premium audio transcription service. This is a sample transcription that demonstrates how your audio content will be converted to accurate text using our advanced AI technology. The system can handle various audio formats and provides high-quality results with confidence scores.",
          confidence: 0.95,
          duration: 45,
          filename: file.name,
        }

        setUploadProgress(100)
        setTimeout(() => {
          setIsProcessing(false)
          onTranscriptionComplete(mockResult)
        }, 500)
      } catch (err) {
        setError("Failed to process audio file. Please try again.")
        setIsProcessing(false)
        setUploadProgress(0)
      }
    },
    [onTranscriptionComplete],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a", ".ogg", ".flac"],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
    disabled: isProcessing,
  })

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card
        className={cn(
          "card-modern transition-all duration-300 hover:shadow-xl",
          isDragActive && "ring-2 ring-primary ring-offset-2",
          isProcessing && "opacity-75",
        )}
      >
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={cn(
              "upload-area-modern",
              isDragActive && "border-primary bg-primary/5",
              isProcessing && "cursor-not-allowed",
            )}
          >
            <input {...getInputProps()} />

            {!isProcessing ? (
              <>
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 text-balance text-foreground">
                  {isDragActive ? "Drop your audio file here" : "Upload your audio file"}
                </h3>

                <p className="text-muted-foreground mb-4 text-pretty">
                  Drag and drop your audio file here, or click to browse
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Badge variant="secondary">MP3</Badge>
                  <Badge variant="secondary">WAV</Badge>
                  <Badge variant="secondary">M4A</Badge>
                  <Badge variant="secondary">OGG</Badge>
                  <Badge variant="secondary">FLAC</Badge>
                </div>

                <p className="text-xs text-muted-foreground">Maximum file size: 100MB</p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <FileAudio className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{uploadedFile?.name}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Processing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Estimated time: {uploadProgress < 50 ? "2-3" : uploadProgress < 90 ? "1-2" : "< 1"} minutes
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
