import "./Pagination.css";

const Pagination = ({
    data = [],
    currentPage,
    setCurrentPage,
    employeesPerPage,
    setEmployeesPerPage,
    totalPages,
}) => {

    const startIndex = (currentPage - 1) * employeesPerPage;
    return (
        <div className="pagination">
            <div className="showing-select">
                <span>Showing</span>
                <select
                    value={employeesPerPage}
                    onChange={(e) => {
                        setEmployeesPerPage(Number(e.target.value));
                        setCurrentPage(1);}}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>

            <div className="pagination-info">
                Showing{" "}
                {data.length === 0 ? 0 : startIndex + 1}
                {" "}to{" "}
                {Math.min(
                    startIndex + employeesPerPage,
                    data.length
                )}
                {" "}out of {data.length} records
            </div>
            <div className="pagination-buttons">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}>
                    ‹
                </button>

                {Array.from(
                    { length: totalPages },
                    (_, index) => (
                        <button
                            key={index}
                            className={
                                currentPage === index + 1
                                    ? "active"
                                    : "" }
                            onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1) }>
                    ›
                </button>
            </div>
        </div>
    );
};

export default Pagination;