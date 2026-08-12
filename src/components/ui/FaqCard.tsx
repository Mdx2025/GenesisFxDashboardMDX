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
    <div className="faq-card rounded-3xl border border-gfx-neutral-250 bg-gfx-sidebar px-8 py-7">
      <div className="flex items-center justify-between gap-6">
        <span className="text-lg 3xl:text-2xl 4xl:text-3xl text-white font-normal leading-6 3xl:leading-8 4xl:leading-10">{question}</span>
        <button
          type="button"
          onClick={onToggle}
          className={`faq-toggle w-11 h-11 rounded-lg bg-gradient-to-b from-gfx-green-50 to-gfx-green-150 flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 ease-in-out ${expanded ? 'rotate-180' : ''}`}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse answer: ${question}` : `Expand answer: ${question}`}
        >
          <span className="faq-toggle__dark-icon" aria-hidden="true">
            <ChevronDownIcon size={14} color="#00f0a0" />
          </span>
          <svg className="faq-toggle__light-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 14.6667C0 6.56649 6.56649 0 14.6667 0H29.3333C37.4335 0 44 6.56649 44 14.6667V29.3333C44 37.4335 37.4335 44 29.3333 44H14.6667C6.56649 44 0 37.4335 0 29.3333V14.6667Z" fill="var(--color-container-background-container-box-alternative, #F1FFFA)" />
            <path d="M23.0387 20.1041L26.8312 23.8966C27.7552 24.8206 27.1008 26.4004 25.7941 26.4004L18.2091 26.4004C16.9025 26.4004 16.2481 24.8206 17.172 23.8966L20.9645 20.1041C21.5373 19.5314 22.4659 19.5314 23.0387 20.1041Z" fill="var(--color-surface-icon-surface-icon-alternative, #00B38C)" />
          </svg>
        </button>
      </div>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gfx-neutral-500 text-base leading-relaxed">{answer}</p>
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
