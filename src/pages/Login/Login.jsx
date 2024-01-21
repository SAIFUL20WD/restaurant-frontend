import { useContext, useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(result => {
            console.log(result.user);
            Swal.fire({
                title: 'Login Successful',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            navigate(from, {replace: true});
        })
    }

    const handleValidateCaptcha = (e) => {
        const value = e.target.value;
        if (validateCaptcha(value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 md:w-1/2 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="captcha" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary" disabled={disabled} value="Login" />
                            </div>
                        </form>
                        <label className="label mx-auto">
                            <p><small>New here? <Link to="/signup" className="label-text-alt link link-hover">Create an account</Link></small></p>
                        </label>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;