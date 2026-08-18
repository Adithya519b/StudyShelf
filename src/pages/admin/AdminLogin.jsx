import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {

        e.preventDefault();

        console.log({
            email,
            password
        });
        if(email =="adithya462005@gmail.com" && password=="adhi46"){

        // Backend API will be added later
        navigate("/admin-dashboard");
        }
        else{
            alert("Invalid admin details")
        }

    }

    return (

        <div className="login-container">

            <form
                className="login-card admin-theme"
                onSubmit={handleLogin}
            >

                <h1>🛡 Administrator Portal</h1>

                <h2>CampusDocs</h2>

                <input

                    type="email"

                    placeholder="Admin Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    required

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    required

                />

                <button>

                    Login

                </button>

                <Link to="/">

                    ← Back to Home

                </Link>

            </form>

        </div>

    )

}

export default AdminLogin;