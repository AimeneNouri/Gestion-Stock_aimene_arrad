import React, { useState, useEffect } from "react";
import axios from "axios";
// import jsPDF from "jspdf";
import Logo from "../../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Commandes = () => {
  const history = useNavigate();
  const [idC, setIdC] = useState("");
  const [dateC, setDateC] = useState("");
  const [etatC, setEtatC] = useState("");
  const [idA, setIdA] = useState("");
  const [nomA, setNomA] = useState("");
  const [prixA, setPrixA] = useState("");
  const [qte, setQte] = useState();

  const Add = () => {
    document.querySelector(".Add").style.display = "block";
    document.querySelector(".Edit").style.display = "none";
    document.querySelector(".Delete").style.display = "none";
    document.querySelector(".views").style.display = "none";
    document.querySelector("#content").style.display = "none";
  };

  const Edit = () => {
    document.querySelector(".Add").style.display = "none";
    document.querySelector(".Edit").style.display = "block";
    document.querySelector(".Delete").style.display = "none";
    document.querySelector(".views").style.display = "none";
    document.querySelector("#content").style.display = "none";
  };

  const Delete = () => {
    document.querySelector(".Add").style.display = "none";
    document.querySelector(".Edit").style.display = "none";
    document.querySelector(".Delete").style.display = "block";
    document.querySelector(".views").style.display = "none";
    document.querySelector("#content").style.display = "none";
  };

  const initialCommande = {
    id: null,
    articleList: "",
    commandDate: "",
    etat: "",
    qte: 0,
  };
  const [commande, SetCommande] = useState(initialCommande);

  function handleCommandeChange(e) {
    const { name, value } = e.target;
    SetCommande({ ...commande, [name]: value });
  }

  /**
   * I'm trying to add a commande to the database, but before that I want to check if the quantity of
   * the article is available in the stock.
   * </code>
   * @param e - The event object
   */
  function submitCommande(e) {
    e.preventDefault();
    fetch(`/api/articles/search/${commande.articleList}`)
      .then((response) => response.json())
      .then((datas) => {
        if (datas.countInStock >= commande.qte) {
          const data = {
            id: commande.id,
            articleList: commande.articleList,
            commandDate: commande.commandDate,
            etat: commande.etat,
            qte: commande.qte,
          }
          axios.post("/api/commandes/add", data).then((response) => {
            SetCommande({
              id: response.data.id,
              articleList: response.data.articleList,
              commandDate: response.data.commandDate,
              etat: response.data.etat,
              qte: response.data.qte,
            });
          });
          SetCommande(data);
          alert("commande ajoutee avec succees");
          window.location.reload();
        } else {
          alert("Stock insufisant !!!");
        }
      });
  }

  const [articles, setArticles] = useState([]);
  async function fetchArticles() {
    const { data } = await axios.get("/api/articles/all");
    setArticles(data);
  }
  useEffect(() => {
    fetchArticles();
  }, []);

  //edit&delete
  const [commandes, setCommandes] = useState([]);

  async function fetchCommandes() {
    const { data } = await axios.get("/api/commandes/all");
    setCommandes(data);
  }

  useEffect(() => {
    fetchCommandes();
  }, []);

  function deleteCommande(id) {
    axios.delete(`/api/commandes/${id}`).then((response) => fetchCommandes());
    alert("La commande № " + id + " a ete supprimee avec succees");
  }

  function pdfGenerator(idC, dateC) {
    document.querySelector("#content").style.display = "block";
    document.querySelector(".views").style.display = "none";
    // var pdf = new jsPDF("p", "pt", "a4");

    // pdf.html(document.querySelector("#content"), {
    //   callback: function (doc) {
    //     doc.save("Facture_" + idC + "_" + dateC + ".pdf");
    //   },
    // });
  }

  const [show, setShow] = useState(false);
  const [IdC, setId] = useState();

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
            <h1>Commandes</h1>
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

        {/* view all commands */}
        <div className="views">
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
                              factures
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
                                  <th style={{ width: "5%" }}>Id commande</th>
                                  <th style={{ width: "5%" }}>Article</th>
                                  <th style={{ width: "5%" }}>
                                    Date du commande
                                  </th>
                                  <th style={{ width: "5%" }}>Qte commandé</th>
                                  <th style={{ width: "5%" }}>Etat</th>
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {commandes.map((cmd) => (
                                  <tr>
                                    <td>{cmd.id}</td>
                                    <td>{cmd.articleList}</td>
                                    <td>{cmd.commandDate}</td>
                                    <td>{cmd.qte}</td>
                                    <td>{cmd.etat}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <div
                                          className="pdfIcon"
                                          onClick={() => {
                                            fetch(
                                              `/api/article/${cmd.articleList}`
                                            )
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((data) => {
                                                //Article
                                                setIdA(data.id);
                                                setNomA(data.name);
                                                setPrixA(data.price);

                                                //Commande
                                                setIdC(cmd.id);
                                                setDateC(cmd.commandDate);
                                                setEtatC(cmd.etat);
                                                setQte(cmd.qte);

                                                pdfGenerator(
                                                  cmd.id,
                                                  cmd.commandDate
                                                );
                                              });
                                          }}
                                        >
                                          <i className="fas fa-file-pdf"></i>
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

        <div id="content">
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="logo">
                        <img src={Logo} alt="_logo_" />
                        <h2>Facture du commande Nº {idC}</h2>
                      </div>
                      <div className="detail">
                        <table id="add-row" className="display table">
                          <thead className="table-primary">
                            <th> Id Article </th>
                            <th> Nom Article </th>
                            <th> Prix Article </th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{idA}</td>
                              <td>{nomA}</td>
                              <td>{prixA}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table id="add-row" className="display table">
                          <thead className="table-primary">
                            <th> Id Commande </th>
                            <th> Date Commande </th>
                            <th> Etat Commande</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{idC}</td>
                              <td>{dateC}</td>
                              <td>{etatC}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table id="add-row" className="display table">
                          <thead className="table-primary">
                            <th> Qte Commandé </th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{qte}</td>
                            </tr>
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

        {/* Add Commande */}
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
                              Ajouter Commande
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form
                              className="form"
                              onSubmit={submitCommande}
                            >
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Article Name</label>
                                        <select
                                          className="form-control shadow-none"
                                          name="articleList"
                                          value={commande.articleList}
                                          onChange={handleCommandeChange}
                                        >
                                          {articles.map((art) => (
                                            <option value={art.nameArticle} selected>
                                              {art.nameArticle}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Date de Commande</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="date"
                                          name="commandDate"
                                          value={commande.commandDate}
                                          onChange={handleCommandeChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Qte commande</label>
                                        <input
                                          className="form-control shadow-none"
                                          type="number"
                                          name="qte"
                                          value={commande.qte}
                                          onChange={handleCommandeChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Etat de Commande</label>
                                        <select
                                          className="form-control shadow-none"
                                          name="etat"
                                          value={commande.etat}
                                          onChange={handleCommandeChange}
                                        >
                                          <option value="Traite">Traite</option>
                                          <option value="Non traite">
                                            Non Traite
                                          </option>
                                        </select>
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
                                    onSubmit={submitCommande}
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

        {/* Modify Commande */}
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
                              Modifier Commande
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
                                  <th style={{ width: "5%" }}>Id commande</th>
                                  <th style={{ width: "5%" }}>Article</th>
                                  <th style={{ width: "5%" }}>
                                    Date du commande
                                  </th>
                                  <th style={{ width: "5%" }}>Qte commandé</th>
                                  <th style={{ width: "5%" }}>Etat</th>
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {commandes.map((cmd) => (
                                  <tr>
                                    <td>{cmd.id}</td>
                                    <td>{cmd.articleList}</td>
                                    <td>{cmd.commandDate}</td>
                                    <td>{cmd.qte}</td>
                                    <td>{cmd.etat}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <Link
                                          className="editIcon"
                                          to={`edit/${cmd.id}`}
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

        {/* Delete Commande */}
        {/* modal delete option */}
        <Modal
          className="modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-weight-bold">
              Est ce que vous voulez supprimer cette commande?
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
                    deleteCommande(IdC);
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
                              Supprimer Commande
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
                                  <th style={{ width: "5%" }}>Id commande</th>
                                  <th style={{ width: "5%" }}>Article</th>
                                  <th style={{ width: "5%" }}>
                                    Date du commande
                                  </th>
                                  <th style={{ width: "5%" }}>Qte commandé</th>
                                  <th style={{ width: "5%" }}>Etat</th>
                                  <th style={{ width: "1%" }}>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {commandes.map((cmd) => (
                                  <tr>
                                    <td>{cmd.id}</td>
                                    <td>{cmd.articleList}</td>
                                    <td>{cmd.commandDate}</td>
                                    <td>{cmd.qte}</td>
                                    <td>{cmd.etat}</td>
                                    <td>
                                      <div className="form-button-action">
                                        <a
                                          className="editIcon"
                                          onClick={() => {
                                            setId(cmd.id);
                                            handleOpen();
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

export default Commandes;
