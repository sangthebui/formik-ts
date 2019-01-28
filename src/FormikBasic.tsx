import { FormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import Debug from './FormikDebug';


// data interface because this is Typescript
interface IData {
    email: string,
    name: string,
    phone: string
}
// data initialization
const data = {
    email: "",
    name: "",
    phone: ""
}


// data validation
// https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup
// computer science stuff
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const dataShape = {
    email: Yup.string().email("Invalid Emails").required("Required"),
    name: Yup.string().min(6, "Required 6 characters").required("Required"),
    phone: Yup.string().matches(phoneRegExp, "Invalid Phone number")
}
// use the shape for the schema
const dataSchema = Yup.object().shape(dataShape);


// Formik arguments
const formikArguments = {
    handleSubmit: ()=>{ console.log("I want emtpy")},
    initialValue: data,
    validationSchema: dataSchema,
}

// View
const View = (props: FormikProps<IData>) => (
    <>
    <form onSubmit={props.handleSubmit}>
        name:
        <input
          type="text"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
          name="name"
        />
            {props.errors.name && props.touched.name && <div id="feedback" className="error">name errors: {props.errors.name}</div>}
        email: 
        <input
          type="email"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.email}
          name="email"
        />
        {props.errors.email && props.touched.email && <div id="feedback" className="error">email errors: {props.errors.email}</div>}
        phone:
        <input
          type="text"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.phone}
          name="phone"
        />
        
        {props.errors.phone && props.touched.phone && <div id="feedback" className="error">phone errors: {props.errors.phone}</div>}
    </form>
    <Debug />
    </>
);


// Connect with formik
const MyEnhancedForm = withFormik(formikArguments)(View);


export default MyEnhancedForm;