import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useMessage} from "../hooks/MessageHook";

export const CreateLoadPage = () => {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);
  const {request} = useHttp();
  // const [truckTypeValue, setTruckTypeValue] = useState('');
  const message = useMessage();
  const [form, setForm] = useState({
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

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const createLoad = async (event) => {
    event.preventDefault();

    try {
      const data = await request('/api/loads', 'POST', {...form}, {
        Authorization: `Bearer ${token}`
      });
      // navigate(`/api/trucks`);
      // navigate(`/api/trucks/${data.truck._id}`);
      message(data.message);
      setForm({
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
    } catch (e) {
      message(e.message);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card purple lighten-2 horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h5 className="header white-text">Create Load</h5>
              <div className="input-field">
                <input className="yellow-input"
                       name="name"
                       id="loadName"
                       type="text"
                       value={form.name}
                       onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="payload"
                       id="loadPayload"
                       type="number"
                       min={0}
                       max={4000}
                       value={form.payload}
                       onChange={(event) => {
                         setForm({...form, payload: Number(event.target.value)})
                       }}
                />
                <label htmlFor="username">Payload</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="pickup_address"
                       id="pickupAddress"
                       type="text"
                       value={form.pickup_address}
                       onChange={changeHandler}
                />
                <label htmlFor="pickupAddress">Pickup Address</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="delivery_address"
                       id="deliveryAddress"
                       type="text"
                       value={form.delivery_address}
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
                       min={0}
                       max={700}
                       value={form.dimensions.width}
                       onChange={(event) => {
                         setForm({...form, dimensions: {...form.dimensions, width: Number(event.target.value)}})
                       }}
                />
                <label htmlFor="width">Width</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="length"
                       id="length"
                       type="number"
                       min={0}
                       max={350}
                       value={form.dimensions.length}
                       onChange={(event) => {
                         setForm({...form, dimensions: {...form.dimensions, length: Number(event.target.value)}})
                       }}
                />
                <label htmlFor="length">Length</label>
              </div>
              <div className="input-field">
                <input className="yellow-input"
                       name="height"
                       id="height"
                       type="number"
                       min={0}
                       max={170}
                       value={form.dimensions.height}
                       onChange={(event) => {
                         setForm({...form, dimensions: {...form.dimensions, height: Number(event.target.value)}})
                       }}
                />
                <label htmlFor="height">Height</label>
              </div>
            </div>
            <div className="card-action">
              <a href="/"
                 className="btn green darken-1"
                 onClick={createLoad}
              >Create</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};