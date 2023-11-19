import React from 'react';
import { useNavigate } from 'react-router-dom';
import flightDetails from '../../../src/flightDetails.json';

const List = () => {
  const navigate = useNavigate();

  const handleBookFlight = (flightName) => {
    // Implement booking logic here
    console.log(`Booked ${flightName}`);
    navigate('/addflights');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-sky-200">
      <div className="bg-white w-5/6 h-1/5 rounded-lg p-4 flex">
        {flightDetails.map((flight, index) => (
          <div key={index} className="flex flex-row p-4 w-full border border-gray-300 rounded-lg mx-2  items-center justify-evenly">
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>Flight Name</div>
            <div>{flight.flightName}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>Date and Time</div>
            <div>{flight.dateAndTime}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>From</div>
            <div>{flight.from}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>To</div>
            <div>{flight.to}</div>
            </div>
            <div className="flex flex-col">
            <div className='text-2xl font-bold mb-2'>Rate per Person</div>
            <div>{flight.ratePerPerson}</div>
            </div>
            
            <div>
              <button
                onClick={() => handleBookFlight(flight.flightName)}
                className="bg-green-500 text-white px-4 py-2 rounded-full focus:outline-none mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
