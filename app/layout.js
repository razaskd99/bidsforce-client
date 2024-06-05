import { Rubik } from 'next/font/google'
import './globals.css'
import './style.css'
import Head from 'next/head'
import ReactDOM from 'react-dom';
import Image from 'next/image'
import NextTopLoader from 'nextjs-toploader';

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: 'Revolutionize Bid Management with BIDSFORCE | Streamlined Workflow & Collaboration',
  description: 'Discover how BIDSFORCE transforms bid management with streamlined workflows, real-time collaboration, and user-centric design. Seamlessly integrate CRM systems, ensure timely bid submissions, and make data-driven decisions. Explore our comprehensive solution!',
  keywords:"Bid Management, BIDSFORCE, Workflow Automation, Collaboration, CRM Integration, Timely Submissions, Data-Driven Decisions, Scalable Architecture, PERN Stack, Cloud Deployment, On-Premises Deployment, Project Management, Agile Development, Quality Assurance, System Architecture, Security Framework, Technical Approach, Development Timeline."
}

export default function RootLayout({ children }) {
  
  
  return (

    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${rubik.className} `} >
        <h3 className='z-50'>
    
          <div id="mainLoader102" className="z-50 hidden  fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-30 justify-center items-center h-screen">
              
            <section className="dots-ease-loader-main">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </section>

            </div>
          </h3>
          <NextTopLoader

          color="#2299DD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <section className="dots-ease-loader-main">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </section>'
          zIndex={1600}
          showAtBottom={true}
          
          />
        {children}

      </body>
    </html>

  )
}
