import React from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";

export default function SignIn(){

    const formik = useFormik({
        initialValues:{
            email: "",
            password:"",
        },
        onSubmit: (values) =>{


        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email()
                .required("Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 chars minimum.")
                .matches(/(?=.*[0-9])/, "Password must contain a number.")
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
                    onChange={formik.handleChange}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email ? formik.errors.password && <p className={'signIn__error'}>{formik.errors.password}</p> : null}
                <button type="submit">
                    Login
                </button>
            </div>
        </form>
    )
}


