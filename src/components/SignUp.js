import React, {useEffect, useState} from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase-config'
import { useNavigate } from 'react-router-dom';
export default function SignUp(){


//Firebase data
    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const register = async () =>{
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user)
        } catch (error){
            console.log(error.message)
        }
    }
    const changeEmailValue = (event) => {setRegisterEmail(event.target.value)};
    const changePasswordValue = (event) => {setRegisterPassword(event.target.value)};

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
    const formik = useFormik({
        initialValues:{
            email: "",
            password:"",
            passwordConfirmation:"",
        },
        onSubmit: () =>{
            console.log('registering')
            register();
            // loggedIn?.navigate('/main');
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email()
                .required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
            passwordConfirmation: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
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
                        changePasswordValue(event);
                        }
                    }
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password ? formik.errors.password && <p className={'signIn__error'}>{formik.errors.password}</p> : null}
                <label htmlFor="passwordConfirmation">Password Confirmation</label>
                <input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Confirm your password"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.passwordConfirmation ? formik.errors.passwordConfirmation && <p className={'signIn__error'}>{formik.errors.passwordConfirmation}</p> : null}
                <button
                    type="submit"

                > Sign Up
                    {/*{auth.currentUser && <Link style={{textDecoration: 'none', color: 'white'}} to='/main'>Sign Up</Link>}*/}
                </button>
                {auth.currentUser ? <div>{auth.currentUser.email}</div> : null}
            </div>
            <div className="signIn__bottom-section">Already have an account? <Link to='/'> Sign In!</Link></div>
        </form>
    )
}


