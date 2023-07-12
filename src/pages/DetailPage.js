import React, {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
// import {NoteCard} from "../components/NoteCard";
import {useMessage} from "../hooks/MessageHook";
import {TruckCard} from "../components/TruckCard";
import {Snackbars} from "../components/Alert";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const DetailPage = () => {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [truckValue, setTruckValue] = useState(null);
  const truckId = useParams().id;
  const [updatedValue, setUpdatedValue] = useState('');
  const message = useMessage();
  const [startEdit, setStartEdit] = useState(false);
  const truckTypes = ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT'];
  const [truckTypeValue, setTruckTypeValue] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Hello!');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const getTruck = useCallback(async () => {
    setAlert(false);
    try {
      const fetched = await request(`/api/trucks/${truckId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setTruckValue(fetched.truck);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  }, [token, truckId, request]);

  const removeTruck = useCallback(async () => {
    setAlert(false);
    try {
      const fetched = await request(`/api/trucks/${truckId}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      });
      navigate(`/api/trucks`);
      message(fetched.message);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  }, [token, truckId, request]);

  const editTruckType = async (event) => {
    event.preventDefault();
    setAlert(false);
    if (truckTypeValue.trim() === '') {
      return message('Empty Value!');
    }

    try {
      const fetched = await request(`/api/trucks/${truckId}`, 'PUT', {
        type: truckTypeValue,
      }, {
        Authorization: `Bearer ${token}`
      });
      setTruckValue({...truckValue, type: truckTypeValue});
      setTruckTypeValue('');
      setStartEdit(false);
      setAlertMessage(fetched.message);
      setSeverity('success');
      setAlert(true);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  };

  const assignTruck = async () => {
    setAlert(false);
    try {
      const fetched = await request(`/api/trucks/${truckId}/assign`, 'POST', null, {
        Authorization: `Bearer ${token}`
      });
      setTruckValue({...truckValue, assigned_to: truckValue.created_by});
      setAlertMessage(fetched.message);
      setSeverity('success');
      setAlert(true);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('warning');
      setAlert(true);
    }
  };
  const startEditTruck = () => {
    setStartEdit(!startEdit);
  };

  useEffect(() => {
    getTruck();
  }, [getTruck]);

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="row">
      {alert && <Snackbars show={alert} message={alertMessage} severity={severity}/>}
      {!loading
      && truckValue
      && <TruckCard truckValue={truckValue}
                    removeTruck={removeTruck}
                    editTruckType={editTruckType}
                    assignTruck={assignTruck}
                    startEditTruck={startEditTruck}
                    role={'DRIVER'}
      />}
      {startEdit &&
      <div className="col" style={{marginTop: '1.5rem', minWidth: 140}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Truck Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={truckTypeValue}
            label="Truck Type"
            onChange={event => setTruckTypeValue(event.target.value)}
          >
            {truckTypes.map((item, index) => {
              return <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
      }
    </div>
  )
};