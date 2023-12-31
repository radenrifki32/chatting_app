import './globals.css'
import { Inter,Poppins} from 'next/font/google'
import Providers from '../lib/provider/provider'


const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={poppins.className}>
       <Providers>
        {children}
       </Providers>
      </body>
    </html>

  )
}
