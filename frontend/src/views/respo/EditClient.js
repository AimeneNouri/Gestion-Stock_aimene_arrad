import React, { useState, useEffect } from "react";
import axios from "axios";

import { useParams,useNavigate } from 'react-router-dom';

const EditClt = ({ match }) => {
  const initialClient = {
    id_Client: null,
    firstname: "",
    lastname: "",
    adress: "",
    email: "",
    city: "",
    phone: "",
    website: "",
  };
  const [client, SetClient] = useState(initialClient);
  const { id } = useParams();
  const  navigate  = useNavigate();

  function handleClientChange(e) {
    const { name, value } = e.target;
    SetClient({ ...client, [name]: value });
  }
  useEffect(() => {
    async function fetchClient() {
      const { data } = await axios.get(`/api/clients/${id}`);
      SetClient(data);
    }
    fetchClient();
  }, [id]);
  function updateClient() {
    let form_data = new FormData();
    form_data.append("firstname", client.firstname);
    form_data.append("lastname", client.lastname);
    form_data.append("address", client.address);
    form_data.append("email", client.email);
    form_data.append("city", client.city);
    form_data.append("phone", client.phone);
    form_data.append("website", client.website);

    axios.put(`/api/clients/${id}`, form_data).then((response) => {
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
      alert("client mis a jour avec succees");
    });
    SetClient(form_data);
    navigate('/respo/clients')
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
                          <form className="form" onSubmit={updateClient}>
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
                                  onSubmit={updateClient}
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
export default EditClt;
