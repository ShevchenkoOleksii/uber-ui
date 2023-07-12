import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/MessageHook";
import {DatePickers} from "../components/DatePicker/DatePicker";
import {Snackbars} from "../components/Alert";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const {token, logout} = useContext(AuthContext);
  const {loading, request} = useHttp();
  const message = useMessage();
  const [readyToDelete, setReadyToDelete] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Hello!');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const fetchedUser = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setUserProfile(fetched.user);
    } catch (e) {

    }
  }, [token]);

  const changePassword = async (event) => {
    event.preventDefault();
    setAlert(false);
    try {
      const fetched = await request('/api/users/me/password', 'PATCH', {
          oldPassword,
          newPassword
        },
        {
          Authorization: `Bearer ${token}`
        });
      setOldPassword('');
      setNewPassword('');
      message(fetched.message);
      setAlertMessage(fetched.message);
      setSeverity('success');
      setAlert(true);
    } catch (e) {
      setOldPassword('');
      setNewPassword('');
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  };

  const deleteAccount = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'DELETE', null,
        {
          Authorization: `Bearer ${token}`
        });
      logout();
      navigate("api/auth", {replace: true});
      message(fetched.message);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  }, [token]);

  useEffect(() => {
    fetchedUser();
  }, [fetchedUser]);

  if (!userProfile) {
    return <Loader/>
  }

  const getTime = (date) => {
    const currentDate = new Date(Date.now()).getTime();
    const createdDate = new Date(date).getTime();
    let result = ((currentDate - createdDate) / 1000);

    if (result < 60) {
      return `${result.toFixed(0)} seconds ago`;
    } else if (result >= 60 && result < 3600) {
      return `${(result / 60).toFixed(0)} minutes ago`;
    } else {
      const hours = Math.floor(result / 3600);
      const minutes = ((result - hours * 3600) / 60).toFixed(0);

      return `${hours} hour(s) and ${minutes} minute(s) ago`;
    }
  };

  return (
    <div className="row">
      {alert && <Snackbars show={alert} message={alertMessage} severity={severity}/>}
      <div className="col s6 offset-s3">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              {/*<h5>User Profile</h5>*/}
              <table className="load-data">
                <tbody>
                <tr>
                  <th>Email</th>
                  <td>{userProfile.email}</td>
                </tr>
                <tr>
                  <th>ID</th>
                  <td>{userProfile._id}</td>
                </tr>
                {/*<tr>*/}
                  {/*<th>Created Date</th>*/}
                  {/*<td colSpan={2}><DatePickers data={userProfile.created_date} labelValue={'Created Date'}/></td>*/}
                  {/*<td>{`${new Date(userProfile.created_date).toLocaleTimeString()} ${new Date(userProfile.created_date).toLocaleDateString()}`}</td>*/}
                {/*</tr>*/}
                </tbody>
              </table>
              <DatePickers data={userProfile.created_date} labelValue={'Created Date'}/>
              <small>{getTime(userProfile.created_date)}</small>
            </div>
            <div className="card-action">
              <div className="input-field col s6" style={{marginTop: '5px', marginBottom: '5px'}}>
                <input id="oldPassword"
                       type="password"
                       value={oldPassword}
                       onChange={(e) => setOldPassword(e.target.value)}
                       className="validate"/>
                <label htmlFor="oldPassword">Old Password</label>
              </div>
              <div className="input-field col s6" style={{marginTop: '5px', marginBottom: '5px'}}>
                <input id="newPassword"
                       type="password"
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}
                       className="validate"/>
                <label htmlFor="newPassword">New Password</label>
              </div>
              <p>
                <label>
                  <input type="checkbox"
                         onChange={() => setReadyToDelete(!readyToDelete)}
                  />
                  <span>Are you sure you want to delete your account?</span>
                </label>
              </p>
              <button className="btn red darken-1"
                      onClick={deleteAccount}
                      disabled={!readyToDelete}
                      style={{marginRight: '10px', marginTop: 10}}
              >Delete Account!
              </button>
              <a href="/"
                 onClick={changePassword}
                 className="btn orange darken-2"
                 style={{marginRight: '10px', marginTop: 10}}
              >Change Password</a>
            </div>
          </div>
        </div>
      </div>

      {/*<div className="col s10 offset-s1">*/}
      {/*  <div className="card horizontal">*/}
      {/*    <div className="card-stacked">*/}
      {/*      <div className="card-content">*/}
      {/*        <div className="input-field col s6">*/}
      {/*          <input id="oldPassword"*/}
      {/*                 type="password"*/}
      {/*                 value={oldPassword}*/}
      {/*                 onChange={(e) => setOldPassword(e.target.value)}*/}
      {/*                 className="validate"/>*/}
      {/*          <label htmlFor="oldPassword">Old Password</label>*/}
      {/*        </div>*/}
      {/*        <div className="input-field col s6">*/}
      {/*          <input id="newPassword"*/}
      {/*                 type="password"*/}
      {/*                 value={newPassword}*/}
      {/*                 onChange={(e) => setNewPassword(e.target.value)}*/}
      {/*                 className="validate"/>*/}
      {/*          <label htmlFor="newPassword">New Password</label>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="card-action">*/}
      {/*        <a href="/"*/}
      {/*           onClick={changePassword}*/}
      {/*           className="btn orange darken-1"*/}
      {/*        >Change Password</a>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*</div>*/}
    </div>
  )
};

