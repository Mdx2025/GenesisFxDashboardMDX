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
    <div className="rounded-[1.875rem] border border-[#303030] bg-[#000705] px-8 py-7">
      <div className="flex items-center justify-between gap-6">
        <span className="text-[1.125rem] 3xl:text-[1.5rem] 4xl:text-[2rem] text-white font-normal leading-[1.406rem] 3xl:leading-[1.875rem] 4xl:leading-[2.5rem]">{question}</span>
        <button
          type="button"
          onClick={onToggle}
          className={`w-11 h-11 rounded-[0.9375rem] bg-gradient-to-b from-[#011b12] to-[#08291e] flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 ease-in-out ${expanded ? 'rotate-180' : ''}`}
          aria-expanded={expanded}
        >
          <ChevronDownIcon size={14} color="#00f0a0" />
        </button>
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gfx-neutral-300 text-[0.9375rem] leading-relaxed">{answer}</p>
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
      <h2 className="text-[1.5rem] font-normal mb-6 leading-[1.875rem]">FAQs</h2>
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
