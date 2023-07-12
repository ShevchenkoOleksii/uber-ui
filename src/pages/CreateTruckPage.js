import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/MessageHook";
import {Snackbars} from "../components/Alert";

export const CreateTruckPage = () => {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);
  const {request} = useHttp();
  const [truckTypeValue, setTruckTypeValue] = useState('');
  const message = useMessage();
  const truckTypes = ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT'];
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Hello!');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const createTruck = async (event) => {
    event.preventDefault();
    setAlert(false);
    try {
      const data = await request('/api/trucks', 'POST', {type: truckTypeValue}, {
        Authorization: `Bearer ${token}`
      });
      navigate(`/api/trucks`);
      message(data.message);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  };

  return (
    <div className="row">
      {alert && <Snackbars show={alert} message={alertMessage} severity={severity}/>}
      <div className="col s6 offset-s3">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h5 className="header">Create Truck</h5>
              <div className="input-field col s12">
                <div>
                  <label>
                    <input name="group2"
                           type="radio"
                           value={truckTypes[0]}
                           onChange={event => setTruckTypeValue(event.target.value)}
                    />
                    <span style={{color: 'black'}}>{truckTypes[0]}</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input name="group2"
                           type="radio"
                           value={truckTypes[1]}
                           onChange={event => setTruckTypeValue(event.target.value)}
                    />
                    <span style={{color: 'black'}}>{truckTypes[1]}</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input name="group2"
                           type="radio"
                           value={truckTypes[2]}
                           onChange={event => setTruckTypeValue(event.target.value)}
                    />
                    <span style={{color: 'black'}}>{truckTypes[2]}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <a href="/"
                 className="btn green darken-1"
                 onClick={createTruck}
              >Create</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};