import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {API} from "../../../config.js";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const {createUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            const savedUser = {name: data.name, email: data.email};
            fetch(`${API}/users`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(savedUser)
            })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Sign Up Successfull, Login Now',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/");
                }
            })
        })
    }
    

    return (
        <>
            <Helmet>
                <title>Bistro | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/ })} name="password" placeholder="password" className="input input-bordered" required />
                                {errors.password && <span className="text-red-600">Password must be more than 6 character</span>}
                                {errors.password?.type === "pattern" && <span className="text-red-600">Password must match pattern</span>}
                            </div>
                            <label className="label">
                                <p><small>Already have an account? </small><Link to="/login" className="label-text-alt link link-hover">Login</Link></p>
                            </label>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;