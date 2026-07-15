import { useState } from 'react'
import { ChevronDownIcon } from '@/components/icons'

export interface FaqItem {
  question: string
  answer: string
}

interface FaqCardProps {
  question: string
  answer: string
  expanded?: boolean
  onToggle?: () => void
}

export function FaqCard({ question, answer, expanded = false, onToggle }: FaqCardProps) {
  return (
    <div className="rounded-3xl border border-gfx-neutral-250 bg-gfx-sidebar px-8 py-7">
      <div className="flex items-center justify-between gap-6">
        <span className="text-lg 3xl:text-2xl 4xl:text-3xl text-white font-normal leading-6 3xl:leading-8 4xl:leading-10">{question}</span>
        <button
          type="button"
          onClick={onToggle}
          className={`w-11 h-11 rounded-lg bg-gradient-to-b from-gfx-green-50 to-gfx-green-150 flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 ease-in-out ${expanded ? 'rotate-180' : ''}`}
          aria-expanded={expanded}
        >
          <ChevronDownIcon size={14} color="#00f0a0" />
        </button>
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gfx-neutral-300 text-base leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

interface FaqSectionProps {
  faqs: FaqItem[]
  expandedFaq: number | null
  onToggle: (index: number) => void
}

export function FaqSection({ faqs, expandedFaq, onToggle }: FaqSectionProps) {
  return (
    <div className="w-full xl:basis-1/2 xl:min-w-0">
      <h2 className="text-2xl font-normal mb-6 leading-8">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FaqCard
            key={i}
            question={faq.question}
            answer={faq.answer}
            expanded={expandedFaq === i}
            onToggle={() => onToggle(i)}
          />
        ))}
      </div>
    </div>
  )
}
