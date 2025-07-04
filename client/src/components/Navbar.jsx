import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import userLogo from '../assets/user.jpg'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa"
import { LiaCommentSolid } from 'react-icons/lia'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@/redux/themeSlice'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi"

const Navbar = () => {
  const [openNav, setOpenNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(store => store.auth)
  const { theme } = useSelector(store => store.theme)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setOpenNav(false)
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    navigate('/login')
    toast.success("Logout successfully")
  }

  const toggleNav = () => setOpenNav(!openNav)

  return (
    <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>

        {/* Logo + Search */}
        <div className='flex gap-7 items-center'>
          <Link to='/'>
            <div className='flex gap-2 items-center'>
              <img src={logo} alt="Logo" className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
              <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
            </div>
          </Link>

          <form onSubmit={handleSearch} className='relative hidden md:block'>
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] pr-10"
            />
            <Button type="submit" className='absolute right-0 top-0'><Search /></Button>
          </form>
        </div>

        {/* Nav Menu */}
        <nav className='flex md:gap-7 gap-4 items-center'>
          <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <div className='flex gap-3 items-center'>
            <Button variant="outline" size="icon" onClick={() => dispatch(toggleTheme())}>
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer" title={user?.firstName || "User"}>
                    <AvatarImage src={user?.photoUrl || user?.logo || userLogo} />
                    <AvatarFallback>{user?.firstName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dark:bg-gray-800">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                      <User />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}>
                      <ChartColumnBig />
                      <span>Your Blog</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}>
                      <LiaCommentSolid />
                      <span>Comments</span>
                      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}>
                      <FaRegEdit />
                      <span>Write Blog</span>
                      <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex gap-2">
                <Button asChild><Link to="/login">Login</Link></Button>
                <Button asChild><Link to="/signup">Signup</Link></Button>
              </div>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          {openNav
            ? <HiMenuAlt3 onClick={toggleNav} className='w-7 h-7 md:hidden cursor-pointer' />
            : <HiMenuAlt1 onClick={toggleNav} className='w-7 h-7 md:hidden cursor-pointer' />
          }
        </nav>
      </div>

      {/* Mobile Nav Panel */}
      {openNav && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-white dark:bg-gray-900 shadow-md space-y-4">
          <form onSubmit={handleSearch} className='relative'>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 dark:bg-gray-800 w-full pr-10"
            />
            <Button type="submit" className="absolute right-0 top-0"><Search /></Button>
          </form>
          <ul className="space-y-3 text-lg font-semibold text-gray-800 dark:text-white">
            <li className="cursor-pointer hover:text-red-500 transition">
              <Link to="/" onClick={toggleNav}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-red-500 transition">
              <Link to="/blogs" onClick={toggleNav}>Blogs</Link>
            </li>
            <li className="cursor-pointer hover:text-red-500 transition">
              <Link to="/about" onClick={toggleNav}>About</Link>
            </li>

            {user ? (
              <li>
                <Button
                  variant="outline"
                  className="w-full text-gray-100 border-gray-500 bg hover:bg-gray-100 dark:hover:bg-red-800"
                  onClick={() => {
                    handleLogout()
                    toggleNav()
                  }}
                >
                  Logout
                </Button>

              </li>
            ) : (
              <>
                <li className="cursor-pointer hover:text-gray-500 transition">
                  <Link to="/login" onClick={toggleNav}>Login</Link>
                </li>
                <li className="cursor-pointer hover:text-red-500 transition">
                  <Link to="/signup" onClick={toggleNav}>Signup</Link>
                </li>
              </>
            )}
          </ul>

        </div>
      )}
    </div>
  )
}

export default Navbar
