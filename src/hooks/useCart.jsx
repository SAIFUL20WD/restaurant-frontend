import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure.jsx";
import useAuth from "./useAuth.jsx";
// import {API} from "../../config.js";


const useCart = () => {
    const {user} = useAuth();
    // const {user} = useContext(AuthContext);
    // const token = localStorage.getItem("access-token");
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        // queryFn: async () => {
        //     const response = await fetch(`${API}/carts?email=${user.email}`, {
        //         headers: {authorization: `Bearer ${token}`}
        //     })
        //     if (!response.ok) {
        //     throw new Error('Network response was not ok')
        //     }
        //     return response.json()
        // },
        queryFn: async () => {
            const response = await axiosSecure.get(`/carts?email=${user.email}`)
            return response.data;
        },
    })
    return [cart, refetch];
}

export default useCart;