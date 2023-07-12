import React, {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/MessageHook";
import {LoadCard} from "../components/LoadCard";

export const DetailLoadPage = () => {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [loadValue, setLoadValue] = useState(null);
  const loadId = useParams().id;
  const message = useMessage();
  const [startEdit, setStartEdit] = useState(false);
  const [updatedForm, setUpdatedForm] = useState({
    name: '',
    payload: 0,
    pickup_address: '',
    delivery_address: '',
    dimensions: {
      width: 0,
      length: 0,
      height: 0,
    },
  });

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const getLoad = useCallback(async () => {
    try {
      const fetched = await request(`/api/loads/${loadId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setLoadValue(fetched.load);
    } catch (e) {
      message(e.message);
    }
  }, [token, loadId, request]);

  const removeLoad = useCallback(async () => {
    try {
      const fetched = await request(`/api/loads/${loadId}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      });
      navigate(`/api/loads`);
      message(fetched.message);
    } catch (e) {
      message(e.message);
    }
  }, [token, loadId, request]);

  const updateLoad = async (event) => {
    event.preventDefault();

    try {
      const fetched = await request(`/api/loads/${loadId}`, 'PUT', {
        ...updatedForm,
      }, {
        Authorization: `Bearer ${token}`
      });
      setLoadValue({...loadValue, ...updatedForm});
      setStartEdit(false);
      message(fetched.message);
    } catch (e) {
      message(e.message);
      setStartEdit(false);
    }
  };

  const startEditLoad = () => {
    setStartEdit(!startEdit);
    setUpdatedForm({
      name: loadValue.name,
      payload: loadValue.payload,
      pickup_address: loadValue.pickup_address,
      delivery_address: loadValue.delivery_address,
      dimensions: {
        width: loadValue.dimensions.width,
        length: loadValue.dimensions.length,
        height: loadValue.dimensions.height,
      },
    });
  };

  const changeHandler = (event) => {
    setUpdatedForm({
      ...updatedForm,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    getLoad();
  }, [getLoad]);

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="row">
      {!loading && loadValue && <LoadCard
        getLoad={getLoad}
        load={loadValue}
        startEditLoad={startEditLoad}
        remove={removeLoad}
        role={'SHIPPER'}
      />}
      {startEdit && <div className="col s6 offset-s3">
        <div className="card purple lighten-2 horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h5 className="header">Update Load</h5>
              <div className="input-field">
                <input className="yellow-input"
                       name="name"
                       id="loadName"
                       type="text"
                       value={updatedForm.name}
                       onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="payload"
                       id="loadPayload"
                       type="number"
                       value={updatedForm.payload}
                       onChange={(event) => {
                         setUpdatedForm({...updatedForm, payload: Number(event.target.value)})
                       }}
                />
                <label htmlFor="username">Payload</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="pickup_address"
                       id="pickupAddress"
                       type="text"
                       value={updatedForm.pickup_address}
                       onChange={changeHandler}
                />
                <label htmlFor="pickupAddress">Pickup Address</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="delivery_address"
                       id="deliveryAddress"
                       type="text"
                       value={updatedForm.delivery_address}
                       onChange={changeHandler}
                />
                <label htmlFor="deliveryAddress">Delivery Address</label>
              </div>
              <h6>Dimensions:</h6>
              <div className="input-field">
                <input className="yellow-input"
                       name="width"
                       id="width"
                       type="number"
                       value={updatedForm.dimensions.width}
                       onChange={(event) => {
                         setUpdatedForm({...updatedForm, dimensions: {...updatedForm.dimensions, width: Number(event.target.value)}})
                       }}
                />
                <label htmlFor="width">Width</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="length"
                       id="length"
                       type="number"
                       value={updatedForm.dimensions.length}
                       onChange={(event) => {
                         setUpdatedForm({...updatedForm, dimensions: {...updatedForm.dimensions, length: Number(event.target.value)}})
                       }}
                />
                <label htmlFor="length">Length</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="height"
                       id="height"
                       type="number"
                       value={updatedForm.dimensions.height}
                       onChange={(event) => {
                         setUpdatedForm({...updatedForm, dimensions: {...updatedForm.dimensions, height: Number(event.target.value)}})
                       }}
                />
                <label htmlFor="height">Height</label>
              </div>
            </div>
            <div className="card-action">
              <a href="/"
                 className="btn green darken-1"
                 onClick={updateLoad}
              >Update</a>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
};