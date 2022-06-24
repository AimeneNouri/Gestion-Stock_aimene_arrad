import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Suppliers = () => {
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

  //Add Fournisseur
  const initialFournisseurs = {
    id_Fournisseur: null,
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    city: "",
    phone: "",
    website: "",
  };
  const [fournisseur, SetFournisseur] = useState(initialFournisseurs);
  const [fournisseurs, SetFournisseurs] = useState([]);

  function handleFournisseursChange(e) {
    const { name, value } = e.target;
    SetFournisseur({ ...fournisseur, [name]: value });
  }

  function submitFournisseur() {
    let form_data = new FormData();
    form_data.append("firstname", fournisseur.firstname);
    form_data.append("lastname", fournisseur.lastname);
    form_data.append("address", fournisseur.address);
    form_data.append("email", fournisseur.email);
    form_data.append("city", fournisseur.city);
    form_data.append("phone", fournisseur.phone);
    form_data.append("website", fournisseur.website);
    debugger;
    axios.post("/api/suppliers/add", form_data).then((response) => {
      SetFournisseur({
        id_Fournisseur: response.data.id_Fournisseur,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        address: response.data.address,
        email: response.data.email,
        city: response.data.city,
        phone: response.data.phone,
        website: response.data.website,
      });
      alert("Fournisseur ajoutee avec succees");
      window.location.reload();
    });
    SetFournisseur(form_data);
  }

  async function fetchFournisseurs() {
    const { data } = await axios.get("/api/suppliers/all");
    SetFournisseurs(data);
  }

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  function deleteFournisseur(id_Fournisseur) {
    axios.delete(`/api/suppliers/${id_Fournisseur}`).then((response) => fetchFournisseurs());
    alert("Le fournisseur № " + id_Fournisseur + " a ete supprimee avec succees");
    window.location.reload();
  }

  const [show, setShow] = useState(false);
  const [idC, setId] = useState();

  const handleOpen = (id_Fournisseur) => {
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
            <h1>Fournisseurs</h1>
            <div className="buttons">
              <button
                type="button"
                className="ButtonStyle btn1 btn-outline btn-xl"
                onClick={Add}
                style={{ width: "80px" }}
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
                                {fournisseurs.map((supplier) => (
                                  <tr key={supplier.id_Fournisseur}>
                                    <td>{supplier.firstname}</td>
                                    <td>{supplier.lastname}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.city}</td>
                                    <td>{supplier.phone}</td>
                                    <td><a href={supplier.website}>{supplier.website}</a></td>
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
                              Ajouter Fournisseur
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitFournisseur}>
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
                                          value={fournisseur.firstname}
                                          placeholder="Prenom"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.lastname}
                                          placeholder="Nom"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.address}
                                          placeholder="Adresse"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.city}
                                          placeholder="Ville"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.email}
                                          placeholder="Adresse electronique"
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.phone}
                                          onChange={handleFournisseursChange}
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
                                          value={fournisseur.website}
                                          placeholder="https://example.com"
                                          pattern="https://.*"
                                          onChange={handleFournisseursChange}
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
                                    onSubmit={submitFournisseur}
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

        {/* Modify Fournisseur */}
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
                              Modifier Fournisseur
                            </a>
                          </li>
                        </ul>
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
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fournisseurs.map((supplier) => (
                                  <tr key={supplier.id_Fournisseur}>
                                    <td>{supplier.firstname}</td>
                                    <td>{supplier.lastname}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.city}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.website}</td>
                                    <td>
                                      <div className="form-button-action">
                                      <Link to={"edit/" + supplier.id_Fournisseur } 
                                      state={{id: supplier.id_Fournisseur }} 
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

        {/* Delete Fournisseur */}
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer ce fournisseur?
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
                    deleteFournisseur(idC);
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
                            <a href className="active nav-link">
                              Supprimer Fournisseur
                            </a>
                          </li>
                        </ul>
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
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {fournisseurs.map((supplier) => (
                                  <tr key={supplier.id_Fournisseur}>
                                    <td>{supplier.firstname}</td>
                                    <td>{supplier.lastname}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.city}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.website}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setId(supplier.id_Fournisseur)
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

export default Suppliers;
