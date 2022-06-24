import React, { useState, useEffect, version } from "react";
//import { Button, Col, FormGroup } from "react-bootstrap";
//import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EditArticle = ({ match }) => {
  const initialArticle = {
    id_Article: null,
    nameArticle: "",
    price: 0,
    description: "",
    countInStock: 0,
    image: null,
    category: "",
    options: "",
    taille: "",
  };
  const [article, SetArticle] = useState(initialArticle);
  const { name } = useParams();
  useEffect(() => {
    async function fetchArticle() {
      const { data } = await axios.get(`/api/articles/search/${name}`);
      SetArticle(data);
    }
    fetchArticle();
  }, [name]);

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
                          <a
                            className="active nav-link"
                            style={{ color: "#9368E9" }}
                          >
                            Info
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <div className="row">
                            <div className="col">
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label>Nom Article</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="nom"
                                      value={article.nameArticle}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Prix Article</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.price}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row" style={{marginTop: '15px'}}> 
                                <div className="col">
                                  <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                      className="form-control"
                                      type="text"
                                      rows={2}
                                      value={article.description}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Nombre qte en stock</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.countInStock}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row" style={{marginTop: '15px'}}>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Nom Categorie</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.category}
                                      readOnly
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Options</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={article.options}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row" style={{marginTop: '15px', marginBottom: '5px'}}>
                                <div className="col">
                                  <div className="form-group">
                                    <label>Taille</label>
                                    <input
                                      className="form-control" 
                                      type="text"
                                      value={article.taille}
                                      readOnly
                                    />
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
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default EditArticle;
