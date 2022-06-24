import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';

function EditCategories({ match }) {
  const { id } = useParams();
  const  navigate  = useNavigate();
  const initialCategories = {
    Id_categorie: null,
    name: "",
    description: "",
  };
  const [categorie, SetCategorie] = useState(initialCategories);

  function handleCategoriesChange(e) {
    const { name, value } = e.target;
    SetCategorie({ ...categorie, [name]: value });
  }
  useEffect(() => {
    async function fetchCategory() {
      const { data } = await axios.get(`/api/categories/${id}`);
      SetCategorie(data);
      console.log(id);
    }
    fetchCategory();
  }, [id]);
  function updateCategorie(e) {
    let form_data = new FormData();
    form_data.append("Id_categorie",categorie.Id_categorie);
    form_data.append("name", categorie.name);
    form_data.append("description", categorie.description);
    console.log(form_data);
    axios
      .put(`/api/categories/${id}`, form_data)
      .then((response) => {
        SetCategorie({
          Id_categorie:response.data.Id_categorie,
          name: response.data.name,
          description: response.data.description,
        });
        alert("categorie mise a jour avec succees");
        
      }).catch((error)=>{console.log(error)});
    SetCategorie(form_data);
    navigate('/respo/categories');
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
                            Modifier Categorie
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={updateCategorie}>
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Nom</label>
                                      <input
                                        className="form-control shadow-none"
                                        type="text"
                                        name="name"
                                        placeholder="Nom du categorie"
                                        value={categorie.name}
                                        onChange={handleCategoriesChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Description</label>
                                      <textarea
                                        className="form-control shadow-none"
                                        type="text"
                                        name="description"
                                        placeholder="description"
                                        rows={4}
                                        value={categorie.description}
                                        onChange={handleCategoriesChange}
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
                                  onSubmit={updateCategorie}
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
}

export default EditCategories;
