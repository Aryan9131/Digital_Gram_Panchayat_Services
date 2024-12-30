import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import { useState } from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { AdminLayout } from './components/AdminLayout'
import { AdminPage } from './components/AdminPage'
import Rehydrate from './components/RehydrateUser';
import { ServiceDetails } from './components/ServiceDetails'
import { CreateService } from './components/CreateService'
import { UpdateService } from './components/UpdateService'
import {StaffLayout} from './components/StaffLayout'
import {StaffPage} from './components/StaffPage'
import { UserPage } from './components/UserPage'
import {UserLayout} from './components/UserLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Rehydrate>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminPage />} />
            <Route path="service-details/:id" element={<ServiceDetails />} />
            <Route path="create-service" element={<CreateService />} />
            <Route path="update-service/:id" element={<UpdateService />} />
          </Route>
          {/* Staff Routes */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route path="" element={<StaffPage />} />
            <Route path="service-details/:id" element={<ServiceDetails />} />
          </Route>
           {/* Staff Routes */}
           <Route path="/user" element={<UserLayout />}>
            <Route path="" element={<UserPage />} />
            <Route path="service-details/:id" element={<ServiceDetails />} />
          </Route>
        </Routes>
      </Rehydrate>
    </>
  )
}

export default App
