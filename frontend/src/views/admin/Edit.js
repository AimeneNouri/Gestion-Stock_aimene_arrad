import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function Edit({ match }) {
  const updatedCompte = {
    id: null,
    name: "",
    lastname: "",
    adress: "",
    email: "",
    city: "",
    phone: "",
    cin: "",
    image: null,
    login: "",
    password: "",
    task: ""
  };
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {

    async function fetchUsers() {
    const { data } = await axios.get("/api/users/all");
        setUsers(data);
    }

    fetchUsers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Modifier Un Compte</h1>
          </div>
        </div>
        <div className="content">
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <div
                            className="active nav-link"
                            style={{ color: "#000" }}
                          >
                            Modifier Compte
                          </div>
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
                                <th style={{ width: "10%" }}>Email</th>
                                <th style={{ width: "5%" }}>Ville</th>
                                <th style={{ width: "5%" }}>Telephone</th>
                                <th style={{ width: "5%" }}>cin</th>
                                <th style={{ width: "5%" }}>task</th>
                                <th style={{ width: "1%" }}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((compte) => (
                                <tr key={compte.id}>
                                  <td>{compte.firstname}</td>
                                  <td>{compte.lastname}</td>
                                  <td>{compte.address}</td>
                                  <td>{compte.email}</td>
                                  <td>{compte.city}</td>
                                  <td>{compte.phone}</td>
                                  <td>{compte.cin}</td>
                                  <td>{compte.roles[0].name === "ROLE_ADMIN" ? "admin" : "respo"}</td>
                                  <td>
                                    <div className="form-button-action">
                                      <Link
                                        className="editIcon"
                                        to={`${compte.id}`}
                                      >
                                        <i className="fa fa-edit"></i>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* <Modal
                        className="modal"
                        show={show}
                        onHide={handleClose}
                        animation={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title className="font-weight-bold">
                            Compte numero: {key}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                          <div className="col mb-4">
                            <div className="card">
                              <div className="card-body">
                                <form className="form"  encType="multipart/form-data">
                                  <div className="row">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Prenom</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="name"
                                              value={Cmpt.name}
                                              placeholder="Smith"
                                              onChange={handleCompteChange}
                                            />
                                            {Cmpt.name}
                                          </div>
                                        </div>
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Nom</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="lastname"
                                              value={Cmpt.lastname}
                                              placeholder="John"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Adresse</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="adress"
                                              value={Cmpt.adress}
                                              placeholder="Ain Chock"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Telephone</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="phone"
                                              value={Cmpt.phone}
                                              placeholder="+212 634912032"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Email</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="email"
                                              value={Cmpt.email}
                                              placeholder="user@example.com"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Ville</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="city"
                                              value={Cmpt.city}
                                              placeholder="Casablanca"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>cin</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="cin"
                                              value={Cmpt.cin}
                                              placeholder="JohnSmith"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                        <div className="col">
                                          <div className="form-group">
                                            <label>image</label>
                                            <input
                                              className="form-control"
                                              type="file"
                                              id="image-file"
                                              name="image"
                                              onChange={handleImageChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Login</label>
                                            <input
                                              className="form-control"
                                              type="text"
                                              name="login"
                                              value={Cmpt.login}
                                              placeholder="JohnSmith"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Password</label>
                                            <input
                                              name="password"
                                              className="form-control"
                                              type="password"
                                              value={Cmpt.password}
                                              placeholder="••••••••••••"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label> Tache</label>
                                            <input
                                              name="task"
                                              className="form-control"
                                              type="text"
                                              value={Cmpt.task}
                                              placeholder="admin/responsable"
                                              onChange={handleCompteChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col d-flex justify-content-end">
                                      <button className="btnSave btn-primary" type="submit">
                                        Save Changes
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal> */}
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
}

export default Edit;
