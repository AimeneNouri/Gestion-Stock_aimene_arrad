import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Delete() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [IdC, setId] = useState();
  async function fetchUsers() {
  const { data } = await axios.get("/api/users/all");
      setUsers(data);
      console.log(data)
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  function deleteCompte(id) {
    axios.delete(`/api/user/${id}`).then((response) => fetchUsers());
  }

  const handleOpen = (id) => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(!show);
  };

  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Supprimer Un Compte</h1>
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
                            Supprimer Compte
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
                              {users.map((user) => (
                                <tr key={user.id}>
                                  <td>{user.firstname}</td>
                                  <td>{user.lastname}</td>
                                  <td>{user.address}</td>
                                  <td>{user.email}</td>
                                  <td>{user.city}</td>
                                  <td>{user.phone}</td>
                                  <td>{user.cin}</td>
                                  <td>{user.roles[0].name === "ROLE_ADMIN" ? "admin" : "respo"}</td>
                                  <td>
                                    <div className="form-button-action">
                                      <div
                                        className="editIcon"
                                        onClick={() => {
                                          setId(user.id)
                                          handleOpen();
                                        }}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* modal delete option */}
                    <Modal
                      className="modal"
                      show={show}
                      onHide={handleClose}
                      animation={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="font-weight-bold">
                          Est ce que vous voulez supprimer cet utilisateur?
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <div className="card">
                            <div className="card-body">
                              <Button variant="info" onClick={() => {
                                handleClose()
                              }} block>
                                Cancel
                              </Button>
                              <Button variant="primary" onClick={() => {
                                deleteCompte(IdC)
                                handleClose()
                                alert('Utilisateur a ete supprimee avec succees')
                              }}  block>
                                Supprimer
                              </Button>
                            </div>
                          </div>
                      </Modal.Body>
                    </Modal>
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

export default Delete