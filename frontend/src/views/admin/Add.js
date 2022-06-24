import React, { useState , useEffect } from "react";
import user from '../../img/user.png';
import  axios from  'axios'


function Add() {
  const initialCompte={
    id: null,
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    city: "",
    email: "",
    cin: "",
    username: "",
    password: "",
    roles: []
  };
  const[compte, SetCompte] = useState(initialCompte);
  const[Image, SetImage] = useState(null);
  const[task, SetTask] = useState("");
  
  function  handleArticleChange(e){
    const{name,value}=  e.target;
    SetCompte({...compte,[name]:value});
  }

  function handleTaskChange(e){
    SetTask(e.target.value)
    console.log(e.target.value)
  }

  function  submitCompte(){
    const data = {
      username: compte.username,
      email: compte.email,
      password: compte.password,
      address: compte.address,
      firstname: compte.firstname,
      lastname: compte.lastname,
      phone: compte.phone,
      city: compte.city,
      cin: compte.cin,
      roles: [task],
    }
      
    axios
    .post("/api/auth/signup", data)
    .then((response)  =>  {
      SetCompte({
        id: response.data.id,
        username:response.data.name,
        email:response.data.email,
        password:response.data.password,
        address: response.data.address,
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        phone: response.data.phone,
        city: response.data.city,
        cin: response.data.cin,
        roles: response.data.roles,
      });
      alert('Compte ajoute avec succees')
    });
    SetCompte(data);
  }
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Add new account</h1>
          </div>
        </div>
        
        <div className="content">
          <div className="col">
            <div className="row g-0">
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
                          <form className="form" onSubmit={submitCompte} encType="multipart/form-data">
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
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Nom</label>
                                      <input
                                        className="form-control shadow-none"
                                        type="text"
                                        name="lastname"
                                        value={compte.lastname}
                                        placeholder="Smith"
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
                                      <label>Email</label>
                                      <input
                                        className="form-control shadow-none"
                                        type="text"
                                        name="email"
                                        value={compte.email}
                                        placeholder="user@example.com"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>City</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        value={compte.city}
                                        placeholder="Casablanca"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Cin</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="cin"
                                        value={compte.cin}
                                        placeholder="Cin"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Username</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        value={compte.username}
                                        placeholder="JohnSmith"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Password</label>
                                      <input
                                      name="password"
                                        className="form-control"
                                        type="password"
                                        value={compte.password}
                                        placeholder="••••••••••••"
                                        onChange={handleArticleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-3">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Role</label>
                                      <input
                                        name="roles"
                                        className="form-control"
                                        type="text"
                                        value={task}
                                        placeholder="admin/respo"
                                        onChange={handleTaskChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btnSave mt-3" type="submit" onSubmit={submitCompte}>
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

export default Add;