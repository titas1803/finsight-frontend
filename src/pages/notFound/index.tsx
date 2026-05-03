import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>Sorry!!, The page you are looking for doesn't exist</h1>
      <p>
        Go to <Link to="/">Home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
