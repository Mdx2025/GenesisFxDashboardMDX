import { useId, useState, type FormEvent } from 'react'
import { GlassCard } from './GlassCard'
import { PrimaryPillButton } from './PrimaryPillButton'
import { SecondaryButton } from './SecondaryButton'

export const STREAMING_APPLICATION_TOPICS = [
  'Forex',
  'Crypto',
  'Indices',
  'Stocks',
  'Commodities',
  'Education',
  'Market analysis',
  'Trade review',
] as const

export type StreamingApplicationTopic = (typeof STREAMING_APPLICATION_TOPICS)[number]

function BroadcastApplicationIcon() {
  return (
    <span className="grid size-[94px] place-items-center rounded-full bg-gfx-green-100 text-gfx-green-300" aria-hidden="true">
      <svg viewBox="0 0 42 42" className="size-[42px]" fill="none">
        <circle cx="21" cy="21" r="5" fill="currentColor" />
        <path d="M13.5 13.6a10.5 10.5 0 0 0 0 14.8M28.5 13.6a10.5 10.5 0 0 1 0 14.8M8.3 8.4a17.8 17.8 0 0 0 0 25.2M33.7 8.4a17.8 17.8 0 0 1 0 25.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function StreamingApplicationField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div data-streaming-application-field>
      <label htmlFor={id} className="block text-base font-medium leading-[24.44px] text-white">{label}</label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 h-[50px] w-full rounded-[30px] border border-gfx-green-200 bg-gfx-green-800 px-6 text-base text-white outline-none placeholder:text-gfx-neutral-400 focus-visible:border-gfx-green-300 focus-visible:ring-2 focus-visible:ring-gfx-green-500/40"
      />
    </div>
  )
}

export function StreamingTopicChip({
  topic,
  selected,
  onClick,
}: {
  topic: StreamingApplicationTopic
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`h-[49px] rounded-[30px] border px-[18px] text-base font-medium leading-[24.44px] text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gfx-green-500 ${selected ? 'border-gfx-green-300 bg-gfx-green-900' : 'border-gfx-neutral-250 bg-transparent hover:border-gfx-green-300'}`}
      data-streaming-topic
    >
      {topic}
    </button>
  )
}

export function StreamingApplicationGate({ onApply, onBack }: { onApply: () => void; onBack: () => void }) {
  return (
    <GlassCard
      variant="light"
      divider="none"
      glow={false}
      rounded="30px"
      className="mx-auto flex h-[614px] w-full max-w-[1133px] flex-col items-center overflow-hidden px-6 text-center"
      data-streaming-application-gate
    >
      <div className="mt-[109px]"><BroadcastApplicationIcon /></div>
      <h1 className="mt-[59px] text-[50px] font-normal leading-none text-white">Streamer application required</h1>
      <p className="mt-6 max-w-[635px] text-base leading-[19.2px] text-gfx-neutral-400">
        To go live on Genesis you must first submit a streamer application and be approved.<br className="hidden sm:block" />
        This helps us keep the community safe and high quality
      </p>
      <div className="mt-[33px] flex flex-col items-center gap-[10px] sm:flex-row" data-streaming-application-actions>
        <PrimaryPillButton onClick={onApply} className="w-[280px] max-w-full">Apply to become a streamer</PrimaryPillButton>
        <SecondaryButton onClick={onBack} className="w-[248px] max-w-full">Back to Streaming</SecondaryButton>
      </div>
    </GlassCard>
  )
}

export function StreamingApplicationForm({ onSubmit }: { onSubmit?: () => void }) {
  const nameId = useId()
  const streamId = useId()
  const descriptionId = useId()
  const guidelinesId = useId()
  const [displayName, setDisplayName] = useState('')
  const [streamAbout, setStreamAbout] = useState('')
  const [description, setDescription] = useState('')
  const [topics, setTopics] = useState<StreamingApplicationTopic[]>([])
  const [accepted, setAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function toggleTopic(topic: StreamingApplicationTopic) {
    setTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    onSubmit?.()
  }

  return (
    <GlassCard
      variant="light"
      divider="none"
      glow={false}
      rounded="30px"
      className="mx-auto min-h-[913px] w-full max-w-[1133px] overflow-hidden px-5 sm:px-8"
      data-streaming-application-form
      data-submitted={submitted}
    >
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[699px] pb-[25px] pt-12 2xl:pt-[131px]">
        <StreamingApplicationField id={nameId} label="Display name*" placeholder="How viewers will know" value={displayName} onChange={setDisplayName} />

        <div className="mt-[65px]">
          <StreamingApplicationField id={streamId} label="What will you stream about?*(pick all that apply)" placeholder="How viewers will know" value={streamAbout} onChange={setStreamAbout} />
          <div className="mt-7 flex flex-wrap gap-x-[11px] gap-y-[10px]" aria-label="Streaming topics" data-streaming-topics>
            {STREAMING_APPLICATION_TOPICS.map((topic) => (
              <StreamingTopicChip key={topic} topic={topic} selected={topics.includes(topic)} onClick={() => toggleTopic(topic)} />
            ))}
          </div>
        </div>

        <div className="mt-[50px]">
          <label htmlFor={descriptionId} className="block text-base font-medium leading-[24.44px] text-white">Tell us about your streams*</label>
          <textarea
            id={descriptionId}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="A quick description of your format, style, and what viewers can expect."
            className="mt-2 h-[145px] w-full resize-none rounded-[30px] border border-gfx-green-200 bg-gfx-green-800 px-6 py-5 text-base text-white outline-none placeholder:text-gfx-neutral-400 focus-visible:border-gfx-green-300 focus-visible:ring-2 focus-visible:ring-gfx-green-500/40"
          />
        </div>

        <label htmlFor={guidelinesId} className="mt-6 flex cursor-pointer items-start gap-[23px] text-base leading-[19px] text-gfx-neutral-400">
          <input id={guidelinesId} type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="peer sr-only" />
          <span className="mt-px grid size-[19px] shrink-0 place-items-center rounded-[6px] border border-gfx-green-300 text-gfx-green-300 peer-focus-visible:ring-2 peer-focus-visible:ring-gfx-green-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-gfx-green-800" aria-hidden="true">
            {accepted && <svg viewBox="0 0 12 12" className="size-3" fill="none"><path d="m2.2 6.3 2.3 2.3 5.3-5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          </span>
          <span>I agree to follow Genesis broadcasting guidelines: no guaranteed-profit claims,<br className="hidden sm:block" /> no abusive language, no copyrighted media, no misleading performance claims.</span>
        </label>

        <div className="mt-[48px] flex justify-end">
          <PrimaryPillButton type="submit" className="w-[208px] max-w-full">Submit application</PrimaryPillButton>
        </div>
        <span className="sr-only" aria-live="polite">{submitted ? 'Application submission captured locally.' : ''}</span>
      </form>
    </GlassCard>
  )
}
