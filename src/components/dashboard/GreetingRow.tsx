import { useNavigate } from 'react-router-dom'
import { SparkleButton } from '@/components/ui'
import { DepositIcon, WithdrawIcon, TransferIcon } from '@/components/icons'

interface GreetingRowProps {
  userName?: string
  date?: string
  tagline?: string
  onTransferClick?: () => void
}

export function GreetingRow({ userName = 'Marcelo', date = 'Friday, Apr 3', tagline = 'Born To Outperform', onTransferClick }: GreetingRowProps) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 sm:mt-0 mb-5 gap-4">
      <div>
        <time className="text-gfx-neutral-500 text-base sm:text-body2 mb-1 block">{date}</time>
        <h1 className="text-white font-normal leading-none mb-1 text-[clamp(1.5rem,0.75rem+1.5vw,3.5rem)]">Good afternoon, {userName}</h1>
        <p className="text-gfx-neutral-500 text-base sm:text-body2">{tagline}</p>
      </div>
      <div className="hidden xl:flex items-center gap-3 flex-wrap">
        <SparkleButton onClick={() => navigate('/deposit')}>
          <span className="flex items-center gap-2">
            <DepositIcon />
            <span className="hidden sm:inline">Deposit</span>
          </span>
        </SparkleButton>
        <SparkleButton>
          <span className="flex items-center gap-2">
            <WithdrawIcon />
            <span className="hidden sm:inline">Withdraw</span>
          </span>
        </SparkleButton>
        <SparkleButton onClick={onTransferClick}>
          <span className="flex items-center gap-2">
            <TransferIcon />
            <span className="hidden sm:inline">Transfer</span>
          </span>
        </SparkleButton>
      </div>
    </div>
  )
}
