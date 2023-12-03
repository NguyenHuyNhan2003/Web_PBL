import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import './index,css'
import { useLogout } from '../../hook/useLogout'
import { useAuthContext } from '../../hook/useAuthContext.jsx'
export default function App() {
  const {user} = useAuthContext();

  const {logout} = useLogout();
  // function hanldleclick(){
  //   console.log("Đã log out ");
  //   logout();
  // }
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
    
     
          <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/Login' className='navbar-link'>Login</Link>
            </NavbarItem>

        <NavbarItem>
          <Link href='/SignUp' className='navbar-link'>Sign Up</Link>
        </NavbarItem>
        </NavbarContent>
      
        
      </NavbarContent>
    </Navbar>
  )
}
  // <Button as={Link} color='primary' href='#' variant='flat'>
          //   Sign Up
          // </Button>