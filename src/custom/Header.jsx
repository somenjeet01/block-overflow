import { NavLink ,useLocation} from 'react-router-dom';
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Wallet, Loader2 } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import logo from "../assets/blockoverflow_logo.png"
import { Button } from "@/components/ui/button"


function Header() {
  const { account, connectWallet, loading } = useWallet();
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
      className={`sticky top-0 z-40 w-full transition-all duration-300 font-Barlow ${scrolled ? "glass" : "bg-transparent py-5"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-auto" alt="BlockOverflow Logo" />
          <h1 className="text-xl font-medium lowercase tracking-tight text-[#4541c1]">
            BlockOverflow
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {[{ path: "/", label: "Questions" }, { path: "/answer", label: "Answer" }, { path: "/manage", label: "Manage" }].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-base font-medium ${isActive ? "text-[#8897f1]" : "text-gray-600 hover:text-[#4541c1]"} transition-colors duration-200 relative group`
              }
            >
              {item.label}
              <motion.span
                layoutId="activeNav"
                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.span>
            </NavLink>
          ))}
        </nav>

        {/* Connect Wallet Button */}
        <div className="hidden md:block">
          <Button onClick={connectWallet} disabled={loading} className="relative overflow-hidden group px-4 py-2 bg-[#5150db] text-white rounded-lg hover:bg-[#4541c1] transition-all duration-200">
            <span className="relative z-10">
              {loading ? "Connecting..." : account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
            </span>
            <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
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
  );
}

export default Header;