import { useState } from 'react'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, SearchInput, GlowEllipse, ModeToggle, SparkleButton } from '@/components/ui'

const TABS = ['Marketing Library', 'Landing Pages', 'Referral Links']

interface Material {
  type: 'image' | 'video' | 'document'
  title: string
  category: string
  description: string
}

const MATERIALS: Material[] = [
  { type: 'image', title: 'Icon Logo', category: 'Logos', description: 'Square logo icon for social sharing' },
  { type: 'image', title: 'Icon Logo', category: 'Logos', description: 'Square logo icon for social sharing' },
]

function GalleryIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" fill="#00B38C" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12.0574 1.25H11.9426C9.63424 1.24999 7.82519 1.24998 6.41371 1.43975C4.96897 1.63399 3.82895 2.03933 2.93414 2.93414C2.03933 3.82895 1.63399 4.96897 1.43975 6.41371C1.24998 7.82519 1.24999 9.63422 1.25 11.9426V12.0574C1.24999 14.3658 1.24998 16.1748 1.43975 17.5863C1.63399 19.031 2.03933 20.1711 2.93414 21.0659C3.82895 21.9607 4.96897 22.366 6.41371 22.5603C7.82519 22.75 9.63423 22.75 11.9426 22.75H12.0574C14.3658 22.75 16.1748 22.75 17.5863 22.5603C19.031 22.366 20.1711 21.9607 21.0659 21.0659C21.9607 20.1711 22.366 19.031 22.5603 17.5863C22.75 16.1748 22.75 14.3658 22.75 12.0574V11.9426C22.75 9.63423 22.75 7.82519 22.5603 6.41371C22.366 4.96897 21.9607 3.82895 21.0659 2.93414C20.1711 2.03933 19.031 1.63399 17.5863 1.43975C16.1748 1.24998 14.3658 1.24999 12.0574 1.25ZM3.9948 3.9948C4.56445 3.42514 5.33517 3.09825 6.61358 2.92637C7.91356 2.75159 9.62178 2.75 12 2.75C14.3782 2.75 16.0864 2.75159 17.3864 2.92637C18.6648 3.09825 19.4355 3.42514 20.0052 3.9948C20.5749 4.56445 20.9018 5.33517 21.0736 6.61358C21.2484 7.91356 21.25 9.62178 21.25 12C21.25 12.4502 21.2499 12.8764 21.2487 13.2804L21.0266 13.2497C18.1828 12.8559 15.5805 14.3343 14.2554 16.5626C12.5459 12.2376 8.02844 9.28807 2.98073 10.0129L2.75497 10.0454C2.76633 8.63992 2.80368 7.52616 2.92637 6.61358C3.09825 5.33517 3.42514 4.56445 3.9948 3.9948Z" fill="#00B38C" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M20.3708 3.46447C18.9063 2 16.5493 2 11.8352 2C7.12119 2 4.76417 2 3.2997 3.46447C2.54222 4.22195 2.17653 5.21824 2 6.65598C2.53066 6.06532 3.16829 5.57328 3.8843 5.20846C4.66578 4.81027 5.50258 4.6488 6.4291 4.5731C7.32423 4.49997 8.42564 4.49998 9.7724 4.5H13.8981C15.2448 4.49998 16.3462 4.49997 17.2414 4.5731C18.1679 4.6488 19.0047 4.81027 19.7862 5.20846C20.5022 5.57328 21.1398 6.06532 21.6705 6.65598C21.4939 5.21824 21.1283 4.22195 20.3708 3.46447Z" fill="#808080" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2 14.6562C2 11.856 2 10.4559 2.54497 9.3863C3.02433 8.44549 3.78924 7.68058 4.73005 7.20122C5.79961 6.65625 7.19974 6.65625 10 6.65625H14C16.8003 6.65625 18.2004 6.65625 19.27 7.20122C20.2108 7.68058 20.9757 8.44549 21.455 9.3863C22 10.4559 22 11.856 22 14.6562C22 17.4565 22 18.8566 21.455 19.9262C20.9757 20.867 20.2108 21.6319 19.27 22.1113C18.2004 22.6562 16.8003 22.6562 14 22.6562H10C7.19974 22.6562 5.79961 22.6562 4.73005 22.1113C3.78924 21.6319 3.02433 20.867 2.54497 19.9262C2 18.8566 2 17.4565 2 14.6562ZM12.5303 18.1866C12.3897 18.3272 12.1989 18.4062 12 18.4062C11.8011 18.4062 11.6103 18.3272 11.4697 18.1866L8.96967 15.6866C8.67678 15.3937 8.67678 14.9188 8.96967 14.6259C9.26256 14.333 9.73744 14.333 10.0303 14.6259L11.25 15.8456V11.6562C11.25 11.242 11.5858 10.9062 12 10.9062C12.4142 10.9062 12.75 11.242 12.75 11.6562V15.8456L13.9697 14.6259C14.2626 14.333 14.7374 14.333 15.0303 14.6259C15.3232 14.9188 15.3232 15.3937 15.0303 15.6866L12.5303 18.1866Z" fill="#808080" />
    </svg>
  )
}

function BentoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 4.63415C0 2.07478 2.07478 0 4.63415 0C7.19351 0 9.26829 2.07478 9.26829 4.63415C9.26829 7.19351 7.19351 9.26829 4.63415 9.26829C2.07478 9.26829 0 7.19351 0 4.63415Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.7317 15.3659C10.7317 12.8065 12.8065 10.7317 15.3659 10.7317C17.9252 10.7317 20 12.8065 20 15.3659C20 17.9252 17.9252 20 15.3659 20C12.8065 20 10.7317 17.9252 10.7317 15.3659Z" fill="currentColor"/>
      <path d="M0 15.5C0 13.3787 0 12.318 0.65901 11.659C1.31802 11 2.37868 11 4.5 11C6.62132 11 7.68198 11 8.34099 11.659C9 12.318 9 13.3787 9 15.5C9 17.6213 9 18.682 8.34099 19.341C7.68198 20 6.62132 20 4.5 20C2.37868 20 1.31802 20 0.65901 19.341C0 18.682 0 17.6213 0 15.5Z" fill="currentColor"/>
      <path d="M11 4.5C11 2.37868 11 1.31802 11.659 0.65901C12.318 0 13.3787 0 15.5 0C17.6213 0 18.682 0 19.341 0.65901C20 1.31802 20 2.37868 20 4.5C20 6.62132 20 7.68198 19.341 8.34099C18.682 9 17.6213 9 15.5 9C13.3787 9 12.318 9 11.659 8.34099C11 7.68198 11 6.62132 11 4.5Z" fill="currentColor"/>
    </svg>
  )
}

function ReferralLinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.46447 18.5355C2.92893 20 5.28595 20 10 20C14.714 20 17.0711 20 18.5355 18.5355C20 17.0711 20 14.714 20 10C20 5.28595 20 2.92893 18.5355 1.46447C17.0711 0 14.714 0 10 0C5.28595 0 2.92893 0 1.46447 1.46447C0 2.92893 0 5.28595 0 10C0 14.714 0 17.0711 1.46447 18.5355ZM7.5 6.75C5.70507 6.75 4.25 8.20507 4.25 10C4.25 11.7949 5.70507 13.25 7.5 13.25C9.29493 13.25 10.75 11.7949 10.75 10C10.75 9.58579 11.0858 9.25 11.5 9.25C11.9142 9.25 12.25 9.58579 12.25 10C12.25 12.6234 10.1234 14.75 7.5 14.75C4.87665 14.75 2.75 12.6234 2.75 10C2.75 7.37665 4.87665 5.25 7.5 5.25C7.91421 5.25 8.25 5.58579 8.25 6C8.25 6.41421 7.91421 6.75 7.5 6.75ZM15.75 10C15.75 11.7949 14.2949 13.25 12.5 13.25C12.0858 13.25 11.75 13.5858 11.75 14C11.75 14.4142 12.0858 14.75 12.5 14.75C15.1234 14.75 17.25 12.6234 17.25 10C17.25 7.37665 15.1234 5.25 12.5 5.25C9.87665 5.25 7.75 7.37665 7.75 10C7.75 10.4142 8.08579 10.75 8.5 10.75C8.91421 10.75 9.25 10.4142 9.25 10C9.25 8.20507 10.7051 6.75 12.5 6.75C14.2949 6.75 15.75 8.20507 15.75 10Z" fill="#00B38C"/>
    </svg>
  )
}

function QRCodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.7718 1.30273H10.8163C11.3924 1.30273 11.8569 1.30273 12.2309 1.33828C12.6165 1.37495 12.9526 1.45262 13.2547 1.63778C13.5607 1.82526 13.8179 2.08248 14.0054 2.38842C14.1905 2.69057 14.2682 3.02659 14.3049 3.41226C14.3404 3.78623 14.3404 4.25079 14.3404 4.82683V4.87137C14.3404 5.24986 14.3404 5.56573 14.316 5.82228C14.2905 6.09049 14.2352 6.34044 14.0947 6.56969C13.9572 6.79404 13.7686 6.98267 13.5442 7.12016C13.315 7.26065 13.065 7.31598 12.7968 7.34148C12.5403 7.36587 12.2244 7.36587 11.8459 7.36586L11.1257 7.36586C10.581 7.36588 10.1267 7.36589 9.76609 7.31741C9.38545 7.26623 9.04179 7.15366 8.76564 6.8775C8.48948 6.60134 8.37691 6.25768 8.32573 5.87705C8.27725 5.51642 8.27726 5.06216 8.27728 4.5174L8.27728 3.79728C8.27727 3.41879 8.27726 3.10287 8.30166 2.84631C8.32716 2.57811 8.38249 2.32816 8.52298 2.0989C8.66046 1.87455 8.84909 1.68592 9.07345 1.54844C9.3027 1.40795 9.55265 1.35262 9.82086 1.32711C10.0774 1.30272 10.3933 1.30273 10.7718 1.30273ZM11.3088 5.09219C10.9963 5.09219 10.8401 5.09219 10.7298 5.01391C10.6908 4.98629 10.6568 4.9523 10.6292 4.91337C10.551 4.80304 10.551 4.6468 10.551 4.3343C10.551 4.02181 10.551 3.86555 10.6292 3.75523C10.6568 3.7163 10.6908 3.68231 10.7298 3.65469C10.8401 3.57641 10.9963 3.57641 11.3088 3.57641C11.6213 3.57641 11.7776 3.57641 11.8879 3.65469C11.9268 3.68231 11.9608 3.7163 11.9885 3.75523C12.0667 3.86555 12.0667 4.0218 12.0667 4.3343C12.0667 4.64679 12.0667 4.80304 11.9885 4.91337C11.9608 4.9523 11.9268 4.98629 11.8879 5.01391C11.7776 5.09219 11.6213 5.09219 11.3088 5.09219Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.57165 1.54844C6.34239 1.40795 6.09244 1.35262 5.82423 1.32711C5.56767 1.30272 5.25179 1.30273 4.87328 1.30273H4.82879C4.25276 1.30273 3.78818 1.30273 3.41421 1.33828C3.02854 1.37495 2.69253 1.45262 2.39037 1.63778C2.08443 1.82526 1.82721 2.08248 1.63974 2.38842C1.45457 2.69057 1.3769 3.02659 1.34024 3.41226C1.30468 3.78623 1.30468 4.25078 1.30469 4.8268V4.8713C1.30468 5.24981 1.30467 5.56572 1.32907 5.82228C1.35457 6.09049 1.4099 6.34044 1.55039 6.56969C1.68787 6.79404 1.8765 6.98267 2.10085 7.12016C2.33011 7.26065 2.58006 7.31598 2.84827 7.34148C3.10481 7.36587 3.42067 7.36587 3.79914 7.36586L4.51935 7.36586C5.0641 7.36588 5.51838 7.36589 5.879 7.31741C6.25964 7.26623 6.6033 7.15366 6.87945 6.8775C7.15561 6.60134 7.26818 6.25768 7.31936 5.87705C7.36784 5.51643 7.36783 5.06217 7.36781 4.51742L7.36781 3.79729C7.36782 3.41881 7.36783 3.10286 7.34343 2.84631C7.31793 2.57811 7.2626 2.32816 7.12211 2.0989C6.98463 1.87455 6.796 1.68592 6.57165 1.54844ZM3.75718 5.01391C3.8675 5.09219 4.02375 5.09219 4.33625 5.09219C4.64875 5.09219 4.805 5.09219 4.91532 5.01391C4.95425 4.98629 4.98824 4.9523 5.01586 4.91337C5.09414 4.80304 5.09414 4.64679 5.09414 4.3343C5.09414 4.0218 5.09414 3.86555 5.01586 3.75523C4.98824 3.7163 4.95425 3.68231 4.91532 3.65469C4.805 3.57641 4.64875 3.57641 4.33625 3.57641C4.02375 3.57641 3.8675 3.57641 3.75718 3.65469C3.71825 3.68231 3.68426 3.7163 3.65664 3.75523C3.57836 3.86555 3.57836 4.0218 3.57836 4.3343C3.57836 4.64679 3.57836 4.80304 3.65664 4.91337C3.68426 4.9523 3.71825 4.98629 3.75718 5.01391Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.879 8.32378C6.25964 8.37495 6.6033 8.48753 6.87945 8.76368C7.15561 9.03984 7.26818 9.3835 7.31936 9.76414C7.36784 10.1248 7.36783 10.579 7.36781 11.1238L7.36781 11.8439C7.36782 12.2224 7.36783 12.5383 7.34343 12.7949C7.31793 13.0631 7.2626 13.313 7.12211 13.5423C6.98463 13.7666 6.796 13.9553 6.57165 14.0927C6.34239 14.2332 6.09244 14.2886 5.82423 14.3141C5.56768 14.3385 5.25175 14.3385 4.87326 14.3384H4.82878C4.25274 14.3385 3.78818 14.3385 3.41421 14.3029C3.02854 14.2662 2.69253 14.1886 2.39037 14.0034C2.08443 13.8159 1.82721 13.5587 1.63974 13.2528C1.45457 12.9506 1.3769 12.6146 1.34024 12.2289C1.30468 11.855 1.30468 11.3904 1.30469 10.8144V10.7699C1.30468 10.3914 1.30467 10.0755 1.32907 9.81891C1.35457 9.5507 1.4099 9.30075 1.55039 9.07149C1.68787 8.84714 1.8765 8.65851 2.10085 8.52103C2.33011 8.38054 2.58006 8.32521 2.84827 8.29971C3.10482 8.27531 3.42069 8.27532 3.79918 8.27533L4.51936 8.27533C5.06412 8.27531 5.51838 8.27529 5.879 8.32378ZM4.33625 12.0648C4.02375 12.0648 3.8675 12.0648 3.75718 11.9865C3.71825 11.9589 3.68426 11.9249 3.65664 11.886C3.57836 11.7756 3.57836 11.6194 3.57836 11.3069C3.57836 10.9944 3.57836 10.8381 3.65664 10.7278C3.68426 10.6889 3.71825 10.6549 3.75718 10.6273C3.8675 10.549 4.02375 10.549 4.33624 10.549C4.64873 10.549 4.805 10.549 4.91532 10.6273C4.95425 10.6549 4.98824 10.6889 5.01586 10.7278C5.09414 10.8381 5.09414 10.9944 5.09414 11.3069C5.09414 11.6194 5.09414 11.7756 5.01586 11.886C4.98824 11.9249 4.95425 11.9589 4.91532 11.9865C4.805 12.0648 4.64875 12.0648 4.33625 12.0648Z" fill="white"/>
      <path d="M8.27728 10.8289V10.8522H9.18675C9.18675 10.4169 9.1873 10.1247 9.20996 9.90196C9.23185 9.68679 9.27054 9.58738 9.31448 9.52162C9.36977 9.43887 9.44082 9.36782 9.52358 9.31252C9.58933 9.26858 9.68875 9.22989 9.90391 9.208C10.1267 9.18534 10.4189 9.18479 10.8541 9.18479H12.0667V8.27533H10.8308C10.4249 8.27531 10.0861 8.27531 9.81187 8.30321C9.52479 8.33241 9.2584 8.3959 9.0183 8.55633C8.83624 8.67797 8.67993 8.83429 8.55828 9.01635C8.39785 9.25645 8.33436 9.52284 8.30516 9.80991C8.27726 10.0842 8.27727 10.4229 8.27728 10.8289Z" fill="white"/>
      <path d="M14.3404 12.0801V12.0648H13.4309C13.4309 12.3535 13.4307 12.5473 13.4204 12.6973C13.4105 12.8433 13.3926 12.9143 13.3732 12.9611C13.2963 13.1468 13.1488 13.2944 12.9631 13.3713C12.9163 13.3907 12.8452 13.4085 12.6993 13.4185C12.5492 13.4287 12.3555 13.429 12.0667 13.429H10.8541V14.3384H12.082C12.3515 14.3385 12.5765 14.3385 12.7612 14.3259C12.9534 14.3127 13.135 14.2845 13.3111 14.2115C13.7197 14.0423 14.0443 13.7177 14.2135 13.3092C14.2864 13.1331 14.3147 12.9515 14.3278 12.7592C14.3404 12.5745 14.3404 12.3496 14.3404 12.0801Z" fill="white"/>
      <path d="M9.18675 13.8837C9.18675 14.1349 8.98316 14.3384 8.73201 14.3384C8.48087 14.3384 8.27728 14.1349 8.27728 13.8837V12.0648H9.18675V13.8837Z" fill="white"/>
      <path d="M13.8857 8.27533C13.6345 8.27533 13.4309 8.47892 13.4309 8.73006V10.8522H14.3404V8.73006C14.3404 8.47892 14.1368 8.27533 13.8857 8.27533Z" fill="white"/>
      <path d="M10.4793 10.8301C10.4297 10.9499 10.4297 11.1017 10.4297 11.4054C10.4297 11.7091 10.4297 11.861 10.4793 11.9807C10.5455 12.1404 10.6723 12.2673 10.832 12.3335C10.9518 12.3831 11.1037 12.3831 11.4074 12.3831C11.7111 12.3831 11.8629 12.3831 11.9827 12.3335C12.1424 12.2673 12.2693 12.1404 12.3354 11.9807C12.385 11.861 12.385 11.7091 12.385 11.4054C12.385 11.1017 12.385 10.9499 12.3354 10.8301C12.2693 10.6704 12.1424 10.5435 11.9827 10.4773C11.8629 10.4277 11.7111 10.4277 11.4074 10.4277C11.1037 10.4277 10.9518 10.4277 10.832 10.4773C10.6723 10.5435 10.5455 10.6704 10.4793 10.8301Z" fill="white"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.99662 3.47535C8.99662 2.27545 9.97375 1.30273 11.1791 1.30273C12.3845 1.30273 13.3616 2.27545 13.3616 3.47535C13.3616 4.67526 12.3845 5.64797 11.1791 5.64797C10.5705 5.64797 10.0204 5.39983 9.62498 5.00062L6.60367 7.05771C6.63161 7.1965 6.64624 7.33987 6.64624 7.48634C6.64624 7.7764 6.58893 8.05365 6.485 8.30706L9.79786 10.4837C10.1738 10.1775 10.655 9.99321 11.1791 9.99321C12.3845 9.99321 13.3616 10.9659 13.3616 12.1658C13.3616 13.3657 12.3845 14.3384 11.1791 14.3384C9.97375 14.3384 8.99662 13.3657 8.99662 12.1658C8.99662 11.8515 9.06389 11.5524 9.18478 11.2823L5.89871 9.12331C5.51538 9.45647 5.01328 9.65896 4.46374 9.65896C3.25839 9.65896 2.28125 8.68625 2.28125 7.48634C2.28125 6.28644 3.25839 5.31372 4.46374 5.31372C5.15687 5.31372 5.77386 5.63532 6.17335 6.13584L9.10149 4.14219C9.03337 3.93177 8.99662 3.70756 8.99662 3.47535Z" fill="white"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M7.84511 1.0293H5.84008C4.93171 1.02929 4.2122 1.02928 3.64911 1.10529C3.0696 1.18352 2.60055 1.34834 2.23064 1.71973C1.86074 2.09112 1.69657 2.56206 1.61866 3.1439C1.54296 3.70925 1.54296 4.43164 1.54297 5.34366V8.34929C1.54297 9.12579 2.01663 9.79122 2.6897 10.0702C2.65505 9.60194 2.65508 8.94491 2.65511 8.3983L2.65511 5.86794L2.65511 5.81893C2.65507 5.15903 2.65504 4.59044 2.71601 4.13512C2.78136 3.64714 2.92871 3.1794 3.30659 2.8C3.68447 2.42061 4.15035 2.27266 4.63636 2.20705C5.08987 2.14584 5.65618 2.14587 6.31345 2.1459L6.36225 2.14591H7.84511L7.89392 2.1459C8.55119 2.14587 9.11627 2.14584 9.56977 2.20705C9.29847 1.5173 8.62855 1.0293 7.84511 1.0293Z" fill="white"/>
      <path d="M5.24609 6.92684C5.24609 5.52318 5.24609 4.82134 5.68041 4.38528C6.11473 3.94922 6.81376 3.94922 8.21181 3.94922H9.69466C11.0927 3.94922 11.7917 3.94922 12.2261 4.38528C12.6604 4.82134 12.6604 5.52318 12.6604 6.92684V9.4082C12.6604 10.8119 12.6604 11.5137 12.2261 11.9498C11.7917 12.3858 11.0927 12.3858 9.69466 12.3858H8.21181C6.81376 12.3858 6.11473 12.3858 5.68041 11.9498C5.24609 11.5137 5.24609 10.8119 5.24609 9.4082V6.92684Z" fill="white"/>
    </svg>
  )
}

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center px-3 h-[24px] rounded-[30px] border-[1.16px] border-[#303030] bg-gfx-dark text-xs font-acid text-white leading-[18.8px]">
      {label}
    </span>
  )
}

