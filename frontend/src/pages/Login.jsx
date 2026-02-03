import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/dashboard", { replace: true });

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert(
        err.response?.data?.message || "Login failed. Check credentials."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <form onSubmit={handleLogin}>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button disabled={loading} type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}

export default Login;
