import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const AddItem = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        // console.log(data);

        const { name, price, category, recipe, imageURL } = data;
        const newItem = { name, price: parseFloat(price), category: category.toLowerCase(), recipe, image: imageURL }

        // console.log(newItem)

        axiosSecure.post('/menu', newItem)
        .then(res => {
            // console.log(res.data);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Item added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    };

    return (
        <>
        <Helmet><title>Bistro | Add Item</title></Helmet>
        <div className="w-full px-10 mb-10">
            <SectionTitle heading="Add an Item" subHeading="What's New" />
            <form className="bg-zinc-200 rounded p-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-3">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered w-full"
                        {...register("name", { required: true, maxLength: 120 })} />
                </div>
                <div className="flex my-3">
                    <div className="form-control w-full mr-5">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select className="select select-bordered" {...register("category", { required: true })}>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Salad</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" placeholder="Price" className="input input-bordered w-full"
                            {...register("price", { required: true })} />
                    </div>
                </div>
                <div className="form-control my-3">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details*</span>
                    </label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Bio" {...register("recipe", { required: true })}></textarea>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text font-semibold">Item Image</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" {...register("image")} />
                    <span>OR</span>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Item Image URL*</span>
                        </label>
                        <input type="text" placeholder="URL" className="input input-bordered w-full"
                            {...register("imageURL", { required: true })} />
                    </div>
                </div>
                <input type="submit" value="Add Item" className="btn btn-md mt-5" />
            </form>
        </div>
        </>
    );
};

export default AddItem;



// Image hosting imgbb

// const [axiosSecure] = useAxiosSecure();
// const { register, handleSubmit, reset, formState: { errors } } = useForm();

// const img_hosting_url = `https://api.imgbb.com/1/upload?key=imgbbtoken`

// const onSubmit = data => {
//     console.log(data);

//     const formData = new FormData();
//     formData.append('image', data.image[0])

//     fetch(img_hosting_url, {
//         method: 'POST',
//         body: formData
//     })
//     .then(res => res.json())
//     .then(imgResponse => {
//         if(imgResponse.success){
//             const imgURL = imgResponse.data.display_url;
//             const {name, price, category, recipe} = data;
//             const newItem = {name, price: parseFloat(price), category, recipe, image:imgURL}

//             console.log(newItem)
//             axiosSecure.post('/menu', newItem)
//             .then(data => {
//                 console.log('after posting new menu item', data.data)
//                 if(data.data.insertedId){
//                     reset();
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'success',
//                         title: 'Item added successfully',
//                         showConfirmButton: false,
//                         timer: 1500
//                       })
//                 }
//             })
//         }
//     })
// };