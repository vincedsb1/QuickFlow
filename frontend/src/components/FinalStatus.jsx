import { React } from "react";
import PropTypes from "prop-types";

function FinalStatus({ status }) {
  return (
    <div className="w-full flex justify-center">
      {status === "Validé" && (
        <div
          id="finalDecisionContainer"
          className="flex items-center justify-center border-solid border-2 border-emerald-400 rounded mb-8 py-2 w-80"
        >
          <p className="font-texts text-emerald-400 font-bold">
            Décision finale : {status}{" "}
          </p>
        </div>
      )}
      {status === "Refusé" && (
        <div
          id="finalDecisionContainer"
          className="flex items-center justify-center border-solid border-2 border-red-400 rounded mb-8 py-2 w-80"
        >
          <p className="font-texts text-red-400 font-bold">
            Décision finale : {status}{" "}
          </p>
        </div>
      )}
    </div>
  );
}

FinalStatus.propTypes = {
  status: PropTypes.string,
};

FinalStatus.defaultProps = {
  status: "",
};

export default FinalStatus;
