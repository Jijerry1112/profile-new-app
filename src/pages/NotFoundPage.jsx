import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>404 - Page Not Found</h1>
      <p>That page doesn’t exist.</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}