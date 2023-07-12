import React, {useContext, useEffect, useState} from "react";
import {useMessage} from "../hooks/MessageHook";
import {useHttp} from "../hooks/HttpHook";

import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";

export const AuthPage = () => {
  const {login} = useContext(AuthContext);
  const message = useMessage();
  const {request, loading, error, clearError} = useHttp();
  const userRoles = ['SHIPPER', 'DRIVER'];
  const [role, setRole] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [registration, setRegistration] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  // useEffect(() => {
  //   message(error);
  //   clearError();
  // }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const registerHandler = async () => {
    try {
      const registerForm = {
        ...form,
        role,
      };
      const data = await request('/api/auth/register', 'POST', {...registerForm});
      message(data.message);
    } catch (e) {
      message(e.message, 'message_error');
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      login(data.jwt_token, data.userId);
      message(data.message);
    } catch (e) {
      message(e.message, 'message_error');
    }
  };

  const resetPassword = async () => {
    try {
      const data = await request('/api/auth/forgot_password', 'POST', {
        email: form.email,
      });
      message(data.message);
      setForgotPassword(false);
    } catch (e) {
      message(e.message, 'message_error');
    }
  };

  const createNewAccount = () => {
    setRegistration(!registration);
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card purple lighten-2">
          <div className="card-content white-text">
            <span className="card-title">Login Page</span>
            <div>
              <div className="input-field">
                <input className="yellow-input"
                       name="email"
                       id="email"
                       type="email"
                       value={form.email}
                       onChange={changeHandler}
                />
                <label htmlFor="username">Email</label>
              </div>
              {!forgotPassword && <div className="input-field">
                <input className="yellow-input"
                       name="password"
                       id="password"
                       type="password"
                       value={form.password}
                       onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>}
              {registration && <div className="input-field">
                <h6>Role</h6>
                <div>
                  <label>
                    <input name="group1"
                           type="radio"
                           value={userRoles[0]}
                           onChange={event => setRole(event.target.value)}
                    />
                    <span style={{color: 'white'}}>{userRoles[0]}</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input name="group1"
                           type="radio"
                           value={userRoles[1]}
                           onChange={event => setRole(event.target.value)}
                    />
                    <span style={{color: 'white'}}>{userRoles[1]}</span>
                  </label>
                </div>
              </div>}
              {!forgotPassword && <div>
                <label>
                  <input type="checkbox"
                         onChange={createNewAccount}
                  />
                  <span style={{color: 'white'}}>Don't have an account?</span>
                </label>
              </div>}
              {!registration && <div>
                <label>
                  <input type="checkbox"
                         onChange={() => setForgotPassword(!forgotPassword)}
                  />
                  <span style={{color: 'white'}}>Forgot your password?</span>
                </label>
              </div>}
            </div>
          </div>
          <div className="card-action">
            {!forgotPassword && !registration && <button className="btn yellow waves-effect waves-purple darken-4"
                     style={{marginRight: 10}}
                     onClick={loginHandler}
                     disabled={registration || forgotPassword}
            >Log In</button>}
            {!forgotPassword && registration && <button className="btn blue waves-effect waves-purple darken-2"
                     style={{marginRight: 10}}
                     onClick={registerHandler}
                     disabled={!registration}
            >Sing In</button>}
            {forgotPassword && <button className="btn brown waves-effect waves-purple darken-2"
                     onClick={resetPassword}
                     disabled={!forgotPassword}
            >reset password</button>}
          </div>
        </div>
      </div>
    </div>
  )
};