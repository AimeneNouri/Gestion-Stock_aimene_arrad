import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

const Articles = () => {
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
  const history = useNavigate();
  const [article, SetArticle] = useState(initialArticle);
  function handleImageChange(e) {
    SetArticle({ ...article, image: e.target.files[0] });
  }
  function handleArticleChange(e) {
    const { name, value } = e.target;
    SetArticle({ ...article, [name]: value });
    console.log(Articles);
  }

  function submitArticle(e) {
    e.preventDefault();
    // let form_data = new FormData();
    // form_data.append("id_Article", null);
    // form_data.append("nameArticle", article.nameArticle);
    // form_data.append("price", article.price);
    // form_data.append("description", article.description);
    // form_data.append("countInStock", article.countInStock);
    // form_data.append("image", "article.image, article.image.name");
    // form_data.append("category", "article.Category");
    // form_data.append("options", article.options);
    // form_data.append("taille", article.taille);
    // console.log(form_data);
    const data = {
      id_Article: null,
      nameArticle: article.nameArticle,
      price: article.price,
      description: article.description,
      countInStock: article.countInStock,
      image: "article.image",
      category: article.category,
      options: article.options,
      taille: article.taille,
    }
    axios.post("/api/articles/add", data).then((response) => {
      SetArticle({
        id_Article: response.data.id_Article,
        nameArticle: response.data.nameArticle,
        price: response.data.price,
        description: response.data.description,
        countInStock: response.data.countInStock,
        image: response.data.image,
        category: response.data.category,
        options: response.data.options,
        taille: response.data.taille,
      });
      alert("Article ajoutee avec succees");
      window.location.reload();
    });
    SetArticle(data);
  }
  //fetchCategories
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const { data } = await axios.get("/api/categories/all");
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  //edit&delete
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const { data } = await axios.get("/api/articles/all");
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  function deleteArticles(id) {
    axios.delete(`/api/articles/article/${id}`).then((response) => fetchArticles());
    alert("L'article " + id + " a ete supprimee avec succees");
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
  const [IdA, setId] = useState();

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
          <div className="main__greetingArticle">
            {/* <h1><a href="" className="routerPath"><i className="fas fa-home"></i></a> <span><i className="fas fa-chevron-right"></i></span> <a href="" className="routerPathSec">Articles</a></h1>  */}
            <h1>Articles</h1>
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
                            <table id="basic-datatables" class="display table table-striped table-hover" >
                            <thead>
                                <tr>
                                  <th style={{ width: "10%" }}>Nom</th>
                                  <th style={{ width: "5%" }}>Prix</th>
                                  <th style={{ width: "15%" }}>Description</th>
                                  <th style={{ width: "3%" }}>NombreStock</th>
                                  <th style={{ width: "5%" }}>Categories</th>
                                  <th style={{ width: "10%" }}>Options</th>
                                  <th style={{ width: "2%" }}>taille</th>
                                </tr>
                              </thead>
                              <tbody>
                                {articles.map((article) => (
                                  <tr key={article.id_Article}>
                                    <td>{article.nameArticle}</td>
                                    <td>{article.price}</td>
                                    <td>{article.description}</td>
                                    <td>{article.countInStock}</td>
                                    <td>{article.category}</td>
                                    <td>{article.options}</td>
                                    <td>{article.taille}</td>
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

        {/* Add Article */}
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
                            <a
                              href
                              className="active nav-link"
                            >
                              Ajouter Article
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form className="form" onSubmit={submitArticle}>
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nom Article</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="nameArticle"
                                          value={article.nameArticle}
                                          placeholder="Nom Artice"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Prix</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="price"
                                          value={article.price}
                                          placeholder="Prix"
                                          onChange={handleArticleChange}
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
                                          value={article.description}
                                          rows="3"
                                          placeholder="Desctiption"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nombre de stock</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="number"
                                          name="countInStock"
                                          value={article.countInStock}
                                          placeholder="Nombre de stock"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Images</label>
                                        <input
                                          className="form-control shadow-none"
                                          id="image-file"
                                          type="file"
                                          name="image"
                                          onChange={handleImageChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Categorie</label>
                                        <select
                                          className="form-control shadow-none" style={{height: "38px"}}
                                          type="text"
                                          name="category"
                                          value={article.category}
                                          onChange={handleArticleChange}
                                        >
                                          {categories.map((cat) => (
                                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Options</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="text"
                                          name="options"
                                          value={article.options}
                                          placeholder="Options"
                                          onChange={handleArticleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Taille</label>
                                        <input
                                          name="taille"
                                          type="text"
                                          className="form-control shadow-none"
                                          value={article.taille}
                                          placeholder="taille"
                                          onChange={handleArticleChange}
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
                                    onSubmit={submitArticle}
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

        {/* Modify Article */}
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
                            <a
                              href
                              className="active nav-link"
                              style={{ color: "#000" }}
                            >
                              Modifier Article
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
                                  <th style={{ width: "10%" }}>Nom</th>
                                  <th style={{ width: "5%" }}>Prix</th>
                                  <th style={{ width: "15%" }}>Description</th>
                                  <th style={{ width: "3%" }}>NombreStock</th>
                                  <th style={{ width: "5%" }}>Categories</th>
                                  <th style={{ width: "10%" }}>Options</th>
                                  <th style={{ width: "5%" }}>taille</th>
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {articles.map((article) => (
                                  <tr key={article.id_Article}>
                                    <td>{article.nameArticle}</td>
                                    <td>{article.price}</td>
                                    <td>{article.description}</td>
                                    <td>{article.countInStock}</td>
                                    <td>{article.category}</td>
                                    <td>{article.options}</td>
                                    <td>{article.taille}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <Link
                                          className="editIcon"
                                          to={`edit/${article.id_Article}`}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              Est ce que vous voulez supprimer cet article?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <Button variant="info" onClick={() => { handleClose() }} block>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    deleteArticles(IdA);
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
        {/* Delete Article */}
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
                              id="add-row"
                              className="display table table-striped table-hover"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "10%" }}>Nom</th>
                                  <th style={{ width: "5%" }}>Prix</th>
                                  <th style={{ width: "15%" }}>Description</th>
                                  <th style={{ width: "3%" }}>NombreStock</th>
                                  <th style={{ width: "5%" }}>Categories</th>
                                  <th style={{ width: "10%" }}>Options</th>
                                  <th style={{ width: "5%" }}>taille</th>
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {articles.map((article) => (
                                  <tr key={article.Id_Article}>
                                    <td>{article.nameArticle}</td>
                                    <td>{article.price}</td>
                                    <td>{article.description}</td>
                                    <td>{article.countInStock}</td>
                                    <td>{article.category}</td>
                                    <td>{article.options}</td>
                                    <td>{article.taille}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <div
                                          className="editIcon"
                                          onClick={() => {
                                            setId(article.id_Article)
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

export default Articles;
