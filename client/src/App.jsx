import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Mainlayot";
import EditContact from "./Components/EditContact";
import AddContacts from "./Components/AddContact";
import AllContacts from "./Components/AllContact";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<AddContacts/>} />
          <Route path='/allcontact' element={<AllContacts />} />
          <Route path='/update/:id' element={<EditContact/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
