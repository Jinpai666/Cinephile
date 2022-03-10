import React, {useEffect, useState} from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "../Firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn(){
    const[loginEmail, setLoginEmail] = useState("");
    const[loginPassword, setLoginPassword] = useState("");

    const changeEmailValue = (event) => {setLoginEmail(event.target.value)};
    const changePasswordlValue = (event) => {setLoginPassword(event.target.value)};

//firebase data
    const login = async () =>{
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user)
        } catch (error){
            console.log(error.message)
        }
    }

//navigate
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState();
    useEffect(() =>{
        auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
        })
        if(currentUser){
            navigate('/main')
        }


    }, [currentUser])

//formik
    const formik = useFormik(
        {
            initialValues:{
                email: "",
                password:"",
            },
            onSubmit: (values) =>{
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

    return (

        <form onSubmit={formik.handleSubmit} className={'signIn'} >
            <div className="signIn__container">
                <h1 className={'signIn__title'}>Filmoteka</h1>
                <label htmlFor="email">Email</label>
                <input
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
                {formik.touched.email ? formik.errors.email && <p className={'signIn__error'}>{formik.errors.email}</p> : null}
                <label htmlFor="password">Password</label>
                <input
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
                {formik.touched.password ? formik.errors.password && <p className={'signIn__error'}>{formik.errors.password}</p> : null}

                <button type="submit">
                    Sign In
                </button>
            </div>
            <div className="signIn__bottom-section">Don't have an account? <Link to='signup'> Sign Up!</Link></div>
        </form>
    )
}


