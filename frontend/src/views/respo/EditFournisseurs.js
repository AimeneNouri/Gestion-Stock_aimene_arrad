import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';

const EditFournisseur = ({ match }) => {
  const initialSupplier = {
    id_Fournisseur: null,
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    city: "",
    phone: "",
    website: "",
  };
  const [supplier, SetSupplier] = useState(initialSupplier);
  const { id } = useParams();
  const  navigate  = useNavigate();

  function handleClientChange(e) {
    const { name, value } = e.target;
    SetSupplier({ ...supplier, [name]: value });
  }
  useEffect(() => {
    async function fetchCompte() {
      const { data } = await axios.get(`/api/suppliers/${id}`);
      SetSupplier(data);
    }
    fetchCompte();
  }, [id]);
  function UpdateSupplier() {
    let form_data = new FormData();
    form_data.append("firstname", supplier.firstname);
    form_data.append("lastname", supplier.lastname);
    form_data.append("address", supplier.address);
    form_data.append("email", supplier.email);
    form_data.append("city", supplier.city);
    form_data.append("phone", supplier.phone);
    form_data.append("website", supplier.website);

    axios
      .put(`/api/suppliers/${id}`, form_data)
      .then((response) => {
        SetSupplier({
          id_Fournisseur: response.data.id_Fournisseur,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          address: response.data.address,
          email: response.data.email,
          city: response.data.city,
          phone: response.data.phone,
          website: response.data.website,
        });
        alert("Fournisseur mis a jour avec succees");
      });
    SetSupplier(form_data);
    navigate('/respo/suppliers')
  }
  return (
    <main>
      <div className="main__container">
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
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={UpdateSupplier}>
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
                                        value={supplier.firstname}
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
                                        value={supplier.lastname}
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
                                        value={supplier.address}
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
                                        value={supplier.city}
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
                                        value={supplier.email}
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
                                        value={supplier.phone}
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
                                        value={supplier.website}
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
                                  onSubmit={UpdateSupplier}
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
    </main>
  );
};
export default EditFournisseur;
