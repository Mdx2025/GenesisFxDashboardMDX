import type { ReactNode } from 'react'

interface CourseCardProps {
  image: string
  title: string
  description: string
  lessons: number
  duration: string
  level: string
  onClick?: () => void
}

function PlayButton() {
  return (
    <button type="button" className="shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <svg width="61" height="61" viewBox="0 0 61 61" fill="none" className="3xl:w-[76px] 3xl:h-[76px] 4xl:w-[92px] 4xl:h-[92px]">
        <circle cx="30.1783" cy="30.1783" r="30.1783" fill="url(#coursecard_play_bg)" />
        <circle cx="30.1783" cy="30.1783" r="29.6836" stroke="url(#coursecard_play_border)" strokeOpacity="0.5" strokeWidth="0.989453" />
        <g transform="translate(21.7, 21.7)">
          <path d="M15.0017 6.5555C16.4888 7.36421 16.4888 9.45773 15.0017 10.2665L6.02226 15.1494C4.57689 15.9354 2.80066 14.9124 2.80066 13.294L2.80066 3.52799C2.80066 1.90955 4.57689 0.886525 6.02225 1.67251L15.0017 6.5555Z" fill="#00B38C" />
        </g>
        <defs>
          <radialGradient id="coursecard_play_bg" cx="0" cy="0" r="1" gradientTransform="matrix(-14.5772 51.2953 -77.0328 -168.531 39.6719 1.81855)" gradientUnits="userSpaceOnUse">
            <stop offset="0.192308" stopColor="#08120F" />
            <stop offset="0.725962" stopColor="#111F1B" />
          </radialGradient>
          <linearGradient id="coursecard_play_border" x1="31.0554" y1="0" x2="32.2727" y2="26.8426" gradientUnits="userSpaceOnUse">
            <stop offset="0.245192" stopColor="#00422C" />
            <stop offset="0.629417" stopColor="#064B34" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  )
}

function VideoLibraryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="shrink-0 3xl:w-[27px] 3xl:h-[27px] 4xl:w-[33px] 4xl:h-[33px]">
      <path d="M7.78212 1.82813H14.1654C14.378 1.82808 14.541 1.82804 14.6835 1.84198C15.6966 1.94108 16.5258 2.55019 16.8774 3.37067H5.07008C5.42172 2.55019 6.25094 1.94108 7.26404 1.84198C7.40652 1.82804 7.56952 1.82808 7.78212 1.82813Z" fill="#404040" />
      <path d="M5.7708 4.3184C4.49909 4.3184 3.45632 5.08635 3.10833 6.10513C3.10107 6.12637 3.09412 6.14772 3.08747 6.16917C3.45158 6.05891 3.83051 5.98688 4.21411 5.9377C5.20211 5.81104 6.4507 5.8111 7.90112 5.81118H14.2039C15.6543 5.8111 16.9029 5.81104 17.8909 5.9377C18.2745 5.98688 18.6535 6.05891 19.0176 6.16917C19.0109 6.14772 19.004 6.12637 18.9967 6.10513C18.6487 5.08635 17.6059 4.3184 16.3342 4.3184H5.7708Z" fill="#404040" />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.0169 6.8963H7.93073C4.84448 6.8963 3.30135 6.8963 2.43454 7.79875C1.56774 8.70119 1.77169 10.0954 2.17958 12.884L2.56638 15.5283C2.88625 17.7151 3.04619 18.8085 3.86666 19.4632C4.68713 20.118 5.89726 20.118 8.31751 20.118H13.6301C16.0503 20.118 17.2605 20.118 18.081 19.4632C18.9014 18.8085 19.0614 17.7151 19.3812 15.5283L19.768 12.884C20.1759 10.0955 20.3799 8.70119 19.5131 7.79875C18.6463 6.8963 17.1031 6.8963 14.0169 6.8963ZM13.3343 14.4429C13.845 14.1263 13.845 13.3068 13.3343 12.9902L10.251 11.0788C9.75472 10.7712 9.14482 11.1716 9.14482 11.8051V15.628C9.14482 16.2615 9.75473 16.662 10.251 16.3543L13.3343 14.4429Z" fill="#404040" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="shrink-0 3xl:w-[24px] 3xl:h-[24px] 4xl:w-[29px] 4xl:h-[29px]">
      <path d="M18.2899 9.14495C18.2899 14.1956 14.1956 18.2899 9.14495 18.2899C4.09433 18.2899 0 14.1956 0 9.14495C0 4.09433 4.09433 0 9.14495 0C14.1956 0 18.2899 4.09433 18.2899 9.14495Z" fill="#404040" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.14495 4.8011C9.52374 4.8011 9.83082 5.10817 9.83082 5.48697V8.86085L11.9162 10.9462C12.184 11.2141 12.184 11.6483 11.9162 11.9162C11.6483 12.184 11.2141 12.184 10.9462 11.9162L8.65996 9.62993C8.53134 9.50131 8.45908 9.32685 8.45908 9.14495V5.48697C8.45908 5.10817 8.76615 4.8011 9.14495 4.8011Z" fill="#021B13" />
    </svg>
  )
}

export function CourseCard({ image, title, description, lessons, duration, level, onClick }: CourseCardProps) {
  return (
    <div
      className="group relative rounded-[27px] overflow-hidden border border-[rgba(0,66,44,0.5)] cursor-pointer hover:border-[rgba(0,66,44,0.8)] transition-colors"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative aspect-[501/334] overflow-hidden rounded-[27px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="px-[27px] 3xl:px-[34px] 4xl:px-[40px] pt-[9px] 3xl:pt-[11px] 4xl:pt-[14px] pb-[27px] 3xl:pb-[34px] 4xl:pb-[40px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-[1.5rem] 3xl:text-[2rem] 4xl:text-[2.625rem] font-normal leading-tight">
              {title}
            </h3>

            <p className="text-[#808080] text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.5rem] font-normal leading-[24.44px] 3xl:leading-[30px] 4xl:leading-[37px] line-clamp-2">
              {description}
            </p>
          </div>
          <PlayButton />
        </div>

        <div className="flex items-center mt-[20px] 3xl:mt-[25px] 4xl:mt-[30px]">
          <span
            className="inline-flex items-center justify-center h-[37px] 3xl:h-[46px] 4xl:h-[56px] px-[13px] 3xl:px-[16px] 4xl:px-[20px] rounded-full text-white text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.5rem] font-normal leading-[24.44px] outline outline-[0.99px] outline-offset-[-0.99px] outline-[rgba(0,66,44,0.5)]"
            style={{ background: 'radial-gradient(ellipse 88.35% 307.01% at 65.73% 3.01%, #08120F 19%, #111F1B 73%)' }}
          >
            {level}
          </span>

          <div className="flex items-center gap-[5px] 3xl:gap-[6px] ml-[22px] 3xl:ml-[28px] 4xl:ml-[33px]">
            <VideoLibraryIcon />
            <span className="text-[#808080] text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.5rem] font-medium leading-[24.44px]">{lessons} Lessons</span>
          </div>

          <div className="flex items-center gap-[5px] 3xl:gap-[6px] ml-auto">
            <ClockIcon />
            <span className="text-[#808080] text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.5rem] font-medium leading-[24.44px]">{duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
