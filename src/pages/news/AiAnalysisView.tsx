import { useState } from 'react'
import {
  AnalysisCard,
  AnalysisMetricCard,
  AnalyzeIcon,
  AssetPill,
  QuoteSparkline,
  RangeMeter,
  SearchInput,
  SecondaryButton,
  SentimentGauge,
  SignalPill,
  TrendUpIcon,
} from '@/components/ui'
import {
  AI_ANALYSIS_ASSETS,
  aiAnalysisFundamental,
  aiAnalysisKeyLevels,
  aiAnalysisMetrics,
  aiAnalysisQuote,
  aiAnalysisRange,
  aiAnalysisSentiment,
  aiAnalysisSignals,
  aiAnalysisTechnical,
  aiAnalysisTradeIdea,
} from '@/data/aiAnalysis'

function QuoteCard() {
  return (
    <AnalysisCard glow="top-center">
      <div className="flex min-h-[293px] flex-col items-center justify-center gap-8 px-[51px] py-8 xl:flex-row xl:justify-between xl:gap-6">
        <div className="flex items-center gap-4">
          <img
            src={aiAnalysisQuote.flag}
            alt=""
            className="h-[80.5px] w-[87px] shrink-0 rounded-[15px] object-cover"
            loading="lazy"
          />
          <div className="flex flex-col gap-[13px]">
            <div className="flex items-center gap-[9px]">
              <span className="text-white text-2xl font-acid leading-none">{aiAnalysisQuote.symbol}</span>
              <span className="inline-flex h-[30px] items-center rounded-[20px] bg-gfx-green-900 px-2.5 text-gfx-neutral-400 text-body1 font-acid leading-none">
                {aiAnalysisQuote.market}
              </span>
            </div>
            <div className="flex items-end gap-[13px]">
              <span className="text-white text-h1 font-acid leading-none">{aiAnalysisQuote.price}</span>
              <span className="ai-signal-pill ai-signal-pill--success inline-flex h-[26px] shrink-0 items-center gap-[7px] whitespace-nowrap rounded-[32px] px-2 text-base font-medium font-acid leading-none">
                <TrendUpIcon size={21.5} />
                {aiAnalysisQuote.change}
              </span>
            </div>
          </div>
        </div>

        <QuoteSparkline className="h-[115px] w-[222px] shrink-0" />

        <SentimentGauge {...aiAnalysisSentiment} />
      </div>
    </AnalysisCard>
  )
}

function TechnicalSignalsCard() {
  return (
    <AnalysisCard>
      <div className="flex flex-col gap-[13px] px-7 py-[23px]">
        <h3 className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">TECHNICAL SIGNALS</h3>
        {aiAnalysisSignals.map(signal => (
          <div key={signal.name} className="flex items-center justify-between gap-3">
            <span className="text-gfx-neutral-550 text-base font-medium font-acid leading-[24.44px]">{signal.name}</span>
            <span className="flex items-center gap-[9px]">
              <span className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">{signal.reading}</span>
              <SignalPill tone={signal.tone}>{signal.verdict}</SignalPill>
            </span>
          </div>
        ))}
      </div>
    </AnalysisCard>
  )
}

function KeyLevelsCard() {
  return (
    <AnalysisCard>
      <div className="flex flex-col gap-[13px] px-7 py-[23px]">
        <h3 className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">KEY LEVELS</h3>
        <p className="text-gfx-red-muted text-base font-medium font-acid leading-[24.44px]">Resistance</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {aiAnalysisKeyLevels.resistance.map(level => (
            <SignalPill key={level} tone="danger" wide>
              {level}
            </SignalPill>
          ))}
        </div>
        <p className="mt-[11px] text-gfx-bullish-light text-base font-medium font-acid leading-[24.44px]">Support</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {aiAnalysisKeyLevels.support.map(level => (
            <SignalPill key={level} tone="success" wide>
              {level}
            </SignalPill>
          ))}
        </div>
      </div>
    </AnalysisCard>
  )
}

function TradeIdeaCard() {
  const sections = [
    { title: 'Entry', titleClass: 'text-white', body: aiAnalysisTradeIdea.entry },
    { title: 'Stop', titleClass: 'text-gfx-red-muted', body: aiAnalysisTradeIdea.stop },
    { title: 'Target', titleClass: 'text-gfx-bullish-light', body: aiAnalysisTradeIdea.target },
  ]
  return (
    <AnalysisCard>
      <div className="flex flex-col gap-[26px] px-7 py-[23px]">
        <div className="flex items-center gap-[9px]">
          <h3 className="text-white text-base font-medium font-acid leading-[24.44px]">Trade Idea</h3>
          <span className="inline-flex h-[31px] items-center rounded-[32px] bg-gfx-green-900 px-2.5 text-gfx-neutral-400 text-base font-medium font-acid leading-none">
            {aiAnalysisTradeIdea.direction}
          </span>
        </div>
        {sections.map(section => (
          <div key={section.title} className="flex flex-col gap-1">
            <p className={`${section.titleClass} text-base font-medium font-acid leading-[24.44px]`}>{section.title}</p>
            <p className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">{section.body}</p>
          </div>
        ))}
      </div>
    </AnalysisCard>
  )
}

function NarrativeCard({ title, body }: { title: string; body: string }) {
  return (
    <AnalysisCard className="h-full">
      <div className="flex flex-col gap-[26px] px-7 py-[35px]">
        <h3 className="text-white text-base font-medium font-acid leading-[24.44px]">{title}</h3>
        <p className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">{body}</p>
      </div>
    </AnalysisCard>
  )
}

export default function AiAnalysisView() {
  const [asset, setAsset] = useState(0)

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar: instrument selector, search and analyze */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-[5px]">
          {AI_ANALYSIS_ASSETS.map((symbol, index) => (
            <AssetPill key={symbol} selected={index === asset} onClick={() => setAsset(index)}>
              {symbol}
            </AssetPill>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <SearchInput placeholder="Search markets" ariaLabel="Search markets" className="w-[287px] max-w-full" />
          <SecondaryButton className="w-[173px] shrink-0">
            <AnalyzeIcon />
            Analyze
          </SecondaryButton>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[2.04fr_1fr]">
        {/* Quote, price chart and the long-form read */}
        <div className="flex flex-col gap-5">
          <QuoteCard />

          <img
            src="/images/news/ai-analysis-chart.webp"
            alt="EURUSD 1 hour candlestick chart"
            className="w-full rounded-[30px]"
            loading="lazy"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <NarrativeCard title="Technical" body={aiAnalysisTechnical} />
            <NarrativeCard title="Fundamental" body={aiAnalysisFundamental} />
          </div>
        </div>

        {/* Indicator rail */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            {aiAnalysisMetrics.map((metric, index) => (
              <AnalysisMetricCard
                key={`${metric.label}-${index}`}
                label={metric.label}
                value={metric.value}
                caption={metric.caption}
                valueClassName={metric.positive ? 'text-gfx-bullish-light' : 'text-white'}
              />
            ))}
          </div>
          <RangeMeter {...aiAnalysisRange} />
          <TechnicalSignalsCard />
          <KeyLevelsCard />
          <TradeIdeaCard />
        </div>
      </div>
    </div>
  )
}