function DownloadButton() {
  return (
    <button type="button" className="flex items-center gap-[10px] px-[19px] py-[10px] rounded-[60px] border border-[#303030] cursor-pointer hover:border-gfx-green-200 transition-colors">
      <DownloadIcon />
      <span className="text-sm font-acid text-white leading-[18.8px]">Download</span>
    </button>
  )
}

const GRID_COLS = 'grid-cols-[3rem_minmax(8rem,1.2fr)_minmax(5rem,0.8fr)_minmax(12rem,2fr)_minmax(8rem,1fr)]'

export default function MarketingPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [search, setSearch] = useState('')

  const breadcrumbItems = [
    { label: 'Marketing', current: true },
  ]

  const filtered = MATERIALS.filter(m =>
    !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none -top-[30%] bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

      <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6 pb-30 flex flex-col gap-4 3xl:gap-6 4xl:gap-8">
        <TopBar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(v => !v)}
          breadcrumbItems={breadcrumbItems}
        />

        <h1 className="text-5xl font-acid text-white pb-15">Partner Marketing Tools</h1>

        <div className="w-full lg:w-5xl mx-auto flex flex-col gap-8">
          <div className="w-sm">
            <ModeToggle options={TABS} activeIndex={activeTabIndex} onChange={setActiveTabIndex} size="sm" />
          </div>

        {activeTabIndex === 1 ? (
          <GlassCard variant="light" divider="none" rounded="19px" className="w-full overflow-hidden" style={{ background: 'var(--color-gfx-green-800)', boxShadow: '0px 4.641px 23.204px rgba(0,0,0,0.03)' }}>
            <div className="flex flex-col items-center justify-center h-[23.75rem]">
              <div className="flex items-center justify-center w-[3.375rem] h-[3.375rem] rounded-full bg-gfx-green-900 text-gfx-green-300">
                <BentoIcon />
              </div>
              <h2 className="mt-7 text-2xl font-acid text-white">Landing pages coming soon</h2>
              <p className="mt-4 text-base font-acid text-gfx-neutral-400 text-center max-w-[22.625rem] leading-[1.2]">
                Custom branded landing pages to convert your audience into traders. Stay tuned!
              </p>
            </div>
          </GlassCard>
        ) : activeTabIndex === 2 ? (
          <GlassCard variant="light" divider="none" rounded="19px" className="w-full overflow-hidden" style={{ background: 'var(--color-gfx-green-800)', boxShadow: '0px 4.641px 23.204px rgba(0,0,0,0.03)' }}>
            <div className="relative">
              <div className="absolute top-0 left-[14%] right-0 h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />
              <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-green-200 [filter:blur(157px)]" aria-hidden="true" />

              <div className="flex flex-col lg:flex-row gap-6 p-[3.3rem_3.3rem_3.3rem_3.3rem]">
                <div className="flex flex-col gap-5 flex-1 min-w-0 justify-center">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-[2.625rem] h-[2.625rem] rounded-[0.73rem] bg-gfx-green-900 shrink-0">
                      <ReferralLinkIcon />
                    </div>
                    <h2 className="text-2xl font-acid text-white">Referral Link</h2>
                  </div>
                  <p className="text-sm font-acid leading-[18.8px] max-w-[27.4rem]">
                    <span className="text-gfx-neutral-400">Earn multi-level commissions from your referral network up to </span>
                    <span className="text-gfx-green-300">10 levels deep.</span>
                    <span className="text-gfx-neutral-400"> Commission rates vary by asset class (Forex, Crypto, Metals, Indices) and account type. Share your links to build your trading community and generate passive income from every trade your network makes</span>
                  </p>
                </div>

                <GlassCard variant="light" divider="none" rounded="1.16rem" className="w-full lg:w-[31.8rem] shrink-0 overflow-hidden" style={{ background: '#0C1311', boxShadow: '0px 4.641px 23.204px rgba(0,0,0,0.03)' }}>
                  <div className="p-[2.5rem_2.6rem] flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center h-7 px-[1.125rem] rounded-[30px] bg-[#0C1311] border-[1.16px] border-[#064B34]">
                        <span className="text-xs font-acid text-[#00B38C] leading-[18.8px]">GFX605D9D38</span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        <button className="flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-full bg-[#09241C] cursor-pointer hover:opacity-80 transition-opacity">
                          <QRCodeIcon />
                        </button>
                        <button className="flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-full bg-[#09241C] cursor-pointer hover:opacity-80 transition-opacity">
                          <ShareIcon />
                        </button>
                        <button className="flex items-center justify-center w-[2.125rem] h-[2.125rem] rounded-full bg-[#09241C] cursor-pointer hover:opacity-80 transition-opacity">
                          <CopyIcon />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center h-[2.875rem] px-4 rounded-[2.5rem] border border-[#064B34] bg-[#0C1311]">
                      <span className="text-xs font-acid text-[#808080] leading-[18.8px] truncate">https://dashboard.genesisfxmarkets.com/a</span>
                    </div>

                    <SparkleButton fullWidth>View Comission Rates</SparkleButton>
                  </div>
                </GlassCard>
              </div>
            </div>
          </GlassCard>
        ) : (
          <GlassCard variant="light" divider="none" rounded="19px" className="w-full overflow-hidden">
            <div className="relative">
              <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[6.25rem]" />

              <div className="absolute w-[493px] h-[278px] left-1/2 -translate-x-1/2 -top-[207px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-157)] will-change-transform" aria-hidden="true" />

              <div className="absolute top-0 left-[10%] right-[10%] h-[1.16px]" style={{ background: 'linear-gradient(90deg, rgba(0,240,160,0) 0%, rgba(0,240,160,0.3) 50%, rgba(0,240,160,0) 100%)' }} />

              <div className="px-6 pt-6 pb-4 flex flex-col gap-4">
                <h2 className="text-base font-acid font-medium text-white leading-[24.44px]">Marketing Materials Library</h2>
                <SearchInput placeholder="Search materials..." value={search} onChange={setSearch} className="w-full max-w-[417px]" />
              </div>

              <div className="overflow-x-auto">
                <div className="border-b border-[#09241C] h-[40px] flex items-center px-6 min-w-[48rem]">
                  <div className={`grid ${GRID_COLS} w-full items-center`}>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Type</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Title</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Category</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Description</span>
                    <span className="text-xs font-acid font-bold uppercase tracking-[2.32px] text-[#606060] leading-[15.68px]">Action</span>
                  </div>
                </div>

                {filtered.map((item, i) => (
                  <div key={i} className="border-b border-[#09241C] last:border-b-0 h-[76px] flex items-center px-6 min-w-[48rem]">
                    <div className={`grid ${GRID_COLS} w-full items-center`}>
                      <div>
                        <GalleryIcon />
                      </div>
                      <span className="text-sm font-acid text-white leading-[18.8px]">{item.title}</span>
                      <div>
                        <CategoryBadge label={item.category} />
                      </div>
                      <span className="text-sm font-acid text-white leading-[18.8px]">{item.description}</span>
                      <div>
                        <DownloadButton />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        )}
        </div>
      </div>
    </>
  )
}
