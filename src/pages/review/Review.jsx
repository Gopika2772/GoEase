import React from 'react'
import flightDetails from '../../../src/flightDetails.json';
import { useNavigate } from 'react-router-dom';


const Review = () => {
    const navigate = useNavigate();
    const handleBookFlight = (flightName) => {
        // Implement booking logic here (if needed)

        // Redirect to the review page
        navigate('/landing');
    };
    return (
        <div className="flex items-center justify-center h-screen bg-sky-200">
            <div className=" h1 bg-white w-5/6 h-full rounded-lg p-4 flex">
                {flightDetails.map((flight, index) => (
                    <div key={index} className="flex flex-col p-4 w-full border border-gray-300 rounded-lg mx-2  items-center justify-evenly">
                        <div className="flex flex-row justify-evenly h-full w-full ">
                            <div className="flex flex-col">
                                <div>Flight Name</div>
                                <div>{flight.flightName}</div>
                            </div>

                            <div className="flex flex-col">
                                <div>Date and Time</div>
                                <div>{flight.dateAndTime}</div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-evenly h-full w-full ">
                            <div className="flex flex-col">
                                <div>From</div>
                                <div>{flight.from}</div>
                            </div>
                            <div className="flex flex-col">
                                <div>To</div>
                                <div>{flight.to}</div>
                            </div>



                        </div>
                        <div className="flex flex-row justify-evenly h-full w-full ">

                            <div className="flex flex-col">
                                <div>Rate per Person</div>
                                <div>{flight.ratePerPerson}</div>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => handleBookFlight(flight.flightName)}
                                className="bg-green-500 text-white px-4 py-2 rounded-full focus:outline-none mt-4"
                            >
                                Conform Booking
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default Review