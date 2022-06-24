import  axios from  'axios'

class ApiCalls {
async fetchAccounts() {
    return await axios.get("/api/users");
}

async fetchArticles(){
    return await axios.get("/api/articles");
}

async fetchCategories(){
    return await axios.get("/api/categories");
}

async fetchClients() {
    return await axios.get("/api/clients");
}

async fetchCommandes() {
    return await axios.get("/api/orders");
}

async fetchSuppliers() {
    return await axios.get("/api/suppliers");
}

 logout() {
    localStorage.removeItem("user");
}

async login(data) {
    return axios
    .post("/api/auth/signin", data)
    .then((response)  =>  {
      if(response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      return response.data;
    });
}

 getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

 authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user && user.accessToken) {
        return { Authorization: 'AimeneAbdellah' + user.accessToken };
    } 
    else {
        return {};
    }
}

 getRespoDashBoard = () => {
    return axios.get("/api/auth/respo", {headers: this.authHeader()});
}

 getAdminDashBoard = () => {
    return axios.get("/api/auth/admin", {headers: this.authHeader()});
}
}

export default new ApiCalls();