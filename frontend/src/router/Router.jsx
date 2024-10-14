import { useQuery } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router-dom'
import { getProfile } from 'services/user'

import Loader from 'components/modules/Loader'
import PageNotFound from 'src/pages/404'
import AdminPage from 'src/pages/AdminPage'
import AuthPage from 'src/pages/AuthPage'
import Dashboard from 'src/pages/Dashboard'
import HomePage from 'src/pages/HomePage'


function Router() {
    const {data , isLoading} = useQuery(["profile"], getProfile)
    console.log({data , isLoading})
if (isLoading) return <Loader />
    return (
    <Routes>
    <Route index element={<HomePage />} />
    <Route path="/dashboard" element={data ? <Dashboard /> : <Navigate to="/auth" />} />
    <Route path="/auth" element={ data ? <Navigate to="/dashboard"/> : <AuthPage /> } />
    <Route path="/admin" element={ data && data.data.role =="ADMIN"? <AdminPage /> : <Navigate to="/" /> } />
    <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default Router