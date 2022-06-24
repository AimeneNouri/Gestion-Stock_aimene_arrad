import React from 'react'
import Sidebar from '../components/respo/sidebar/sidebar'
import { Routes, Route } from 'react-router-dom'


import HomeRespo from '../views/respo/Home'
import Clients from '../views/respo/Clients'
import Commandes from '../views/respo/Commandes'
import Articles from '../views/respo/Articles'
import Fournisseurs from '../views/respo/Fournisseurs'
import Categories from '../views/respo/Categories'
import EditArticle from '../views/respo/EditArticle'
import ViewSearchArticles from '../views/respo/ViewSearchArticles'
import EditCategory from '../views/respo/EditCategory'
import EditClient from '../views/respo/EditClient'
import EditFournisseurs from '../views/respo/EditFournisseurs'
import EditCommande from '../views/respo/EditCommande'
import Navbar from '../components/respo/navbar/navbar'

const Respo = () => {
  return (
    <div>
        <Sidebar />
        <div className="main">
        {/* <Navbar/> */}
        <Routes>
                <Route path='/' element={<HomeRespo />} />
                <Route path='/commandes' element={<Commandes />} />
                <Route path='/clients' element={<Clients />} />
                <Route path='/suppliers' element={<Fournisseurs />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/articles' element={<Articles />} />
                <Route path='/articles/edit/:id' element={<EditArticle />} />
                <Route path='/articles/view/:name' element={<ViewSearchArticles />} />
                <Route path='/suppliers/edit/:id' element={<EditFournisseurs />} />
                <Route path='/categories/edit/:id' element={<EditCategory />} />
                <Route path='/clients/edit/:id' element={<EditClient />} />
                <Route path='/commandes/edit/:id' element={<EditCommande />} />
            </Routes>
        </div>
    </div>
  )
}

export default Respo