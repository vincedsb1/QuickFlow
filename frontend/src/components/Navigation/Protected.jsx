import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function Protected({ children }) {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    return children;
  }
  return <Navigate to="/" />;
}

Protected.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Protected;
