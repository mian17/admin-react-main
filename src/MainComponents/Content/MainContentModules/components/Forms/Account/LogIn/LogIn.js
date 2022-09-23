import classes from "./Login.module.css";
import { useContext, useState } from "react";
import apiClient from "../../../../../../../api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SignInSchema } from "../../../../../../../common/utils/validationSchema";
import AuthContext from "../../../../../../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { laravelSanctumConfig } from "../../../../../../../common/utils/api-config";

const LogIn = () => {
  // useEffect(() => {
  //   apiClient.get("/sanctum/csrf-cookie").then(() => {
  //     apiClient
  //       .post("/login", userInput)
  //       .then((response) => {
  //         if (response.status === 201) {
  //           setErrors(null);
  //           localStorage.setItem(
  //             "personalAccessToken",
  //             JSON.stringify(response.data.token)
  //           );
  //           localStorage.setItem("loggedIn", JSON.stringify(true));
  //           setLoggedIn({
  //             loggedIn: true,
  //             personalAccessToken: JSON.parse(
  //               localStorage.getItem("personalAccessToken")
  //             ),
  //           });
  //           navigate("/");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         if (err) {
  //           const errorMessage = err.response.data.message;
  //           // const errorArr = [];
  //           // for (const property in errorsObj) {
  //           //   errorArr.push(errorsObj[property]);
  //           // }
  //           setErrors(errorMessage);
  //         }
  //       });
  //   });
  // });
  const [error, setError] = useState("");
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const logInHandler = async (values) => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.post(
        "/admin/login",
        {
          email: values.email,
          password: values.password,
        },
        laravelSanctumConfig
      );

      localStorage.setItem(
        "personalAccessToken",
        JSON.stringify(response.data.token)
      );
      localStorage.setItem("loggedIn", JSON.stringify(true));
      setLoggedIn({
        loggedIn: true,
        personalAccessToken: JSON.parse(
          localStorage.getItem("personalAccessToken")
        ),
      });
      navigate("/admin");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className={classes["center_div"]}>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="/src/pages#" className="h1">
                Wieder_ Markt <b>Admin</b>
              </a>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Để tiếp tục, bạn cần đăng nhập</p>
              {error && error.length > 0 && (
                <div className="alert alert-danger" role="alert">
                  <i className="icon fas fa-ban"></i> {error}
                </div>
              )}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={logInHandler}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="input-group mb-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="example@example.com"
                        autoFocus
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-envelope"></span>
                        </div>
                      </div>
                    </div>
                    <div className="input-group ml-2 mb-3">
                      <ErrorMessage name="email">
                        {(msg) => <div className="text-danger">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="input-group mb-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span className="fas fa-lock"></span>
                        </div>
                      </div>
                    </div>
                    <div className="input-group ml-2 mb-3">
                      <ErrorMessage name="password">
                        {(msg) => <div className="text-danger">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div className="row px-2 mb-2">
                      {/*<div className="col-7">*/}
                      {/*  <div className="icheck-primary text-left">*/}
                      {/*    <input type="checkbox" id="remember" />*/}
                      {/*    <label htmlFor="remember">Ghi nhớ tôi</label>*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                      >
                        Đăng nhập
                        {isSubmitting && (
                          <div
                            className="spinner-border text-light spinner-border-sm ml-1"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              {/*<p className="mb-0">*/}
              {/*  /!*<a href="/#" className="text-center">*!/*/}
              {/*  /!*  Đăng ký tài khoản mới*!/*/}
              {/*  /!*</a>*!/*/}
              {/*</p>*/}
              <p className="mb-1">
                <a href="/src/pages">Quên mật khẩu</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
