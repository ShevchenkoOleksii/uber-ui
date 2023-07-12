import React, {useContext} from "react"
import {useMessage} from "../hooks/MessageHook";
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {DatePickers} from "./DatePicker/DatePicker";

export const LoadCard = ({load, startEditLoad, role, remove, getLoad}) => {
  const message = useMessage();
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const postLoad = async () => {
    try {
      const fetched = await request(`/api/loads/${load._id}/post`, 'POST', null, {
        Authorization: `Bearer ${token}`,
      });
      getLoad();
      message(fetched.message);
    } catch (e) {
      getLoad();
      message(e.message);
    }
  };

  // if (!load) {
  //   return <h1>You are not a shipper!</h1>
  // }

  return (
    <div className="col s8 offset-s2">
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h5>Load Info:</h5>
            <table className="load-data">
              <tbody>
              <tr>
                <th>ID</th>
                <td>{load._id}</td>
              </tr>
              <tr>
                <th>Created By</th>
                <td>{load.created_by}</td>
              </tr>
              <tr>
                <th>Assigned To</th>
                <td>
                  {load.assigned_to
                    ? load.assigned_to
                    : 'Not Assigned'
                  }
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{load.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{load.status}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{load.state}</td>
              </tr>
              <tr>
                <th>Payload</th>
                <td>{load.payload}</td>
              </tr>
              <tr>
                <th>Pickup Address</th>
                <td>{load.pickup_address}</td>
              </tr>
              <tr>
                <th>Delivery Address</th>
                <td>{load.delivery_address}</td>
              </tr>
              <tr>
                <th>Dimensions</th>
                <td>
                  <p><strong>Width:</strong> {load.dimensions.width}</p>
                  <p><strong>Length:</strong> {load.dimensions.length}</p>
                  <p><strong>Height:</strong> {load.dimensions.height}</p>
                </td>
              </tr>
              <tr>
                <th>Logs</th>
                <td>{!load.logs.length && <p>No Logs!</p>}
                  {load.logs.map((log, index) => {
                    return (
                      <div key={index}>
                        <p style={{fontSize: '14px'}}>{log.message}</p>
                        <small>{new Date(log.time).toLocaleTimeString()} {new Date(log.time).toLocaleDateString()}</small>
                      </div>)
                  })}
                </td>
              </tr>
              <tr>
                <th>Created Date</th>
                <td>
                  <DatePickers data={load.created_date} labelValue={'Created Date'}/>
                </td>
                {/*<td>{`${new Date(load.created_date).toLocaleTimeString()} ${new Date(load.created_date).toLocaleDateString()}`}</td>*/}
              </tr>
              </tbody>
            </table>
          </div>
            <div className="card-action">
          {/*    <button*/}
          {/*      style={{marginRight: 5}}*/}
          {/*      className="btn red darken-2"*/}
          {/*      onClick={removeTruck}*/}
          {/*    >Delete*/}
          {/*    </button>*/}
          {/*    <button*/}
          {/*      style={{marginRight: 5}}*/}
          {/*      className="btn blue darken-2"*/}
          {/*      onClick={editTruckType}*/}
          {/*    >Update Type*/}
          {/*    </button>*/}
              {load.status === 'NEW' && role === 'SHIPPER' && <button
                style={{marginRight: 5}}
                className="btn orange darken-4"
                onClick={startEditLoad}
              >Edit
              </button>}
          {/*    {!truckValue.assigned_to &&*/}
              {load.status === 'NEW' && role === 'SHIPPER' && <button
                style={{marginRight: 5}}
                className="btn green darken-2"
                onClick={postLoad}
              >Post
              </button>}
              {role === 'SHIPPER' && <button
                style={{marginRight: 5}}
                className="btn red darken-1"
                onClick={remove}
              >remove
              </button>}
              {/*{load.status !== 'SHIPPED' && role === 'DRIVER' && <button*/}
              {/*  style={{marginRight: 5}}*/}
              {/*  className="btn green darken-2"*/}
              {/*  onClick={changeState}*/}
              {/*  disabled={load.status === 'SHIPPED'}*/}
              {/*>change State*/}
              {/*</button>}*/}
              {/*}*/}
            </div>
        </div>
      </div>
    </div>
  )
}