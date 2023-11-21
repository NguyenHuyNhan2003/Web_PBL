import React, { useState } from 'react'
import { Link as RouterLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../Page/Home/index.jsx'
import Recruitment from '../Page/Recruitment/index.jsx'
import Analisic from '../Page/AnaLitic/index.jsx'
import Detail from '../Page/Detail_Recruitment/detail'
import './index.css'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react'
import { AcmeLogo } from './AcmeLogo.jsx'
import Login from '../Login/index.jsx'
import { Admin } from '../Page/Admin/admin.jsx'

export default function Header() {
  const [activeItem, setActiveItem] = useState('Features')
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [isLoggedout, setLoggedout] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const user = {
    name: 'Jason Hughes',
    email: 'zoey@example.com',
    avatarSrc: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  }

  const handleItemClick = (itemName) => {
    setActiveItem(itemName)
  }

  const handleLogout = () => {
    setLoggedout(false)
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    setLoggedout(true)
    console.log('Successfully logged in!')
  }

  return (
    <Navbar style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>Ngô Đình Phước</p>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <RouterLink
            to='/Home'
            className={`text-${activeItem === 'Features' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Features')}
          >
            Home
          </RouterLink>
        </NavbarItem>

        <NavbarItem>
          <RouterLink
            to='/Analytics'
            className={`text-${activeItem === 'Customers' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Customers')}
          >
            Analytics
          </RouterLink>
        </NavbarItem>

        <NavbarItem>
          <RouterLink
            to='/Recruitment'
            className={`text-${activeItem === 'Integrations' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Integrations')}
          >
            Recruitment
          </RouterLink>
        </NavbarItem>

        <NavbarItem>
          <RouterLink
            to='/Admin'
            className={`text-${activeItem === 'Admin' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Integrations')}
          >
            Admin
          </RouterLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as='div' justify='end'>
        {isLoggedout ? (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <div className='flex items-center'>
                <Avatar
                  isBordered
                  as='button'
                  className='transition-transform'
                  color='secondary'
                  name={user.name}
                  size='sm'
                  src={user.avatarSrc}
                />
                <p className='ml-2 font-semibold text-inherit'>{user.name}</p>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{user.email}</p>
              </DropdownItem>
              <DropdownItem key='logout' color='danger' onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <Login handleSubmit={handleSubmit} />
            <Button variant='outlined' color='accent' onClick={openModal}>
              Sign Up
            </Button>
     
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

// <Route path='/Home' element={<Home />} />
// {isModalOpen && (
//   <div className='modal'>
//     <div className='modal-content'>
//       <span className='close' onClick={closeModal}>
//         &times;
//       </span>
//       <form id='loginForm'>
//         <label>
//           Username:
//           <input type='text' name='username' />
//         </label>
//         <label>
//           Password:
//           <input type='password' name='password' />
//         </label>
//         <button type='submit' onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   </div>
// )}