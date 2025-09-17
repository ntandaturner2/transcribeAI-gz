"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle, X, ChevronDown, Star } from "lucide-react"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out our service",
      price: { monthly: 0, yearly: 0 },
      features: [
        { name: "3 transcriptions per month", included: true },
        { name: "Up to 30 minutes per file", included: true },
        { name: "Basic export formats (TXT)", included: true },
        { name: "Standard accuracy", included: true },
        { name: "Email support", included: true },
        { name: "Unlimited transcriptions", included: false },
        { name: "Extended file length (5 hours)", included: false },
        { name: "All export formats (SRT, VTT)", included: false },
        { name: "Priority processing", included: false },
        { name: "Advanced accuracy", included: false },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
        { name: "Team collaboration", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      description: "For professionals and content creators",
      price: { monthly: 19, yearly: 190 },
      features: [
        { name: "3 transcriptions per month", included: true },
        { name: "Up to 30 minutes per file", included: true },
        { name: "Basic export formats (TXT)", included: true },
        { name: "Standard accuracy", included: true },
        { name: "Email support", included: true },
        { name: "Unlimited transcriptions", included: true },
        { name: "Extended file length (5 hours)", included: true },
        { name: "All export formats (SRT, VTT)", included: true },
        { name: "Priority processing", included: true },
        { name: "Advanced accuracy", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: false },
        { name: "Team collaboration", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: { monthly: 99, yearly: 990 },
      features: [
        { name: "3 transcriptions per month", included: true },
        { name: "Up to 30 minutes per file", included: true },
        { name: "Basic export formats (TXT)", included: true },
        { name: "Standard accuracy", included: true },
        { name: "Email support", included: true },
        { name: "Unlimited transcriptions", included: true },
        { name: "Extended file length (5 hours)", included: true },
        { name: "All export formats (SRT, VTT)", included: true },
        { name: "Priority processing", included: true },
        { name: "Advanced accuracy", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
        { name: "Team collaboration", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faqs = [
    {
      question: "How accurate are the transcriptions?",
      answer:
        "Our AI-powered transcription service achieves 95%+ accuracy on clear audio recordings. Accuracy may vary based on audio quality, background noise, accents, and technical terminology.",
    },
    {
      question: "What audio formats do you support?",
      answer:
        "We support all major audio formats including MP3, WAV, M4A, OGG, and FLAC. Maximum file size is 100MB for free users and 1GB for Pro and Enterprise users.",
    },
    {
      question: "How long does transcription take?",
      answer:
        "Most transcriptions are completed within 2-5 minutes, depending on file length and current processing load. Pro and Enterprise users get priority processing for faster results.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take security seriously. All files are encrypted in transit and at rest. We automatically delete audio files after 30 days, and you can delete them immediately after transcription if preferred.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "You can cancel your subscription at any time from your account settings. You'll continue to have access to your plan features until the end of your billing period.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with our service, contact support within 30 days for a full refund.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        "The free trial includes all Pro features for 14 days, including unlimited transcriptions, extended file lengths, and priority support. No credit card required to start.",
    },
    {
      question: "Do you offer volume discounts?",
      answer:
        "Yes! Enterprise customers can get custom pricing based on their usage needs. Contact our sales team to discuss volume discounts and custom solutions.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Podcast Producer",
      company: "Creative Media Co.",
      content: "TranscribeAI has revolutionized our workflow. What used to take hours now takes minutes.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Research Director",
      company: "University Labs",
      content: "The accuracy is incredible, even with technical terminology. Essential for our research.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Content Manager",
      company: "Digital Agency",
      content: "Best transcription service we've used. The export options are exactly what we needed.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="relative text-center mb-12 overflow-hidden">
          {/* Floating gradient elements */}
          <div className="absolute inset-0 -z-10">
            <div className="floating-gradient-1 absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
            <div className="floating-gradient-2 absolute top-20 right-1/3 w-24 h-24 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-lg"></div>
            <div className="floating-gradient-3 absolute bottom-10 left-1/2 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
          </div>

          {/* Sound wave background pattern */}
          <div className="absolute inset-0 -z-20 opacity-5">
            <div className="sound-wave-bg"></div>
          </div>

          <div className="hero-content-fade-in">
            <Badge variant="secondary" className="mb-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              💰 Simple, Transparent Pricing
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold mb-6 text-balance animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Choose Your{" "}
              <span className="gradient-text-animated bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Start free and upgrade as you grow. All plans include our core transcription features with no hidden fees.
            </p>

            {/* Enhanced Billing Toggle */}
            <div
              className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>Monthly</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="relative btn-primary-modern"
              >
                <div
                  className={`absolute inset-0 w-1/2 bg-primary rounded-sm transition-transform ${
                    billingCycle === "yearly" ? "translate-x-full" : "translate-x-0"
                  }`}
                />
                <span className="relative z-10 px-3 py-1">Monthly</span>
                <span className="relative z-10 px-3 py-1">Yearly</span>
              </Button>
              <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              </span>
            </div>

            {/* Trust indicators */}
            <div
              className="flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>30-day money back</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`glass relative ${plan.popular ? "border-primary ring-1 ring-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                <p className="text-muted-foreground text-sm text-pretty">{plan.description}</p>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">
                      ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                    )}
                  </div>
                  {billingCycle === "yearly" && plan.price.monthly > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ${Math.round(plan.price.yearly / 12)}/month billed annually
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.slice(0, 6).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? "" : "variant-outline"}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.name === "Free" ? "/signup" : plan.name === "Enterprise" ? "/contact" : "/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-balance">Compare All Features</h2>
            <p className="text-muted-foreground text-pretty">See exactly what's included in each plan</p>
          </div>

          <Card className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Features</th>
                    <th className="text-center p-4 font-medium">Free</th>
                    <th className="text-center p-4 font-medium">Pro</th>
                    <th className="text-center p-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {plans[0].features.map((feature, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="p-4 font-medium">{feature.name}</td>
                      {plans.map((plan) => (
                        <td key={plan.name} className="p-4 text-center">
                          {plan.features[index].included ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-balance">Trusted by Thousands</h2>
            <p className="text-muted-foreground text-pretty">See what our customers have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 text-pretty">"{testimonial.content}"</p>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-balance">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-pretty">Everything you need to know about our service</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible key={index}>
                <Card className="glass">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-left text-base font-medium text-balance">{faq.question}</CardTitle>
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-pretty">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-balance">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6 text-pretty">
                Join thousands of users who trust TranscribeAI for their audio transcription needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">No credit card required • Cancel anytime</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
