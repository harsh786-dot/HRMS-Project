import React, { useState, useEffect } from "react";
import "./Holidays.css";
import Button from "../../component/button/Button";
import Addholiday from "./Addholiday";
// import axios from "axios";
import SearchBox from "../../component/searchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchHoliday } from "../../features/holidaySlice/HolidaySlice";

const Holidays = () => {

    const dispatch = useDispatch();
    const { holidays, loading, error } = useSelector(
        (state) => state.holidays
    );
    console.log("Holiday data:", holidays);
    const [showAddHolidays, setShowAddHolidays] = useState(false)
    const [search, setSearch] = useState("");
    // const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(fetchHoliday());
    }, [dispatch])

    if (loading) return <p>Loading Holidays...</p>
    if (error) return <p>Error: {error}</p>

    const filteredHolidays = (Array.isArray(holidays) ? holidays : []).filter(
        (item) =>
            (item.holiday_name || item.name || "")
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (
        <div className="holidays-container">

            <div className="holiday-top">

                <div className="holiday-search">

                    <SearchBox
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>

                <Button
                    icon="⊕"
                    text="Add New Holiday"
                    width="220px"
                    height="50px"
                    backgroundColor="#7152F3"
                    border="1px solid #7152F3"
                    color="#ffff"
                    borderRadius="10px"
                    onClick={() => setShowAddHolidays(true)}
                />

            </div>

            <div className="holiday-table">

                <div className="holiday-row holiday-heading">
                    <div>Date</div>
                    <div>Day</div>
                    <div>Holiday Name</div>
                </div>

                {filteredHolidays.map((holiday, index) => (
                    <div
                        className={`holiday-row ${holiday.type}`}
                        key={index}
                    >
                        <div>{holiday.date}</div>
                        <div>{holiday.day}</div>
                        <div>{holiday.holiday_name}</div>
                    </div>
                ))}

                <div className="holiday-legend">

                    <div>
                        <span className="dot upcoming-dot"></span>
                        Upcoming
                    </div>

                    <div>
                        <span className="dot past-dot"></span>
                        Past Holidays
                    </div>

                </div>

            </div>

            {showAddHolidays && <Addholiday
                onClose={() => setShowAddHolidays(false)} />}

        </div>
    );
};

export default Holidays;