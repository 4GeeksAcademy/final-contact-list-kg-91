import React, { useState } from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer'
import { useNavigate, useParams } from 'react-router-dom'

const EditContact = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { store, dispatch } = useGlobalReducer()
  const singleId = store.listContact.find(contacts => contacts.id === parseInt(id))

  const [editar, setEditar] = useState({
    name: singleId.name,
    phone: singleId.phone,
    email: singleId.email,
    address: singleId.address
  })
  function editContact() {
    fetch(`https://playground.4geeks.com/contact/agendas/karollguzman/contacts/${singleId.id}`, {
      method: "PUT",
      body: JSON.stringify(editar),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => { return response.json()})
      .then((data)=>{
        dispatch({         
          type: "save_contacts",
          payload: { contactos : data.contacts }
        })
      })
      .catch((err) => {return err})
  }

  console.log(singleId);

  return (
    <div className="container text-center mt-5" id="Create">
      <h1>Editar contacto</h1>
      <p><strong>Nombre completo</strong></p>
      <input className="input"
        value={editar.name}
        onChange={(e) => {
          setEditar({ ...editar, name: e.target.value })
        }}></input>
      <p><strong>Teléfono</strong></p>
      <input className="input"
        value={editar.phone}
        onChange={(e) => {
          setEditar({ ...editar, phone: e.target.value })
        }}></input>
      <p><strong>Correo</strong></p>
      <input className="input"
        value={editar.email}
        onChange={(e) => {
          setEditar({ ...editar, email: e.target.value })
        }}></input>
      <p><strong>Dirección</strong></p>
      <input className="input"
        value={editar.address}
        onChange={(e) => {
          setEditar({ ...editar, address: e.target.value })
        }}></input>
      <button className="btn btn-success mt-3"
        onClick={() => {
          return (
            editContact(),
            navigate("/")
          )
        }}>Guardar</button>
    </div>
  )
}

export default EditContact