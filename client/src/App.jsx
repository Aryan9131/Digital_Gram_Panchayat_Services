import './App.css'
import { Route, Router, Routes, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { AdminLayout } from './components/AdminLayout'
import { AdminPage } from './components/AdminPage'
import Rehydrate from './components/RehydrateUser';
import { ServiceDetails } from './components/ServiceDetails'
import { CreateService } from './components/CreateService'
import { UpdateService } from './components/UpdateService'
import { StaffLayout } from './components/StaffLayout'
import { StaffPage } from './components/StaffPage'
import { UserPage } from './components/UserPage'
import { Layout } from './components/Layout'
import { ApplicationForm } from './components/ApplicationForm'
import { useSelector } from 'react-redux'
import { ApplicationDetail } from './components/ApplicationDetail'
import { ServiceApplicationList } from './components/ServiceApplicationList'
import { UserApplications } from './components/UserApplications'
import { UserProfile } from './components/UserProfile'
function App() {
  const [count, setCount] = useState(0)
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <Rehydrate>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Layout />} >
               <Route path="/profile" element={<UserProfile />} />    
            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="" element={<AdminPage />} />
              <Route path="service-details/:id" element={<ServiceDetails />} />
              <Route path="create-service" element={<CreateService />} />
              <Route path="update-service/:id" element={<UpdateService />} />
              <Route path="service/:id/applications" element={<ServiceApplicationList />} />
            </Route>
            {/* Staff Routes */}
            <Route path="/staff">
              <Route path="" element={<StaffPage />} />
              <Route path="service-details/:id" element={<ServiceDetails />} />
              <Route path="service/:id/applications" element={<ServiceApplicationList />} />
              <Route path="application/:id" element={<ApplicationDetail />} />
            </Route>
            {/* Staff Routes */}
            <Route path="/user">
              <Route path="" element={<UserPage />} />
              <Route path="create-application/:id" element={<ApplicationForm />} />
              <Route path="service-details/:id" element={<ServiceDetails />} />
              <Route path="application/:id" element={<ApplicationDetail />} />
              <Route path=":id/applications" element={<UserApplications />} />
            </Route>
          </Route>
        </Routes>
      </Rehydrate>
    </>
  )
}

export default App
