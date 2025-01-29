import { AppProvider } from "../components/menu/AppContext";
import "./globals.css";
//import Header from '../components/layout/Header';
import { DM_Sans } from 'next/font/google'; // Importar fuente DM Sans
import Whatsapp from '../components/icons/Whatsapp'
//import Footer from '../components/layout/Footer'
import { Suspense } from 'react'
import { Analytics } from "@vercel/analytics/react"
import TabTitleChanger from '../components/Title'
 
const dmSans = DM_Sans({ subsets: ['latin'] }); // Configurar la fuente

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${dmSans.className}`}> {/* Aplicar fuente */}
        <TabTitleChanger />
        <AppProvider>
          <Whatsapp />
          <Suspense fallback={<div>Cargando...</div>}>
            {children}
            <Analytics />
          </Suspense>
        </AppProvider>
      </body>
    </html>
  );
}
