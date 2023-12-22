import React, { useState } from 'react'
import { Link as RouterLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../Page/Home/index.jsx'
import Recruitment from '../Page/Recruitment/index.jsx'
import Analisic from '../Page/AnaLitic/index.jsx'
import Detail from '../Page/Detail_Recruitment/detail'

import Drop from '../component/Dropdown_Custom/index.jsx';
import './index.css'
import { useLogout } from '../hook/useLogout.jsx'
import { useAuthContext } from '../hook/useAuthContext.jsx'
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
import { useNavigate } from 'react-router-dom'
export default function Header() {
  const [activeItem, setActiveItem] = useState('Features')

  // const user = {
  //   name: 'Jason Hughes',
  //   email: 'zoey@example.com',
  //   avatarSrc: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  // }

  const handleItemClick = (itemName) => {
    setActiveItem(itemName)
  }

  const { user } = useAuthContext()
// console.log(user.role);
  const { logout } = useLogout()
  const navigation = useNavigate();
  function hanldleclick() {
    console.log('Đã log out ')
    logout()
    navigation('/Login'); 
  }
  return (
    <Navbar style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>Việc Làm IT 24h</p>
      </NavbarBrand>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <RouterLink
            to='/Home'
            className={`text-${activeItem === 'Features' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Features')}
          >
            Trang Chủ
          </RouterLink>
        </NavbarItem>

   

        <NavbarItem>
          <RouterLink
            to='/Recruitment'
            className={`text-${activeItem === 'Integrations' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Integrations')}
          >
            Tuyển Dụng
          </RouterLink>
        </NavbarItem>


        <NavbarItem>
          <RouterLink
            to='/Recruitment'
            className={`text-${activeItem === 'Congti' ? 'active' : 'foreground'}`}
            onClick={() => handleItemClick('Congti')}
          >
            Công Ty
          </RouterLink>
        </NavbarItem>



        
      </NavbarContent>

      <NavbarContent justify='end'>
        {user && user.role =='user' &&(
          <div>
          <Drop email={user.email} hanldleclick={hanldleclick} />
        </div>
        )}
        {!user && (
          <NavbarContent justify='end'>
            <NavbarItem className='hidden lg:flex'>
              <Link href='/Login' className='navbar-link'>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href='/SignUp' className='navbar-link'>
                Sign Up
              </Link>
            </NavbarItem>
          </NavbarContent>
        )}
        {user && user.role =='admin' && (
          <NavbarContent justify='end'>
            <NavbarItem className='hidden lg:flex'>
              <Link href='/Login' className='navbar-link'>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href='/SignUp' className='navbar-link'>
                Sign Up
              </Link>
            </NavbarItem>
          </NavbarContent>
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



// <NavbarItem>
// <RouterLink
//   to='/Analytics'
//   className={`text-${activeItem === 'Customers' ? 'active' : 'foreground'}`}
//   onClick={() => handleItemClick('Customers')}
// >
//   Analytics
// </RouterLink>
// </NavbarItem>