import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useGlobalReducer from '../hooks/useGlobalReducer'


const ContactList = () => {
  const [eliminarContacto, setEliminarContacto] = useState();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();


  function getAgendas() {
    fetch("https://playground.4geeks.com/contact/agendas/karollguzman/contacts")
      .then((response) => { return response.json() })
      .then((data) => {
        return (
          dispatch({
            type: "save_contacts",
            payload: { contactos: data.contacts }
          })
        )
      })
      .catch((err) => { return err })
  }
  function deleteContact(id) {
    fetch("https://playground.4geeks.com/contact/agendas/karollguzman/contacts/" + id, {
      method: "DELETE"
    })
      .then((response) => { return response })
      .then(() => {
        getAgendas()
      })
      .catch((err) => { return err })
  }
  useEffect(() => {
    getAgendas()
  }, [])
  return (
    <div className="container text-center" id="listContact">
      <h1>Lista de contactos</h1>
      <div className="lista">
        <ul>
          {(store.listContact || []).map((value, index, array) => {
            return (

              <span key={index}>
                <div className=" container contacto text-start">
                  <img className="foto" src={"https://picsum.photos/seed/${value.id}/200"} alt="Foto de contacto" />"
                  <div className="datos container mt-1">
                    <h1 className="nombre">{value.name}</h1>

                    <div className="container texto d-flex text-start">
                      <div className="icons">
                        <i className="fa-solid fa-phone" /><br />
                        <i className="fa-solid fa-envelope" /><br />
                        <i className="fa-solid fa-location-dot" />
                      </div>
                      {value.phone}<br />
                      {value.email}<br />
                      {value.address}
                    </div>
                  </div>
                  <button className="btn boton"
                    onClick={() => {
                      navigate(`/edit-contact/${value.id}`)
                    }}><i className="fa-solid fa-pencil" /></button>

                  <button type="button" className="btn boton" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => { setEliminarContacto(value) }}>
                    <i className="fa-solid fa-trash" />
                  </button>

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 fw-semibold" id="exampleModalLabel">¿Desea eliminar el contanto?</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          ¿Seguro que desea eliminar el contacto?
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, cancelar</button>
                          <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                            onClick={() => {
                              if (eliminarContacto) {
                                deleteContact(eliminarContacto.id);
                                navigate("/")
                              }
                            }}
                          >Sí, eliminar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            )
          })}
        </ul>
      </div>
      <Link to="/create-contact">
        <button className="btn btn-success"
        >Agregar contacto</button>
      </Link>

    </div>
  )
}

export default ContactList