import { NavLink } from 'react-router-dom';
import { Wallet, Loader2 } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import logo from "../assets/blockoverflow_logo.png"

function Header() {
  const { account, connectWallet, loading } = useWallet();

  return (
    <nav className="bg-[#eff4fe] font-Barlow" style={{fontFamily: "Barlow"}}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className='flex items-center gap-1 '>
        <img src={logo} className='w-8 h-auto' />
        <h1 className="text-xl font-medium lowercase tracking-tight self-end text-[#4541c1]">BlockOverflow</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `text-base font-medium ${isActive ? 'text-[#8897f1]' : 'text-gray-600 hover:text-[#4541c1]'} transition-colors duration-200`
              }
            >
              Questions
            </NavLink>
            <NavLink
              to="/answer"
              className={({ isActive }) => 
                `text-base font-medium ${isActive ? 'text-[#8897f1]' : 'text-gray-600 hover:text-[#4541c1]'} transition-colors duration-200`
              }
            >
              Answer
            </NavLink>
            <NavLink
              to="/manage"
              className={({ isActive }) => 
                `text-base font-medium ${isActive ? 'text-[#8897f1]' : 'text-gray-600 hover:text-[#4541c1]'} transition-colors duration-200`
              }
            >
              Manage
            </NavLink>
          </div>
          <button
            onClick={connectWallet}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-[#5150db] cursor-pointer text-white rounded-lg hover:bg-[#4541c1] disabled:bg-indigo-400 transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <Wallet className="h-5 w-5 mr-2" />
            )}
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;