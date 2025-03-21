import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

const Header = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = path => location.pathname === path

  return (
    <motion.header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative size-10 rounded-lg bg-primary flex items-center justify-center">
            <Wallet className="size-6 text-primary-foreground" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-background rounded-full border-2 border-primary"></div>
          </div>
          <Link to="/" className="text-xl font-display font-bold">
            Wallet Journal
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          {[
            { path: "/", label: "Questions" },
            { path: "/answer", label: "Answer" },
            { path: "/manage", label: "Manage" }
          ].map(item => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                className="relative group"
                size="sm"
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button className="relative overflow-hidden group">
            <span className="relative z-10">Connect Wallet</span>
            <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>

        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </motion.header>
  )
}

export default Header
