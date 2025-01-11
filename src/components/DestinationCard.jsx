import React from "react";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ destination, origin, departureDate }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded p-4 cursor-pointer"
      onClick={() => 
        navigate(`/destination/${destination.id}`, {
          state: { origin, departureDate }   
        })
      }
    >
      <h3 className="text-lg font-bold">{destination.name}</h3>
      <p>{destination.address?.countryName}</p>
      <p>Code: {destination.id}</p>
    </div>
  );
};

export default DestinationCard;
