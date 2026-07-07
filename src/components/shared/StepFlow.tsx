export function StepCircle({ stepNumber, status }: { stepNumber: number; status: 'completed' | 'active' | 'inactive' }) {
  if (status === 'inactive') {
    return (
      <div className="w-10 h-10 3xl:w-14 3xl:h-14 4xl:w-18 4xl:h-18 rounded-full bg-[#404040] flex items-center justify-center">
        <span className="text-[#a0a0a0] text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.75rem] font-medium">{stepNumber}</span>
      </div>
    )
  }

  return (
    <div className="w-10 h-10 3xl:w-14 3xl:h-14 4xl:w-18 4xl:h-18 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_15.7px_5px_rgba(255,255,255,0.25)]">
      {status === 'completed' ? (
        <svg className="w-[0.625rem] h-[0.4375rem] 3xl:w-[0.875rem] 3xl:h-[0.625rem] 4xl:w-[1.125rem] 4xl:h-[0.8125rem]" viewBox="0 0 10 7" fill="none" aria-hidden="true">
          <path d="M1 3.5L3.5 6L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span className="text-black text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.75rem] font-medium">{stepNumber}</span>
      )}
    </div>
  )
}

export function StepConnector({ status }: { status: 'completed' | 'inactive' }) {
  return <div className={`flex-1 w-px mt-3 mb-1 ${status === 'completed' ? 'bg-white' : 'bg-[#404040]'}`} />
}

