import React from "react"
import {Link} from "react-router-dom";
import {DatePickers} from "./DatePicker/DatePicker";

export const LoadItemCard = ({load, changeState, role}) => {
  let determinateWidth = 0;

  const getWidth = (state) => {
    switch (state) {
      case 'En route to Pick Up':
        determinateWidth = 25;
        break;
      case 'Arrived to Pick Up':
        determinateWidth = 50;
        break;
      case 'En route to delivery':
        determinateWidth = 75;
        break;
      case 'Arrived to delivery':
        determinateWidth = 100;
        break;
      default:
        determinateWidth = 0;
    }
  };
  getWidth(load.state);

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
    <div className="col s4">
      {/*<button className="btn" onClick={() => getTime(load.created_date)}>click me</button>*/}
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <table>
              <tbody>
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
                {/*<th>Created Date</th>*/}
                <td colSpan={2}>
                  <DatePickers data={load.created_date} labelValue={'Created Date'}/>
                  <small className="right-align">{getTime(load.created_date)}</small>
                </td>
                {/*<td>{`${new Date(load.created_date).toLocaleTimeString()} ${new Date(load.created_date).toLocaleDateString()}`}</td>*/}
              </tr>
              {/*<tr>*/}
              {/*  <td colSpan={2}>*/}
              {/*    <small>{getTime(load.created_date)}</small>*/}
              {/*  </td>*/}
              {/*</tr>*/}
              </tbody>
            </table>
          </div>
            <div className="card-action">
              <div className="progress">
                <div className="determinate" style={{width: `${determinateWidth}%`}}>

                </div>
              </div>
              {role === 'SHIPPER' && <Link className="btn pink darken-4" to={`/api/loads/${load._id}`}>Open</Link>}
              {role === 'SHIPPER' && load.status === 'ASSIGNED' && <Link className="btn light-green darken-3" to={`/api/loads/${load._id}/shipping_info`}>Show Info</Link>}
              {role === 'DRIVER' && <button
                style={{marginRight: 5}}
                className="btn blue darken-2"
                onClick={changeState}
                disabled={load.status === 'SHIPPED'}
              >Change State
              </button>}
            </div>
        </div>
      </div>
    </div>
  )
}