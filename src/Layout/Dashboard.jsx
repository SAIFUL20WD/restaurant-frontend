import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaHamburger, FaUtensils, FaBook, FaUsers } from 'react-icons/fa';
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    // const isAdmin = true;
    const [isAdmin] = useAdmin();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#D1A05A]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full">
                    {
                        isAdmin ? 
                        <>
                            <li><NavLink to="/dashboard/adminhome"><FaHome />Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/additem"><FaUtensils />Add Items</NavLink></li>
                            <li><NavLink to="/dashboard/manageitems"><FaWallet />Manage Items</NavLink></li>
                            <li><NavLink to="/dashboard/bookings"><FaBook />Manage Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/allusers"><FaUsers />All Users</NavLink></li>
                        </> : 
                        <>
                            <li><NavLink to="/dashboard/home"><FaHome />User Home</NavLink></li>
                            <li><NavLink to="/dashboard/reservations"><FaCalendarAlt />Reservations</NavLink></li>
                            <li><NavLink to="/dashboard/history"><FaWallet />Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/mycart"><FaShoppingCart />My Cart</NavLink></li>
                        </>
                    }
                    
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome />Home</NavLink></li>
                    <li><NavLink to="/menu"><FaHamburger />Menu</NavLink></li>
                    <li><NavLink to="/order/salad">Order</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;