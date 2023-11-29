import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import './index,css'

export default function App() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>ACME</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/Postadmin' className='navbar-link'>
        
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='/AddPost' aria-current='page' className='navbar-link'>
        
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#' className='navbar-link'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
