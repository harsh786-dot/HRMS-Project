import { useEffect } from 'react';
import "./Data.css";
import hey from "../../assets/icons/ic_dashboard.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from '../../features/summarySlice/SummarySlice';

const Data = () => {
      const dispatch = useDispatch();
      const { data, loading, error } = useSelector((state) => state.summary);
  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch])

  if (loading) return <p>Loading Employees...</p>
  if (error) return <p>Error: {error}</p>

    return ( 

        <div className="data-container">
            {data.map((post, index) => (
                <div className="data-box" key={index}>
                    <div className="icon-text">
                        <span>
                            <img src={hey} alt="" />
                        </span>
                        <h3>{post.text}</h3>
                    </div>

                    <div className="value-positive">
                        <h1>{post.value}</h1>
                    </div>

                    <div className="date">
                        <p>{post.date}</p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default Data;