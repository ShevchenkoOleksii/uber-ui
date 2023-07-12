import React from "react"
import {DatePickers} from "./DatePicker/DatePicker";

export const TruckCard = ({truckValue, removeTruck, startEditTruck, editTruckType, assignTruck, role}) => {

  return (
      <div className="col s6 offset-s3">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h5>Truck Info:</h5>
              <table>
                <tbody>
                <tr>
                  <th>ID</th>
                  <td>{truckValue._id}</td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>{truckValue.created_by}</td>
                </tr>
                <tr>
                  <th>Assigned</th>
                  <td>
                    {truckValue.assigned_to
                      ? truckValue.assigned_to
                      : 'Not Assigned'
                    }
                  </td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{truckValue.type}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    {truckValue.status === 'IS'
                      ? 'In Service'
                      : 'On Load'
                    }
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}><DatePickers data={truckValue.created_date} labelValue={'Created Date'}/></td>
                </tr>
                </tbody>
              </table>

            </div>
            {role === 'DRIVER' && <div className="card-action">
              <button
                style={{marginRight: 5, marginTop: 5}}
                className="btn red darken-2"
                onClick={removeTruck}
              >Delete
              </button>
              <button
                style={{marginRight: 5, marginTop: 5}}
                className="btn blue darken-2"
                onClick={editTruckType}
              >Update Type
              </button>
              <button
                style={{marginRight: 5, marginTop: 5}}
                className="btn orange darken-4"
                onClick={startEditTruck}
              >Change
              </button>
                <button
                  style={{marginRight: 5, marginTop: 5}}
                  className="btn green darken-2"
                  onClick={assignTruck}
                >Assign
                </button>
            </div>}
          </div>
        </div>
      </div>
  )
}