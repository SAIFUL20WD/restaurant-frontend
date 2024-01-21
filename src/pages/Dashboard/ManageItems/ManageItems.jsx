import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    // const handleMakeAdmin = (id) => {
    //     fetch(`${API}/users/admin/${id}`, {
    //         method: "PATCH",
    //         // headers: {"content-type": "application/json"}
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.modifiedCount){
    //             refetch()
    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'success',
    //                 title: 'Make Admin Successfull',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     })
    // }

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
                axiosSecure.delete(`/menu/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
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
        <>
            <Helmet><title>Bistro | Manage Items</title></Helmet>
            <div className="w-full">
                <SectionTitle heading="Manage Items" subHeading="Hurry Up!" />
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Catgory</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            { menu.map((item, idx) => {
                                return (
                                <tr key={item._id}>
                                    <td>{idx+1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td className="uppercase">{item.category}</td>
                                    <td className="text-right">{item.price}</td>
                                    <td><button className="btn btn-ghost btn-xs">U</button></td>
                                    <td><button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-sm bg-red-600 text-white"><FaTrashAlt /></button></td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ManageItems;