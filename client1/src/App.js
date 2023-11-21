import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
// import Home from './Page/Home/index.jsx'
// import Recruitment from './Page/Recruitment/index.jsx'
import Analisic from './Page/AnaLitic/index.jsx'
// import Detail from './Page/Detail_Recruitment/detail'
import Header from './Header'
// import  Admin  from './Page/Admin/admin'
import { publicRouter } from './routers/index.js'

import Default from './Layout/DefaultLayout/index.jsx'
import AdminLayout from './Layout/AdminLayout/index.jsx'
import { Fragment } from 'react'
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
   
        <Routes>
          {publicRouter.map((route, index) => {
            var  Layout = Default ;
            if(route.Layout == "Admin"){
              Layout = AdminLayout;
            }
            const Page = route.commponent
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App

// <Header />

// <Routes>
// <Route path='/' element={<Home />} />

// <Route path='/Analytics' element={<Analisic />} />
// <Route path='/Recruitment' element={<Recruitment />} />
// <Route path='/Admin' element={<Admin />} />
// <Route path='/post/by/:id' element={<Detail/>} />
// </Routes>
// </Router>
