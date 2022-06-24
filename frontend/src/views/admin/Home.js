import React, {  useState  , useEffect  } from "react";
import  axios from  'axios'
// import Chart from '../../components/respo/charts/chart'


const Home = () => {
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
    const { data } = await axios.get("/api/users/all");
        setUsers(data);
        console.log(data)
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <main>
            <div className="main__container">
                <div className="main__title">
                    <div className="main__greeting">
                        <h1>Bonjour Mr. Administrateur</h1>
                        <p>Bienvenue dans votre admin tableau de bord</p>
                    </div>
                </div>
                <div className="cardStaffAdmin">
                    <div className="cardDashboardAdmin">
                        <i className="fas fa-user-o fa-2x text-lightblue"></i>
                        <div className="card_inner">
                            <div className="textCardStaff">
                                Nombre du staff
                            </div>
                            <span className="font-bold text-title">{users.length}</span>
                        </div>
                    </div>
                </div>

                <div className="charts">
                    <div className="charts_title">
                        <h1>Charts Visualization</h1>
                    </div>
                    {/* <Chart/> */}
                </div>
            </div>
        </main>
    )
}

export default Home
