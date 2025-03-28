import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useWallet } from "../../context/WalletContext"
import { Menu, X, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const {
    wallet,
    balance,
    connectWallet,
    disconnectWallet,
    isConnecting
  } = useWallet()
  const location = useLocation()

  // Track scroll position to change header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { name: "Questions", path: "/" },
    { name: "Answers", path: "/answer" },
    { name: "Manage", path: "/manage" }
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "glass-navbar py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                Friendly Wallet
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-8">
              {navItems.map(item => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`interactive-element relative text-base font-medium ${
                      location.pathname === item.path
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="navigation-underline"
                        className="absolute left-0 right-0 bottom-[-4px] h-[2px] bg-primary"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pl-6 border-l border-gray-200/50">
              {wallet ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <Wallet className="w-4 h-4" />
                      <span className="font-medium text-sm">
                        {wallet.slice(0, 6)}...{wallet.slice(-4)}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2 border-b">
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="font-medium">{balance.toFixed(4)} ETH</p>
                    </div>
                    <DropdownMenuItem
                      onClick={disconnectWallet}
                      className="text-destructive focus:text-destructive"
                    >
                      Disconnect Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="btn-primary"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {wallet && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-2">
                    <Wallet className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-2 border-b">
                    <p className="text-xs text-muted-foreground">Wallet</p>
                    <p className="font-medium text-sm">
                      {wallet.slice(0, 6)}...{wallet.slice(-4)}
                    </p>
                  </div>
                  <div className="p-2 border-b">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="font-medium">{balance.toFixed(4)} ETH</p>
                  </div>
                  <DropdownMenuItem
                    onClick={disconnectWallet}
                    className="text-destructive focus:text-destructive"
                  >
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200"
        >
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              {navItems.map(item => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`block py-2 px-3 rounded-md ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {!wallet && (
                <li className="pt-2 border-t border-gray-200 mt-2">
                  <Button
                    onClick={connectWallet}
                    disabled={isConnecting}
                    className="w-full justify-center btn-primary"
                  >
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default Header
