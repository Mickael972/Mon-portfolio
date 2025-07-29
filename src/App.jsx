import { BrowserRouter } from "react-router-dom"
import { About, Contact, Documents, Hero, Navbar, StarsCanvas, Tech, Works } from "./components"

const App = () => {
  return (
    <BrowserRouter 
      basename="/Mon-portfolio"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Works />
        <Documents />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
