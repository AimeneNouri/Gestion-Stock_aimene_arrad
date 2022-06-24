import React from 'react'
import Sidebar from '../components/admin/sidebar/sidebar'
import { Routes, Route } from 'react-router-dom'
import HomeAdmin from '../views/admin/Home'
import AddCompte from '../views/admin/Add'
import DeleteCompte from '../views/admin/Delete'
import EditCompte from '../views/admin/Edit'
import EditId from '../views/admin/EditId'

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path='/' element={<HomeAdmin />} />
          <Route path='/add' element={<AddCompte />} />
          <Route path='/delete' element={<DeleteCompte />} />
          <Route path='/update' element={<EditCompte />} /> 
          <Route path='/update/:id' element={<EditId />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin

