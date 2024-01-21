import { useQuery } from "@tanstack/react-query";
import {API} from "../../../../config.js";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";



const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users`)
          return res.data
        },
    })

    const handleMakeAdmin = (id) => {
        fetch(`${API}/users/admin/${id}`, {
            method: "PATCH",
            // headers: {"content-type": "application/json"}
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Make Admin Successfull',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API}/users/${id}`, {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount > 0){
                        refetch()
                        Swal.fire(
                            'Deleted!',
                            'item has been deleted from cart',
                            'success'
                        )
                    }
                })

            }
        })
    }

    return (
        <div className="w-full p-5">
            <Helmet>
                <title>Bistro | All Users</title>
            </Helmet>
            <h3 className="text-3xl font-semibold">Total Users: {users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, idx) => {
                            return (
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user?.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user._id)} className="btn bg-orange-400"><FaUserShield /></button>}</td>
                                <td><button onClick={() => handleDelete(user._id)} className="btn btn-ghost btn-sm bg-red-600 text-white"><FaTrashAlt /></button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;