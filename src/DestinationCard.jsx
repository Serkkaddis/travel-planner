const DestinationCard = ({ destination, onClick }) => {
    return (
      <div
        className="border p-4 rounded shadow hover:shadow-lg cursor-pointer"
        onClick={() => onClick(destination)}
      >
        <img src={destination.image} alt={destination.city} className="rounded mb-2" />
        <h2 className="font-bold text-lg">{destination.city}</h2>
        <p>{destination.country}</p>
      </div>
    );
  };
  
  export default DestinationCard;
  