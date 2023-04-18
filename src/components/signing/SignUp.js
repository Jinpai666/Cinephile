import React, {useEffect, useState} from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../Firebase-config'
import { useNavigate } from 'react-router-dom';

export default function SignUp(){

//Firebase data
    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");
    const[loginError, setLoginError] = useState('')
    const register = async () =>{
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error){
            console.log(error.message)
            setLoginError(error)
        }
    }
    const changeEmailValue = (event) => {setRegisterEmail(event.target.value)};
    const changePasswordValue = (event) => {setRegisterPassword(event.target.value)};

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
    const formik = useFormik({
        initialValues:{
            email: "",
            password:"",
            passwordConfirmation:"",
        },
        onSubmit: () =>{
            register();
            // loggedIn?.navigate('/main');
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email()
                .required("Required."),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number."),
            passwordConfirmation: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same."
            )
        }),
    });
//jsx
    return (
        <div className="form">
            <h1 className='form__logo'>CINEPHILE</h1>

            <form onSubmit={formik.handleSubmit} className='form__container' >
                <h2 className="form__header">Please provide the details for a new account.</h2>
                {loginError.message && <p className='form__error-field'>Email already used</p>}
                <div className="form__group field">
                    <input
                        className="form__field"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={event => {formik.handleChange(event);changeEmailValue(event);
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email ? formik.errors.email && <p className={'form__error'}>{formik.errors.email}</p> : null}
                    <label htmlFor="name" className="form__label">Email</label>
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
                            formik.handleChange(event);changePasswordValue(event);
                        }
                        }
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="name" className="form__label">Password</label>
                    {formik.touched.password ? formik.errors.password && <p className={'form__error'}>{formik.errors.password}</p> : null}
                </div>
                <div className="form__group field">
                    <input
                        className='form__field'
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        placeholder="Confirm your password"
                        value={formik.values.passwordConfirmation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="name" className="form__label">Password Confirmation</label>
                    {formik.touched.passwordConfirmation ? formik.errors.passwordConfirmation && <p className={'form__error'}>{formik.errors.passwordConfirmation}</p> : null}
                </div>

                <button
                    type="submit"
                    className='form__button'
                > Sign Up
                    {/*{auth.currentUser && <Link style={{textDecoration: 'none', color: 'white'}} to='/main'>Sign Up</Link>}*/}
                </button>

                {auth.currentUser ? <div>{auth.currentUser.email}</div> : null}
                <div className="form__bottom-section">Already have an account?
                    <Link className='form__link' to='/'> Sign In!</Link>
                </div>
            </form>


        </div>

    )
}


