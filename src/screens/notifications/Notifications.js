import { useEffect } from 'react'
import "./Notifications.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from '../../features/notificationSlice/NotificationSlice';

const Notifications = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.notification);

    useEffect(() => {
        dispatch(fetchNotification());
    }, [dispatch])

    if (loading) return <p>Loading Employees...</p>
    if (error) return <p>Error: {error}</p>


    return (
        <>
            <div className='notification-container'>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((notification) => (

                        <div className='notification-row' key={notification.id}>


                            <div className='notification-info'>
                                <div className='notify-img'>
                                    <img src="" alt="" />
                                </div>

                                <div className='notify-info'>
                                    <h3>{notification.title}</h3>
                                    <p>
                                        {notification.message}
                                    </p>
                                </div>
                            </div>

                            <div className='notify'>
                                <p>{notification.created_at}</p>
                            </div>

                        </div> 
                    ))
                ) : (
                    <p>No notifications available.</p>
                )}

            </div>
        </>
    );
};

export default Notifications
