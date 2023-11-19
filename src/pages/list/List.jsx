// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import flightDetails from '../../../src/flightDetails.json';

// const List = () => {
//   const navigate = useNavigate();

//   const handleBookFlight = (flightName) => {
//     console.log(`Booked ${flightName}`);
//     navigate('/addflights');
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-sky-200">
//       <div className="bg-white w-5/6 h-1/5 rounded-lg p-4 flex">
//         {flightDetails.map((flight, index) => (
//           <div key={index} className="flex flex-row p-4 w-full border border-gray-300 rounded-lg mx-2  items-center justify-evenly">
//             <div className="flex flex-col">
//             <div className='text-2xl font-bold mb-2'>Flight Name</div>
//             <div>{flight.flightName}</div>
//             </div>
//             <div className="flex flex-col">
//             <div className='text-2xl font-bold mb-2'>Date and Time</div>
//             <div>{flight.dateAndTime}</div>
//             </div>
//             <div className="flex flex-col">
//             <div className='text-2xl font-bold mb-2'>From</div>
//             <div>{flight.from}</div>
//             </div>
//             <div className="flex flex-col">
//             <div className='text-2xl font-bold mb-2'>To</div>
//             <div>{flight.to}</div>
//             </div>
//             <div className="flex flex-col">
//             <div className='text-2xl font-bold mb-2'>Rate per Person</div>
//             <div>{flight.ratePerPerson}</div>
//             </div>
            
//             <div>
//               <button
//                 onClick={() => handleBookFlight(flight.flightName)}
//                 className="bg-green-500 text-white px-4 py-2 rounded-full focus:outline-none mt-4"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default List;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseurl } from '../../util';

const Flights = () => {
  const [flightNameFilter, setFlightNameFilter] = useState('');
  const [data, setData] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleFilter = () => {
    axios.get(`${baseurl}/view?flightName=${flightNameFilter}`)
      .then((response) => {
        setData(response.data);
        setShowResults(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-sky-200">
      <div className="bg-white w-5/6 h-1/5 rounded-lg p-4 flex flex-col h-auto">
      <div className="mb-4">
          <label htmlFor="flightName" className="text-xl font-bold">Filter Flights by Name:</label>
          <div className="flex">
            <input
              type="text"
              id="flightName"
              value={flightNameFilter}
              onChange={(e) => setFlightNameFilter(e.target.value)}
              className="border-b border-gray-300 text-gray-900 sm:text-sm rounded-none w-full p-2.5"
              placeholder="Enter Flight Name"
            />
            <button
              onClick={handleFilter}
              className="bg-green-500 text-white px-4 py-2 rounded-full focus:outline-none ml-2"
            >
              Go
            </button>
          </div>
        </div>

        {showResults && (
          <div>
            {data.length > 0 ? (
              data.map((booking, index) => (
                <div key={index} className="flex flex-row p-4 w-full border border-gray-300 rounded-lg m-2 items-center justify-evenly">
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>User ID</div>
                    <div>{booking.userId}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>Flight Name</div>
                    <div>{booking.flightName}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>Date</div>
                    <div>{booking.date}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>Time</div>
                    <div>{booking.time}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>From</div>
                    <div>{booking.fromDestination}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>To</div>
                    <div>{booking.toDestination}</div>
                  </div>
                  <div className="flex flex-col">
                    <div className='text-2xl font-bold mb-2'>Total No of Seats</div>
                    <div>{booking.noOfSeats}</div>
                  </div>
                </div>
              ))
            ) : (
              <div>No results to display.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
