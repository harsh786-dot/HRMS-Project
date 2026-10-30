import  { useEffect, useState } from 'react'
import SearchBox from '../../component/searchBox/SearchBox'
import Button from '../../component/button/Button'
import "./Payroll.css"
import Pagination from '../../component/pagination/Pagination'
import { useDispatch, useSelector } from "react-redux";
import { fetchPayRoll } from '../../features/payRollSlice/PayRollSlice'

const Payroll = () => {

    const dispatch = useDispatch();
    const {data = [], loading, error} = useSelector((state) => state.payRoll)
    const [currentPage, setCurrentPage] = useState(1);
const [employeesPerPage, setEmployeesPerPage] = useState(10);

 useEffect(() => {
      dispatch(fetchPayRoll());
      setCurrentPage(1);
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
        <div className='payroll-container'>
            <div className='payroll-head'>
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

            <div className='payroll-main'>

                <div className='payroll-row'>
                    <span>Employee Name</span>
                    <span>CTC</span>
                    <span>Salary Per Month</span>
                    <span>Deduction</span>
                    <span>Status</span>

                </div>

                {data.map((empolyee, index) => (
                    <div className='payroll-row payroll-header'
                        key={empolyee.id ?? index}
                    >

                        <div className='payroll-name'>
                            <img src={empolyee.image} alt={empolyee.employee_name} />
                            <span>{empolyee.employee_name}</span>
                        </div>

                        <div>{empolyee.ctc}</div>
                        <div>{empolyee.salary_per_month}</div>
                        <div>{empolyee.deduction} </div>
                        <div> 
                            <span
                                className={
                                    empolyee.status === "Completed"
                                        ? "status completed"
                                        : "status pending"
                                }
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

export default Payroll
