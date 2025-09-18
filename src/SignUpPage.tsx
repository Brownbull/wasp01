import { Link } from "react-router-dom";
import { SignupForm } from "wasp/client/auth";

export const SignUpPage = () => {
    return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
            <SignupForm />
            <br />
            <span>
                <Link to="/login">Login</Link>
            </span>
        </div>
    );
};
