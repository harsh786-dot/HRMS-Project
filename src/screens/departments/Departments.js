import { useState, useEffect } from "react";
import DepartmentCard from "../../component/departmentCard/DepartmentCard";
import "./Departments.css";
import SearchBox from "../../component/searchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../../features/departmentSlice/DepartmentSlice";

const Departments = () => {

    const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.department);
    const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchDepartment());
    // setCurrentPage(1);
  }, [dispatch])

  if (loading) return <p>Loading Employees...</p>
  if (error) return <p>Error: {error}</p>

    const filteredDepartments = (Array.isArray(data) ? data : []).filter(
        (department) =>
            department.name?.toLowerCase().includes(search.toLowerCase())
    );

    {
        filteredDepartments.map((department) => (
            <DepartmentCard key={department.id} department={department} />
        )) 
    }

    return (
        <div className="departments-container">
            <div className="search-box">

                <SearchBox
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    } />
            </div>

            <div className="departments-grid">
                {filteredDepartments.map((department) => (
                    <DepartmentCard
                        key={department.id}
                        department={department}
                    />
                ))}
            </div>

        </div>
    );
};

export default Departments;