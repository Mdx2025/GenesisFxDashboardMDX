import { useMemo, useState, type FormEvent } from 'react'
import {
  AnalysisCard,
  AnalysisMetricCard,
  AnalyzeIcon,
  AssetPill,
  QuoteSparkline,
  RangeMeter,
  SearchInput,
  SentimentGauge,
  SignalPill,
  SparkleButton,
  TrendUpIcon,
} from '@/components/ui'
import { PriceChangeBarChart } from '@/components/charts/PriceChangeBarChart'
import {
  AI_ANALYSIS_ASSETS,
  buildAiAnalysis,
  normalizeSymbol,
  type AiAnalysisDataset,
  type AiAnalysisQuote,
  type AiAnalysisSentiment,
  type AiAnalysisSignal,
  type AiAnalysisTradeIdea,
} from '@/data/aiAnalysis'

const DEFAULT_SYMBOL = AI_ANALYSIS_ASSETS[0]

/** Stand-in tile for instruments that ship no flag artwork. */
function SymbolMonogram({ symbol }: { symbol: string }) {
  return (
    <span
      className="flex h-[80.5px] w-[87px] shrink-0 items-center justify-center rounded-[15px] bg-gfx-green-900 text-white text-xl font-acid leading-none"
      aria-hidden="true"
    >
      {symbol.slice(0, 3)}
    </span>
  )
}

function QuoteCard({ quote, sentiment }: { quote: AiAnalysisQuote; sentiment: AiAnalysisSentiment }) {
  return (
    <AnalysisCard glow="top-center">
      <div className="flex min-h-[293px] flex-col items-center justify-center gap-8 px-[51px] py-8 xl:flex-row xl:justify-between xl:gap-6">
        <div className="flex items-center gap-4">
          {quote.flag ? (
            <img src={quote.flag} alt="" className="h-[80.5px] w-[87px] shrink-0 rounded-[15px] object-cover" loading="lazy" />
          ) : (
            <SymbolMonogram symbol={quote.symbol} />
          )}
          <div className="flex flex-col gap-[13px]">
            <div className="flex items-center gap-[9px]">
              <span className="text-white text-2xl font-acid leading-none" data-testid="quote-symbol">
                {quote.symbol}
              </span>
              <span className="inline-flex h-[30px] items-center rounded-[20px] bg-gfx-green-900 px-2.5 text-gfx-neutral-400 text-body1 font-acid leading-none">
                {quote.market}
              </span>
            </div>
            <div className="flex items-end gap-[13px]">
              <span className="text-white text-h1 font-acid leading-none" data-testid="quote-price">
                {quote.price}
              </span>
              <span
                className={`ai-signal-pill ${
                  quote.up ? 'ai-signal-pill--success' : 'ai-signal-pill--danger'
                } inline-flex h-[26px] shrink-0 items-center gap-[7px] whitespace-nowrap rounded-[32px] px-2 text-base font-medium font-acid leading-none`}
              >
                <span className={quote.up ? 'flex' : 'flex -scale-y-100'}>
                  <TrendUpIcon size={21.5} />
                </span>
                {quote.change}
              </span>
            </div>
          </div>
        </div>

        <QuoteSparkline className="h-[115px] w-[222px] shrink-0" />

        <SentimentGauge
          {...sentiment}
          verdictClassName={
            sentiment.verdict === 'Buy'
              ? 'text-gfx-bullish-light'
              : sentiment.verdict === 'Neutral'
                ? 'text-gfx-neutral-400'
                : 'text-gfx-red-muted'
          }
        />
      </div>
    </AnalysisCard>
  )
}

