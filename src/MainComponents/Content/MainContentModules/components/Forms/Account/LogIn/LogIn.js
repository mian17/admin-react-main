import classes from "./Login.module.css";
import { useContext, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { SignInSchema } from "../../../../../../../common/utils/validationSchema";
import AuthContext from "../../../../../../../store/auth-context";
import { useNavigate } from "react-router-dom";
import signInHandler from "./server/signInHandler";

const LogIn = () => {
  const [error, setError] = useState("");
  const { setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const userInput = {
      email: values.email,
      password: values.password,
    };

    signInHandler(userInput, navigate, setError, setLoggedIn, setSubmitting);
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
                onSubmit={handleSubmit}
              >
                {({ isValid, isSubmitting }) => (
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
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!isValid || isSubmitting}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
