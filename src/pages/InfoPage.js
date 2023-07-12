import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/HttpHook";
import {useMessage} from "../hooks/MessageHook";
import {useParams} from "react-router-dom";
import {Loader} from "../components/Loader";
import {LoadCard} from "../components/LoadCard";
import {TruckCard} from "../components/TruckCard";

export const InfoPage = () => {
  const [loadInfoValue, setLoadInfoValue] = useState(null);
  const [truckInfoValue, setTruckInfoValue] = useState(null);
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const message = useMessage();
  const loadId = useParams().id;

  const getInfo = useCallback(async () => {
    try {
      const fetched = await request(`/api/loads/${loadId}/shipping_info`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setLoadInfoValue(fetched.load);
      setTruckInfoValue(fetched.truck);
    } catch (e) {
      message(e.message);
    }
  }, [token, loadId, request]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  if (loading) {
    return <Loader/>
  }

  if (!loadInfoValue || !truckInfoValue) {
    return (
      <div className="row">
        <h2 className="col s10 offset-s1 center-align">No Active Load Found!</h2>
      </div>)
  }

  return (
    <div>
      <LoadCard load={loadInfoValue}/>
      <TruckCard truckValue={truckInfoValue}/>
    </div>
  );
};