function TechnicalSignalsCard({ signals }: { signals: AiAnalysisSignal[] }) {
  return (
    <AnalysisCard>
      <div className="flex flex-col gap-[13px] px-7 py-[23px]">
        <h3 className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">TECHNICAL SIGNALS</h3>
        {signals.map(signal => (
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

function KeyLevelsCard({ keyLevels }: { keyLevels: AiAnalysisDataset['keyLevels'] }) {
  return (
    <AnalysisCard>
      <div className="flex flex-col gap-[13px] px-7 py-[23px]">
        <h3 className="text-gfx-neutral-400 text-base font-medium font-acid leading-[24.44px]">KEY LEVELS</h3>
        <p className="text-gfx-red-muted text-base font-medium font-acid leading-[24.44px]">Resistance</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {keyLevels.resistance.map(level => (
            <SignalPill key={level} tone="danger" wide>
              {level}
            </SignalPill>
          ))}
        </div>
        <p className="mt-[11px] text-gfx-bullish-light text-base font-medium font-acid leading-[24.44px]">Support</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {keyLevels.support.map(level => (
            <SignalPill key={level} tone="success" wide>
              {level}
            </SignalPill>
          ))}
        </div>
      </div>
    </AnalysisCard>
  )
}

function TradeIdeaCard({ tradeIdea }: { tradeIdea: AiAnalysisTradeIdea }) {
  const sections = [
    { title: 'Entry', titleClass: 'text-white', body: tradeIdea.entry },
    { title: 'Stop', titleClass: 'text-gfx-red-muted', body: tradeIdea.stop },
    { title: 'Target', titleClass: 'text-gfx-bullish-light', body: tradeIdea.target },
  ]
  return (
    <AnalysisCard>
      <div className="flex flex-col gap-[26px] px-7 py-[23px]">
        <div className="flex items-center gap-[9px]">
          <h3 className="text-white text-base font-medium font-acid leading-[24.44px]">Trade Idea</h3>
          <span className="inline-flex h-[31px] items-center rounded-[32px] bg-gfx-green-900 px-2.5 text-gfx-neutral-400 text-base font-medium font-acid leading-none">
            {tradeIdea.direction}
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
  const [activeSymbol, setActiveSymbol] = useState<string>(DEFAULT_SYMBOL)
  const [query, setQuery] = useState('')
  const canAnalyze = query.trim().length > 0

  const analysis = useMemo(() => buildAiAnalysis(activeSymbol), [activeSymbol])

  // A searched instrument that is not one of the defaults joins the pill row,
  // so the toolbar keeps showing what is actually on screen.
  const assets = useMemo(
    () => (AI_ANALYSIS_ASSETS.some(asset => asset === activeSymbol) ? [...AI_ANALYSIS_ASSETS] : [...AI_ANALYSIS_ASSETS, activeSymbol]),
    [activeSymbol],
  )

  // Submit instead of a bare click so Enter in the field analyses too.
  const handleAnalyze = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = normalizeSymbol(query)
    if (next) setActiveSymbol(next)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar: instrument selector, search and analyze */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-[5px]">
          {assets.map(symbol => (
            <AssetPill key={symbol} selected={symbol === activeSymbol} onClick={() => setActiveSymbol(symbol)}>
              {symbol}
            </AssetPill>
          ))}
        </div>
        <form onSubmit={handleAnalyze} className="flex w-full min-w-0 items-center gap-1.5 sm:w-auto">
          <SearchInput
            placeholder="Symbol"
            ariaLabel="Symbol"
            value={query}
            onChange={setQuery}
            className="min-w-0 flex-1 sm:w-[287px] sm:flex-none"
          />
          <SparkleButton
            type="submit"
            className="!h-[2.875rem] !w-[130px] sm:!w-[173px] !min-w-0 !rounded-3xl shrink-0"
            disabled={!canAnalyze}
          >
            <AnalyzeIcon />
            Analyze
          </SparkleButton>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[2.04fr_1fr]">
        {/* Quote, price chart and the long-form read */}
        <div className="flex flex-col gap-5">
          <QuoteCard quote={analysis.quote} sentiment={analysis.sentiment} />

          <AnalysisCard glow="none" className="h-[260px] p-5 sm:h-[320px] sm:p-6">
            <PriceChangeBarChart
              data={analysis.priceChanges}
              ariaLabel={`${analysis.quote.symbol} 1 hour price change per bar`}
            />
          </AnalysisCard>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <NarrativeCard title="Technical" body={analysis.technical} />
            <NarrativeCard title="Fundamental" body={analysis.fundamental} />
          </div>
        </div>

        {/* Indicator rail */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            {analysis.metrics.map((metric, index) => (
              <AnalysisMetricCard
                key={`${metric.label}-${index}`}
                label={metric.label}
                value={metric.value}
                caption={metric.caption}
                valueClassName={metric.positive ? 'text-gfx-bullish-light' : 'text-white'}
              />
            ))}
          </div>
          <RangeMeter {...analysis.range} />
          <TechnicalSignalsCard signals={analysis.signals} />
          <KeyLevelsCard keyLevels={analysis.keyLevels} />
          <TradeIdeaCard tradeIdea={analysis.tradeIdea} />
        </div>
      </div>
    </div>
  )
}
