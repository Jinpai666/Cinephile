import React, {useEffect, useState} from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "../../Firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function SignIn(){
    const[loginEmail, setLoginEmail] = useState("");
    const[loginPassword, setLoginPassword] = useState("");
    const changeEmailValue = (event) => {setLoginEmail(event.target.value)};
    const changePasswordlValue = (event) => {setLoginPassword(event.target.value)};

//firebase data
    const[loginError, setLoginError] = useState('')
    const login = async () =>{
        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error){
            console.log(error.message)
            setLoginError(error)
        }
    }

//navigate
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            setCurrentUser(user)
        })
        if(currentUser){
            navigate('/main')
        }
        return() => unsubscribe
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])


//formik
    const formik = useFormik(
        {
            initialValues:{
                email: "",
                password:"",
            },
            onSubmit: () =>{
                console.log('siginin')
                login();
                // loggedIn?.navigate('/main');

            },
            validationSchema: Yup.object({
                email: Yup.string()
                    .email()
                    .required("Required"),
                password: Yup.string()
                    .required("No password provided."),
            }),
        });
//jsx
    return (
        <div className="form">
            <h1 className={"form__logo"}>Cinephile</h1>
            <form onSubmit={formik.handleSubmit} className="form__container" >
                <h2>Please enter your login details.</h2>
                {loginError.message &&  <p className="form__error-field">'Wrong email or password.'</p>}
                <div className="form__group field">

                    <input
                        className="form__field"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={event => {
                            formik.handleChange(event);
                            changeEmailValue(event);
                        }
                        }
                        onBlur={formik.handleBlur}
                    />
                    <label className="form__label" htmlFor="email">Email</label>
                    {formik.touched.email ? formik.errors.email && <p className='form__error'>{formik.errors.email}</p> : null}
                </div>
                <div className="form__group field">

                    <input
                        className="form__field"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={event => {
                            formik.handleChange(event);
                            changePasswordlValue(event);
                        }
                        }
                        onBlur={formik.handleBlur}
                    />
                    <label className="form__label" htmlFor="password">Password</label>
                    {formik.touched.password ? formik.errors.password && <p className={'form__error'}>{formik.errors.password}</p> : null}
                </div>





                <button className="form__button" type="submit">
                    Sign In
                </button>
                <div className="form__bottom-section">Don't have an account? <Link className="form__link" to='signup'> Sign Up!</Link></div>

            </form>
        </div>
    )
}


