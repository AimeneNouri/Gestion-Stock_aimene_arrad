import React,{ useState , useEffect, version } from "react";
import { useNavigate, useParams } from "react-router-dom";
import  axios from  'axios'

function EditId({match}) {
    const initialCompte={
        id: null,
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        phone: "",
        cin: "",
    };
    const[compte, SetCompte] = useState(initialCompte);
    const history = useNavigate();
    const { id } = useParams();
    const[Image, SetImage] = useState(null);

    useEffect(() => {
    async function  fetchCompte (){
      const {data}= await axios.get(`/api/users/${id}`);
      SetCompte(data);
    }
    fetchCompte();
    },[id]);

    function  handleArticleChange(e){
      const{name,value}=  e.target;
      SetCompte({...compte,[name]:value});
    }
    
    function  updateCompte(){
    let form_data = new FormData();
    form_data.append("firstname", compte.firstname);
    form_data.append("lastname", compte.lastname);
    form_data.append("address", compte.address);
    form_data.append("city", compte.city);
    form_data.append("phone", compte.phone);
    form_data.append("cin", compte.cin);

    const data = {
      id: id,
      firstname: compte.firstname,
      lastname: compte.lastname,
      address: compte.address,
      email: compte.email,
      city: compte.city,
      phone: compte.phone,
      cin: compte.cin,
    }

    axios
    .put(`/api/users/${id}`, data)
    .then((response)  =>  {
      SetCompte({
          id: response.data.id,
          firstname:response.data.firstname,
          lastname:response.data.lastname,
          address:response.data.address,
          email:response.data.email,
          city:response.data.city,
          phone:response.data.phone,
          cin:response.data.cin,
        });
      });
      alert("utilisateur modifie avec success");
      SetCompte(data);
      history('/admin/update')
    }
    
    return (
      <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Modification du Compte № {compte.id}</h1>
          </div>
        </div>
        
        <div className="content" >
          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <ul className="nav nav-tabs">
                        <li className="nav-item">
                          <a href className="active nav-link">
                            Info
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" onSubmit={updateCompte}>
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
                                        value={compte.firstname}
                                        placeholder="Smith"
                                        onChange={handleArticleChange}
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
                                        value={compte.lastname}
                                        placeholder="John"
                                        onChange={handleArticleChange}
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
                                        value={compte.address}
                                        placeholder="Ain Chock"
                                        onChange={handleArticleChange}
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
                                        value={compte.phone}
                                        placeholder="+1-202-555-0155"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>cin</label>
                                      <input
                                        className="form-control shadow-none"
                                        type="text"
                                        name="cin"
                                        value={compte.cin}
                                        placeholder="JohnSmith"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input
                                        className="form-control shadow-none"
                                        type="text"
                                        name="city"
                                        value={compte.city}
                                        placeholder="Casablanca"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btnSave mt-3" type="submit" onSubmit={updateCompte}>
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
    )
}

export default EditId;
