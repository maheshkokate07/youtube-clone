import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/authSlice";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);

    // Handle input change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            alert("Please enter both email and password");
            return;
        }

        const result = await dispatch(loginUser(credentials));
        if (result.payload?.token) {
            navigate("/home"); // Redirect to home after successful login
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl text-dark font-bold text-center mb-4">Login</h2>

                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="p-2 rounded text-dark border border-gray-300"
                        required
                    />

                    {/* Password Input */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="p-2 rounded text-dark border border-gray-300"
                        required
                    />

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 cursor-pointer text-white py-2 rounded font-semibold hover:bg-blue-600"
                    >
                        {
                            loading ? "Loading..." : "Login"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;