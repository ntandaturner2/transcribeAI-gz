"use client"

import { useState } from "react"
import { UploadArea } from "@/components/upload-area"
import { TranscriptionResultComponent } from "@/components/transcription-result"
import { SignupModal } from "@/components/signup-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Clock, Upload, FileText, Download, Star, Users, CheckCircle } from "lucide-react"

interface TranscriptionResult {
  text: string
  confidence: number
  duration: number
  filename: string
}

export default function HomePage() {
  const [transcriptionResult, setTranscriptionResult] = useState<TranscriptionResult | null>(null)
  const [showSignupModal, setShowSignupModal] = useState(false)

  const handleTranscriptionComplete = (result: TranscriptionResult) => {
    setTranscriptionResult(result)
    // Show signup modal after first successful transcription
    setTimeout(() => setShowSignupModal(true), 2000)
  }

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get accurate transcriptions in minutes, not hours",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your audio files are encrypted and never stored permanently",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Process your audio files anytime, anywhere",
    },
  ]

  const steps = [
    {
      icon: Upload,
      title: "Upload",
      description: "Drag and drop your audio file",
    },
    {
      icon: FileText,
      title: "Process",
      description: "AI transcribes your audio",
    },
    {
      icon: Download,
      title: "Download",
      description: "Get your text in multiple formats",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 hero-background relative">
        <div className="sound-wave"></div>

        {/* Floating decorative elements */}
        <div className="floating-element w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
        <div className="floating-element w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-2xl"></div>
        <div className="floating-element w-16 h-16 bg-gradient-to-br from-primary/25 to-accent/25 rounded-full blur-lg"></div>

        <div className="container mx-auto max-w-6xl hero-content">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-muted text-muted-foreground fade-in-up pulse-glow">
              ✨ AI-Powered Transcription
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance text-foreground fade-in-up fade-in-up-delay-1">
              Transform Audio to Text
              <span className="block text-gradient-animated">In Seconds</span>
            </h1>
            <p
              className="text-xl mb-8 max-w-2xl mx-auto text-pretty fade-in-up fade-in-up-delay-2"
              style={{ color: "var(--muted-foreground)" }}
            >
              Upload your audio files and get accurate, professional transcriptions powered by advanced AI technology.
              Perfect for meetings, interviews, and content creation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 fade-in-up fade-in-up-delay-3">
              <Button className="btn-primary-modern px-8 py-4 text-lg">Start Transcribing Free</Button>
              <Button variant="outline" className="px-8 py-4 text-lg border-2 hover:bg-primary/5 bg-transparent">
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground fade-in-up fade-in-up-delay-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>99.9% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-12 fade-in-up fade-in-up-delay-3">
            <UploadArea onTranscriptionComplete={handleTranscriptionComplete} />
          </div>

          {/* Transcription Result */}
          {transcriptionResult && (
            <div className="mb-12">
              <TranscriptionResultComponent result={transcriptionResult} />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance text-foreground">Why Choose TranscribeAI?</h2>
            <p style={{ color: "var(--muted-foreground)" }} className="text-pretty">
              Professional-grade transcription with enterprise security
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-premium text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-muted/20">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p style={{ color: "var(--muted-foreground)" }} className="text-pretty">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance text-foreground">How It Works</h2>
            <p style={{ color: "var(--muted-foreground)" }} className="text-pretty">
              Three simple steps to get your transcription
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="p-4 rounded-full bg-primary text-primary-foreground shadow-sm">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
                <p style={{ color: "var(--muted-foreground)" }} className="text-pretty">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Card className="card-premium text-center">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">10,000+</div>
                  <div style={{ color: "var(--muted-foreground)" }}>Happy Users</div>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">1M+</div>
                  <div style={{ color: "var(--muted-foreground)" }}>Files Transcribed</div>
                </div>
                <div>
                  <div className="flex justify-center mb-2">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">4.9/5</div>
                  <div style={{ color: "var(--muted-foreground)" }}>Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance text-foreground">Simple, Transparent Pricing</h2>
            <p style={{ color: "var(--muted-foreground)" }} className="text-pretty">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-premium">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Free</h3>
                  <div className="text-3xl font-bold text-foreground">$0</div>
                  <div style={{ color: "var(--muted-foreground)" }}>per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">3 transcriptions per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Up to 30 minutes per file</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Basic export formats</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="card-premium border-primary shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Badge className="mb-2 bg-primary text-primary-foreground">Most Popular</Badge>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Pro</h3>
                  <div className="text-3xl font-bold text-foreground">$19</div>
                  <div style={{ color: "var(--muted-foreground)" }}>per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Unlimited transcriptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Up to 5 hours per file</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">All export formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full btn-primary-premium">Start Pro Trial</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  )
}
