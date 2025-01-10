const DestinationDetails = ({ destination }) => {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold">{destination.city}</h2>
        <p>{destination.country}</p>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Top Attractions</h3>
          <ul>
            {destination.attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Flight Offers</h3>
          {/* Add flight details */}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold">Hotels</h3>
          {/* Add hotel details */}
        </div>
      </div>
    );
  };
  
  export default DestinationDetails;
  