import { useEffect, useState } from 'react'
import SearchBox from '../../component/searchBox/SearchBox'
import Button from '../../component/button/Button'
import Pagination from '../../component/pagination/Pagination'
import "./Candidates.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCandidate } from '../../features/candidateSlice/CandidateSlice'

const Candidates = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(10);
    const dispatch = useDispatch();
      const { data, loading, error } = useSelector((state) => state.candidate);

    useEffect(() => {
        dispatch(fetchCandidate());
      }, [dispatch])
    
      if (loading) return <p>Loading Employees...</p>
      if (error) return <p>Error: {error}</p>
    
    const totalPages = Math.ceil(data.length / employeesPerPage);

    const startIndex = (currentPage - 1) * employeesPerPage;

    const currentData = data.slice(
        startIndex,
        startIndex + employeesPerPage
    );

    return (
        <div className='candidates-container'>
            <div className='candidates-head'>
                <div>
                    <SearchBox />
                </div>

                <div>
                    <Button
                        text="Export"
                        width="150px"
                        height="50px"
                        backgroundColor="#7152F3"
                        border="1px solid #7152F3"
                        color="#ffff"
                        borderRadius="10px"
                    />
                </div>
            </div>

            <div className='candidates-main'>

                <div className='candidates-row' >

                    <div>
                        <input type="checkbox" />
                    </div>
                    <span>Candidate Name</span>
                    <span>Applied For</span>
                    <span>Applied Date</span>
                    <span>Email Adrress</span>
                    <span>Mobile Number</span>
                    <span>Status</span>

                </div>

                {data.map((empolyee) => (
                    <div className='candidates-row candidates-header' key={empolyee.id}>

                        <div><input type="checkbox"/></div>
                        <div className='candidates-name'>
                            <img src={empolyee.profile_image} alt={empolyee.name} />
                            <span>{empolyee.name}</span>
                        </div>

                        <div>{empolyee.applied_for}</div>
                        <div>{empolyee.applied_date}</div>
                        <div>{empolyee.email} </div>
                        <div>{empolyee.mobile}</div>
                        <div>
                            <span
                                className={`status ${empolyee.status === "Selected"
                                    ? "selected"
                                    : empolyee.status === "In Process"
                                        ? "in-process"
                                        : empolyee.status === "Rejected"
                                            ? "rejected"
                                            : ""
                                    }`}
                            >
                                {empolyee.status} 
                            </span>
                        </div>
                    </div>
                ))}

            </div>
            <Pagination
                data={data}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                employeesPerPage={employeesPerPage}
                setEmployeesPerPage={setEmployeesPerPage}
                totalPages={totalPages}
            />

        </div>
    )
}

export default Candidates
