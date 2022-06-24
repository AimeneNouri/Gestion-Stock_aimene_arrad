import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
const Clients = () => {
  //add
  const initialClient = {
    id_Client: null,
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    city: "",
    phone: "",
    website: "",
  };
  const [client, SetClient] = useState(initialClient);

  function handleClientChange(e) {
    const { name, value } = e.target;
    SetClient({ ...client, [name]: value });
  }

  function submitClient() {
    let form_data = new FormData();
    form_data.append("firstname", client.firstname);
    form_data.append("lastname", client.lastname);
    form_data.append("address", client.address);
    form_data.append("email", client.email);
    form_data.append("city", client.city);
    form_data.append("phone", client.phone);
    form_data.append("website", client.website);

    axios.post("/api/clients/add", form_data).then((response) => {
      SetClient({
        id_Client: response.data.id_Client,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        address: response.data.address,
        email: response.data.email,
        city: response.data.city,
        phone: response.data.phone,
        website: response.data.website,
      });
      alert("client ajoute avec succees");
      window.location.reload();
    });
    SetClient(form_data);
  }

  //delete and Edit
  const [clients, setClients] = useState([]);

  async function fetchClients() {
    const { data } = await axios.get("/api/clients/all");
    setClients(data);
  }

  useEffect(() => {
    fetchClients();
  }, []);

  function deleteClient(id_Client) {
    axios.delete(`/api/clients/${id_Client}`).then((response) => fetchClients());
    alert("Le client № " + id_Client + " a ete supprimee avec succees");
    window.location.reload();
  }

  const Add = () => {
    document.querySelector(".Add").style.display = "block";
    document.querySelector(".Edit").style.display = "none";
    document.querySelector(".Delete").style.display = "none";
    document.querySelector(".views").style.display = "none";
  };

  const Edit = () => {
    document.querySelector(".Add").style.display = "none";
    document.querySelector(".Edit").style.display = "block";
    document.querySelector(".Delete").style.display = "none";
    document.querySelector(".views").style.display = "none";
  };

  const Delete = () => {
    document.querySelector(".Add").style.display = "none";
    document.querySelector(".Edit").style.display = "none";
    document.querySelector(".Delete").style.display = "block";
    document.querySelector(".views").style.display = "none";
  };

  
  const [show, setShow] = useState(false);
  const [id_ClientC, setid_Client] = useState();

  const handleOpen = (id_Client) => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(!show);
  };


  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greetingArticle">
            <h1>Clients</h1>
            <div className="buttons">
              <button
                type="button"
                className="ButtonStyle btn1 btn-outline btn-xl"
                onClick={Add}
                style={{ wid_Clientth: "80px" }}
              >
                Add
              </button>
              <button
                type="button"
                className="ButtonStyle btn1 btn-outline btn-xl"
                onClick={Edit}
              >
                Modifier
              </button>
              <button
                type="button"
                className="ButtonStyle btn1 btn_delete btn-xl"
                onClick={Delete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>

        {/* view all */}
        <div className="views">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="table-responsive">
                            <table
                              id="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "5%" }}>Prenom</th>
                                  <th style={{ width: "5%" }}>Nom</th>
                                  <th style={{ width: "15%" }}>Adresse</th>
                                  <th style={{ width: "5%" }}>Email</th>
                                  <th style={{ width: "5%" }}>Ville</th>
                                  <th style={{ width: "5%" }}>Telephone</th>
                                  <th style={{ width: "10%" }}>Site Web</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clients.map((client) => (
                                  <tr key={client.id_Client}>
                                    <td>{client.firstname}</td>
                                    <td>{client.lastname}</td>
                                    <td>{client.address}</td>
                                    <td>{client.email}</td>
                                    <td>{client.city}</td>
                                    <td>{client.phone}</td>
                                    <td><a href={client.website}>{client.website}</a></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Client */}
        <div className="Add">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a href className="active nav-link">
                              Ajouter Client
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitClient}>
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Prenom</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="firstname"
                                          value={client.firstname}
                                          placeholder="Prenom"
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nom</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="lastname"
                                          value={client.lastname}
                                          placeholder="Nom"
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Adresse</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="address"
                                          value={client.address}
                                          placeholder="Adresse"
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Ville</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="city"
                                          value={client.city}
                                          placeholder="Ville"
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Email</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="email"
                                          name="email"
                                          value={client.email}
                                          placeholder="Adresse electronique"
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Telephone</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="phone"
                                          placeholder="Numero telephone"
                                          value={client.phone}
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Site Web</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="url"
                                          name="website"
                                          value={client.website}
                                          placeholder="https://example.com"
                                          pattern="https://.*"
                                          onChange={handleClientChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button
                                    className="btnSave mt-3"
                                    type="submit"
                                    onSubmit={submitClient}
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modify Client */}
        <div className="Edit">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a href className="active nav-link">
                              Modifier Client
                            </a>
                          </li>
                        </ul>
                        <div className="row">
                          <div className="table-responsive">
                            <table
                              id_Client="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                                <tr>
                                  <th>Prenom </th>
                                  <th>Nom</th>
                                  <th>Adresse</th>
                                  <th>email</th>
                                  <th>ville</th>
                                  <th>Telephone</th>
                                  <th>Site</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clients.map((client) => (
                                  <tr key={client.id_Client}>
                                    <td>{client.firstname}</td>
                                    <td>{client.lastname}</td>
                                    <td>{client.address}</td>
                                    <td>{client.email}</td>
                                    <td>{client.ville}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.website}</td>
                                    <td>
                                      <div className="form-button-action">
                                      <Link to={"edit/" + client.id_Client } 
                                      state={{id: client.id_Client}} 
                                      className='editIcon'><i className="fa fa-edit"></i></Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Client */}
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHid_Cliente={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer ce client?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <Button
                  variant="info"
                  onClick={() => {
                    handleClose();
                  }}
                  block
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    deleteClient(id_ClientC);
                    handleClose();
                  }}
                  block
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div className="Delete">
          <div className="content">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href
                              className="active nav-link"
                              style={{ color: "#000" }}
                            >
                              Supprimer Article
                            </a>
                          </li>
                        </ul>
                        <div className="row">
                          <div className="table-responsive">
                            <table
                              id_Client="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                                <tr>
                                  <th>Prenom </th>
                                  <th>Nom</th>
                                  <th>Adresse</th>
                                  <th>email</th>
                                  <th>ville</th>
                                  <th>Telephone</th>
                                  <th>Site</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {clients.map((client) => (
                                  <tr key={client.id_Client}>
                                    <td>{client.firstname}</td>
                                    <td>{client.lastname}</td>
                                    <td>{client.address}</td>
                                    <td>{client.email}</td>
                                    <td>{client.ville}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.website}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setid_Client(client.id_Client)
                                            handleOpen()
                                          }}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Clients;
