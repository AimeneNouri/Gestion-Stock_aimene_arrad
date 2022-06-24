import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditArticle = ({ match }) => {
  const initialArticle = {
    id: null,
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
  const history = useNavigate();
  const { id } = useParams();
  function handleImageChange(e) {
    SetArticle({ ...article, image: e.target.files[0] });
  }
  function handleArticleChange(e) {
    const { name, value } = e.target;
    SetArticle({ ...article, [name]: value });
  }
  useEffect(() => {
    async function fetchArticle() {
      const { data } = await axios.get(`/api/articles/${id}`);
      SetArticle(data);
    }
    fetchArticle();
  }, [id]);
  function updateArticle(e) {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("nameArticle", article.nameArticle);
    form_data.append("price", article.price);
    form_data.append("Description", article.description);
    form_data.append("CountInStock", article.countInStock);
    form_data.append("Image", "article.image, article.image.name");
    form_data.append("Category", article.category);
    form_data.append("options", article.options);
    form_data.append("taille", article.taille);

    axios
      .put(`/api/articles/${id}`, form_data)
      .then((response) => {
        SetArticle({
          id_Article: response.data.Id_Article,
          nameArticle: response.data.nameArticle,
          price: response.data.price,
          description: response.data.Description,
          countInStock: response.data.CountInStock,
          image: response.data.image,
          category: response.data.Category,
          options: response.data.options,
          taille: response.data.taille,
        });
        alert("article mis a jour avec succees");
      }).catch((error) => console.log(error));
    SetArticle(form_data);
    history('/respo/articles')
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
                            href
                            className="active nav-link"
                            style={{ color: "#000" }}
                          >
                            Modifier Article
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={updateArticle}>
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
                                        placeholder="Nom Article"
                                        onChange={handleArticleChange}
                                        readOnly
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
                                        name="CountInStock"
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
                                        name="Image"
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
                                        className="form-control shadow-none"
                                        style={{height: "38px"}}
                                        name="Category"
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
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Taille</label>
                                      <input
                                        type="text"
                                        name="taille"
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
export default EditArticle;
