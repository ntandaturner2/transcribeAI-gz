"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Calendar,
  Clock,
  Target,
  FileAudio,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TranscriptionHistoryProps {
  searchQuery: string
}

interface TranscriptionRecord {
  id: string
  filename: string
  text: string
  confidence: number
  duration: number
  createdAt: string
  status: "completed" | "processing" | "failed"
}

export function TranscriptionHistory({ searchQuery }: TranscriptionHistoryProps) {
  const { toast } = useToast()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock transcription history data
  const mockTranscriptions: TranscriptionRecord[] = [
    {
      id: "1",
      filename: "meeting-recording-2024.mp3",
      text: "Welcome to our quarterly business review meeting. Today we'll be discussing our performance metrics, upcoming projects, and strategic initiatives for the next quarter...",
      confidence: 0.96,
      duration: 1800,
      createdAt: "2024-01-15T10:30:00Z",
      status: "completed",
    },
    {
      id: "2",
      filename: "interview-candidate-john.wav",
      text: "Thank you for taking the time to interview with us today. Let's start by having you tell us a bit about your background and experience in software development...",
      confidence: 0.94,
      duration: 2400,
      createdAt: "2024-01-14T14:15:00Z",
      status: "completed",
    },
    {
      id: "3",
      filename: "podcast-episode-12.m4a",
      text: "Welcome back to Tech Talk, the podcast where we dive deep into the latest trends in technology and innovation. I'm your host Sarah, and today we're discussing artificial intelligence...",
      confidence: 0.98,
      duration: 3600,
      createdAt: "2024-01-13T09:00:00Z",
      status: "completed",
    },
    {
      id: "4",
      filename: "lecture-machine-learning.mp3",
      text: "Today's lecture will cover the fundamentals of machine learning algorithms. We'll start with supervised learning techniques and then move on to unsupervised methods...",
      confidence: 0.92,
      duration: 5400,
      createdAt: "2024-01-12T16:45:00Z",
      status: "completed",
    },
    {
      id: "5",
      filename: "client-call-project-alpha.wav",
      text: "Good morning everyone. Let's review the progress on Project Alpha. The development team has completed the initial phase and we're ready to move into testing...",
      confidence: 0.95,
      duration: 1200,
      createdAt: "2024-01-11T11:20:00Z",
      status: "completed",
    },
  ]

  // Filter transcriptions based on search query
  const filteredTranscriptions = mockTranscriptions.filter(
    (transcription) =>
      transcription.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcription.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil(filteredTranscriptions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTranscriptions = filteredTranscriptions.slice(startIndex, startIndex + itemsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const handleDownload = (transcription: TranscriptionRecord, format: string) => {
    const blob = new Blob([transcription.text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${transcription.filename.replace(/\.[^/.]+$/, "")}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Download started",
      description: `${transcription.filename} saved as ${format.toUpperCase()} file.`,
    })
  }

  const handleDelete = (transcription: TranscriptionRecord) => {
    toast({
      title: "Transcription deleted",
      description: `${transcription.filename} has been removed from your history.`,
    })
  }

  const handleView = (transcription: TranscriptionRecord) => {
    toast({
      title: "Opening transcription",
      description: `Viewing details for ${transcription.filename}`,
    })
  }

  if (filteredTranscriptions.length === 0) {
    return (
      <Card className="glass-effect">
        <CardContent className="p-8 text-center">
          <FileAudio className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No transcriptions found</h3>
          <p className="text-muted-foreground text-pretty">
            {searchQuery ? "Try adjusting your search terms" : "Upload your first audio file to get started"}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-effect">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTranscriptions.map((transcription) => (
              <TableRow key={transcription.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileAudio className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-sm">{transcription.filename}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground truncate max-w-xs">
                    {transcription.text.substring(0, 80)}...
                  </p>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="gap-1">
                    <Target className="h-3 w-3" />
                    {Math.round(transcription.confidence * 100)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDuration(transcription.duration)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(transcription.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transcription.status === "completed"
                        ? "default"
                        : transcription.status === "processing"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {transcription.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-effect">
                      <DropdownMenuItem onClick={() => handleView(transcription)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(transcription, "txt")}>
                        <Download className="h-4 w-4 mr-2" />
                        Download TXT
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownload(transcription, "srt")}>
                        <Download className="h-4 w-4 mr-2" />
                        Download SRT
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(transcription)} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredTranscriptions.length)} of{" "}
              {filteredTranscriptions.length} transcriptions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-transparent"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
