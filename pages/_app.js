import Header from "../components/Header"
import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Footer from "../components/Footer"
import { StateContext } from "../context/StateContext"
import { Toaster } from "react-hot-toast"
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <StateContext>
        <Header />
        <Toaster />
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </StateContext>
      <Footer />
    </SessionProvider>
  )
}

export default MyApp
