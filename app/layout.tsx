import type { Metadata } from 'next';
import './globals.css';
import './brand-experience.css';
import './editorial.css';
import './lumi.css';
import './print-collection.css';
import { LumiAssistant } from '@/components/lumi-assistant';
import { Header, Footer } from '@/components/site-shell';
export const metadata: Metadata = {metadataBase:new URL('https://signads-brand-visibility.harshalp5.chatgpt.site'),title:{default:'SignAds — Your brand, out in the world.',template:'%s | SignAds'},description:'Print, signage and outdoor advertising for every place your customers see you. Explore the SignAds portfolio and tell us about your project.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/>{children}<Footer/><LumiAssistant/></body></html>}
