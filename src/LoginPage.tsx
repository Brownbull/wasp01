import { Link } from "react-router-dom";
import { LoginForm } from "wasp/client/auth";

export const LoginPage = () => {
    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <LoginForm />
            <br />
            <span>
                <Link to="/signup">Sign Up</Link>
            </span>
        </div>
    );
};