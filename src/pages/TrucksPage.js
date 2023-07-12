import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/MessageHook";
import {TruckItemCard} from "../components/TruckItemCard";

export const TruckPage = () => {
  const [trucks, setTrucks] = useState([]);
  const {loading, request} = useHttp();
  const {token, ready} = useContext(AuthContext);
  const message = useMessage();

  const fetchedTrucks = useCallback(async () => {
    try {
      const fetched = await request('/api/trucks', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setTrucks(fetched.trucks);
    } catch (e) {
      message(e.message);
    }
  }, [token, request]);

  useEffect(() => {
    fetchedTrucks();
  }, [fetchedTrucks]);

  if (loading || !ready) {
    return (
      <div className="row">
        <div className="col s12">
          <Loader/>
        </div>
      </div>
    )
  }

  if (!trucks.length) {
    return (
      <div className="row">
        <div className="col s12">
          <h2 className="center-align">No Trucks!</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="row">
      {trucks.map(truck => {
        return <TruckItemCard truckValue={truck} key={truck._id}/>
      })}
    </div>
  );
};
