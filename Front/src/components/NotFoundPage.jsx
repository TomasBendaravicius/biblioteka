import { Link } from "react-router";
function NotFoundPage() {
    return (
        <div>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go back to the home page</Link>
        </div>
    );
}

export default NotFoundPage;