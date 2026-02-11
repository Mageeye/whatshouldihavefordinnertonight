'use client'

import { useState } from 'react'
import { FAQ } from '@/lib/seo/recipe-ideas'

interface FAQSectionProps {
  title?: string
  faqs: FAQ[]
}

export function FAQSection({ title = 'Frequently Asked Questions', faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-card overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-foreground text-sm">
                {faq.question}
              </span>
              <svg
                className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
