import React, { useEffect, useState } from "react";
import "./InfoProjects.css";
import axios from "axios";
// import SearchBox from "../../component/searchBox/SearchBox";

const fetchSkills = async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/c/1dfe-4250-4e27-b4e7"
    );
    return response.data;
  }
  catch (err) {
    throw err;
  }
}


const InfoProjects = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchSkills();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const totalPages = Math.ceil(data.length / employeesPerPage);

  const startIndex = (currentPage - 1) * employeesPerPage;

  const currentData = data.slice(
    startIndex,
    startIndex + employeesPerPage
  );


  return (
    <div className="attendance-container">

      <div className="attendance-header">

        {/* <SearchBox /> */}
      </div>

      <div className="attendance-table">

        <div className="attendance-rowss table-header">
          <div>Sr. No.</div>
          <div>Project Name</div>
          <div>Start Date</div>
          <div>Finish Date</div>
          <div>Status</div>
        </div>

        {currentData.map((employee, index) => (
          <div className="attendance-rowss" key={index}>

            <div className="employee-namess">
              {/* <img
                src={employee.image}
                alt={employee.name}
              /> */}

              <span><p>1</p></span>
            </div>

            <div><p>Amongus - Discovery Phase</p></div>

            <div>Feb 01,2023</div>

            <div>Mar 05,2023</div>
            <div>
              <span
                className={
                  employee.status === "On Time"
                    ? "status on-time"
                    : "status late"
                }
              >
                {employee.status}
              </span>
            </div>

          </div>
        ))}

        <div className="pagination">

          <div className="showing-select">
            <span>Showing</span>

            <select
              value={employeesPerPage}
              onChange={(e) => {
                setEmployeesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>


          <div className="pagination-info">
            Showing {data.length === 0 ? 0 : startIndex + 1}
            {" "}to{" "}
            {Math.min(startIndex + employeesPerPage, data.length)}
            {" "}out of {data.length} records
          </div>


          <div className="pagination-buttons">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              ›
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default InfoProjects;