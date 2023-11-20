import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import pic from "../../asserts/fli.jpg"
import { baseurl } from '../../util';
import Flights from '../flights/Flights';


const Landing = () => {
    const [selectedFrom, setSelectedFrom] = useState('');
    const [selectedTo, setSelectedTo] = useState('');
    const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
    const [selectedNoOfTickets, setSelectedNoOfTickets] = useState('');
    const [result, setResult] = useState(false);
    const [data, setData] = useState([]);

    const fromOptions = ['chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'];
    const toOptions = ['coimbatore', 'Chennai', 'Hyderabad', 'Bangalore'];
    const ticketOptions = Array.from({ length: 60 }, (_, index) => index + 1);

    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        e.preventDefault();

        console.log(selectedFrom, selectedTo, selectedDepartureDate, selectedNoOfTickets);
        axios.get(`${baseurl}/searchFlights?date=${selectedDepartureDate}&fromDestination=${selectedFrom}&toDestination=${selectedTo}`)
            .then((res) => {
                console.log(res);
                setData(res.data);
                setResult(true);
            }).catch((err) => {
                console.log(err);
            })
    };


    return (
        <>
            {
                result ==false? <div className="h-screen w-full">
                    <div className="bg-cover bg-center h-screen landingimg" >
                        <div className=" w-full h-1/3 text-8xl flex items-center justify-center"><h1>Go Ease</h1></div>

                    </div>
                </div> : ""
            }
           
            <div className="h-screen w-full">
                <div className="flex items-center justify-center h-screen bg-sky-200">
                    <form onSubmit={(e) => handleSearch(e)} className="bg-white items-center justify-center w-5/6 h-1/3 rounded-lg p-4 flex flex-col">
                        <div className='flex w-full' >
                            {/* First Search Input */}
                            <div className="flex-1 mr-2">
                                <select
                                    required
                                    value={selectedFrom}
                                    onChange={(e) => setSelectedFrom(e.target.value)}
                                    className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>
                                        Select From
                                    </option>
                                    {fromOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Second Search Input */}
                            <div className="flex-1 mr-2">
                                <select
                                    required
                                    value={selectedTo}
                                    onChange={(e) => setSelectedTo(e.target.value)}
                                    className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>
                                        Select To
                                    </option>
                                    {toOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Third Search Input */}
                            <div className="flex-1 mr-2">
                                <input
                                    required
                                    type="date"
                                    value={selectedDepartureDate}
                                    onChange={(e) => setSelectedDepartureDate(e.target.value)}
                                    className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                    placeholder="Departure"
                                />
                            </div>

                            {/* Fourth Search Input */}
                            <div className="flex-1">
                                <select
                                    required
                                    value={selectedNoOfTickets}
                                    onChange={(e) => setSelectedNoOfTickets(e.target.value)}
                                    className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
                                >
                                    <option value="" disabled>
                                        Select No Of Tickets
                                    </option>
                                    {ticketOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            className=" bg-blue-500 mt-6 text-white px-4 py-2 rounded-full focus:outline-none"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
            {
                result?<Flights data={data} 
                ticket={selectedNoOfTickets}/>:""
            }
        </>

    )
}

export default Landing

