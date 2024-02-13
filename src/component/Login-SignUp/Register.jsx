import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import "./Register.css";
import { useMutation } from "react-query";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../lib/api/login-signup";
import Loader from "../../loader/Loader";

const Register = () => {
  //?Navigation========
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["register-key"],
    mutationFn: (values) => registerApi(values),
    onSuccess: (respond) => {
      console.log("react: ", respond);
      navigate("/login");
    },
    onError: (e) => {
      console.log("react", e);
    },
  });

  if (isLoading) {
    <Loader />;
  }
  return (
    // <Formik
    //   initialValues={{
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     location: "",
    //     occupation: "",
    //   }}
    //   validationSchema={Yup.object({
    //     firstName: Yup.string()
    //       .max(15, "Must be 15 characters or less")
    //       .required(" First Name is Required"),
    //     lastName: Yup.string()
    //       .max(20, "Must be 20 characters or less")
    //       .required("Last Name is Required"),
    //     email: Yup.string()
    //       .email("Invalid email address")
    //       .required("Email is Required"),
    //     password: Yup.string()
    //       .required("No password provided.")
    //       .min(8, "Password is too short - should be 8 chars minimum.")
    //       .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

    //     location: Yup.string().required("Location is Requried"),
    //     occupation: Yup.string().required("Occupation is requried"),
    //   })}
    //   onSubmit={async (values) => {
    //     mutate(values);
    //   }}
    // >
    //   {(formik) => (
    //     <form onSubmit={formik.handleSubmit} className="register-form">
    //       <div className="register-form-parent">
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             textAlign: "center",
    //           }}
    //         >
    //           <h1 style={{ color: "#F4CE14" }}>Social-Network</h1>
    //           <h2 style={{ color: "#45474B" }}>SignUp</h2>
    //         </div>

    //         {/* //!firstName */}
    //         <div
    //           className="register-form-child register-FirstName-LastName"
    //           style={{ display: "flex", gap: "1rem" }}
    //         >
    //           <TextField
    //             label="FirstName"
    //             variant="filled"
    //             {...formik.getFieldProps("firstName")}
    //           />
    //           {formik.touched.firstName && formik.errors.firstName ? (
    //             <div className="error-msg">{formik.errors.firstName}</div>
    //           ) : null}

    //           {/* //!lastName */}
    //           <TextField
    //             label="LastName"
    //             variant="filled"
    //             {...formik.getFieldProps("lastName")}
    //           />
    //           {formik.touched.lastName && formik.errors.lastName ? (
    //             <div className="error-msg">{formik.errors.lastName}</div>
    //           ) : null}
    //         </div>

    //         {/* <div className="register-form-child"></div> */}

    //         {/* //!Email  */}
    //         <div className="register-form-child">
    //           <TextField
    //             style={{ width: "100%" }}
    //             label="Email"
    //             variant="filled"
    //             {...formik.getFieldProps("email")}
    //           />
    //           {formik.touched.email && formik.errors.email ? (
    //             <div className="error-msg">{formik.errors.email}</div>
    //           ) : null}
    //         </div>

    //         {/* //!password  */}
    //         <div className="register-form-child">
    //           <TextField
    //             style={{ width: "100%" }}
    //             label="Password"
    //             variant="filled"
    //             type="password"
    //             {...formik.getFieldProps("password")}
    //           />
    //           {formik.touched.password && formik.errors.password ? (
    //             <div className="error-msg">{formik.errors.password}</div>
    //           ) : null}
    //         </div>

    //         {/* //!location  */}
    //         <div className="register-form-child">
    //           <TextField
    //             style={{ width: "100%" }}
    //             label="Location"
    //             variant="filled"
    //             type="location"
    //             {...formik.getFieldProps("location")}
    //           />
    //           {formik.touched.location && formik.errors.location ? (
    //             <div className="error-msg">{formik.errors.location}</div>
    //           ) : null}
    //         </div>

    //         {/* //!occupation  */}
    //         <div className="register-form-child">
    //           <TextField
    //             style={{ width: "100%" }}
    //             label="Occupation"
    //             variant="filled"
    //             type="occupation"
    //             {...formik.getFieldProps("occupation")}
    //           />
    //           {formik.touched.occupation && formik.errors.occupation ? (
    //             <div className="error-msg">{formik.errors.occupation}</div>
    //           ) : null}
    //         </div>
    //         {/* //!navigate to login  */}
    //         <h4
    //           style={{ color: "blue", cursor: "pointer" }}
    //           onClick={() => navigate("/login")}
    //         >
    //           Already Have an account?
    //         </h4>
    //         {/* //!button  */}
    //         <Button type="submit" variant="contained">
    //           Submit
    //         </Button>
    //       </div>
    //     </form>
    //   )}
    // </Formik>

    <h1>No Can Do</h1>
  );
};

export default Register;
