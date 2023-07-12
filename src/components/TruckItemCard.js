import React from "react"
import {Link} from "react-router-dom";
import {DatePickers} from "./DatePicker/DatePicker";

export const TruckItemCard = ({truckValue}) => {

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
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <table>
              <tbody>
              <tr>
                <th>Type</th>
                <td>{truckValue.type}</td>
              </tr>
              <tr>
                <th>Assigned</th>
                <td>
                  {!truckValue.assigned_to
                    ? <i className="material-icons">check_box_outline_blank</i>
                    : <i className="material-icons">check_box</i>
                  }
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  {truckValue.status === 'IS'
                  ? <i className="material-icons">local_parking</i>
                  : <i className="material-icons">local_shipping</i>
                }
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <DatePickers data={truckValue.created_date} labelValue={'Created Date'}/>
                  <small className="right-align">{getTime(truckValue.created_date)}</small>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className="card-action">
            <Link className="btn blue darken-1" to={`/api/trucks/${truckValue._id}`}>Open</Link>
          </div>
        </div>
      </div>
    </div>
  )
}