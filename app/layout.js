import { Rubik } from 'next/font/google'
import './globals.css'
import './style.css'
import Head from 'next/head'
import ReactDOM from 'react-dom';

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
      <div id="mainLoader102" className="z-50 hidden fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 justify-center items-center h-screen">
            <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
        </h3>
        {children}

      </body>
    </html>

  )
}
