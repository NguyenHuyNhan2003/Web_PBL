import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import './index,css'
import { useLogout } from '../../hook/useLogout'
import { useAuthContext } from '../../hook/useAuthContext.jsx'

import { useNavigate } from 'react-router-dom'
export default function App() {
  const navigation = useNavigate();
  const { user } = useAuthContext()

  const { logout } = useLogout()
  function hanldleclick() {
    console.log('Đã log out ')
    logout()
    navigation('/Login'); 
  }
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>Việc Làm 24h</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/Postadmin' className='navbar-link'>
            Bài Tuyển Dụng
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='/AddPost' aria-current='page' className='navbar-link'>
            Thêm Bài
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {user && user.role == 'admin' && (
          <div>
            <span>{user.email}</span>
            <button onClick={hanldleclick}>LOG OUT </button>
          </div>
        )}

        {!user && (
          <NavbarContent justify='end'>
            <NavbarItem className='hidden lg:flex'>
              <Link href='/Login' className='navbar-link'>
                Login
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}

        {user && user.role !== 'admin' && (
          <NavbarContent justify='end'>
            <NavbarItem className='hidden lg:flex'>
              <Link href='/Login' className='navbar-link'>
                Login
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
      </NavbarContent>
    </Navbar>
  )
}
// <NavbarItem>
// <Button as={Link} color='primary' href='#' variant='flat'>
//   Sign Up
// </Button>
// </NavbarItem>
