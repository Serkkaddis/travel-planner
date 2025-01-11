import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DestinationCard = ({ destination = {}, origin, departureDate }) => {
  const navigate = useNavigate();
  const { id = "N/A", name = "Unknown Destination", address = {} } = destination;

  return (
    <div
      className="border rounded p-4 shadow-lg cursor-pointer hover:shadow-xl transition bg-gray-50 dark:bg-gray-800 dark:text-white"
      onClick={() =>
        navigate(`/destination/${id}`, {
          state: { origin, departureDate },
        })
      }
      role="button"
      aria-label={`View details for ${name}`}
    >
      <h3 className="text-lg md:text-xl font-bold">{name}</h3>
      <p className="text-sm md:text-base">{address.countryName || "Country not available"}</p>
      <p className="text-sm">Code: {id}</p>
    </div>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.shape({
      countryName: PropTypes.string,
    }),
  }),
  origin: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
};

export default DestinationCard;
