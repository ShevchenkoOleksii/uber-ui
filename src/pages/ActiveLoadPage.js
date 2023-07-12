import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/HttpHook";
import {useMessage} from "../hooks/MessageHook";
import {Loader} from "../components/Loader";
import {LoadCard} from "../components/LoadCard";

export const ActiveLoadPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [activeLoadValue, setActiveLoadValue] = useState(null);
  const message = useMessage();
  const [userRole, setUserRole] = useState('DRIVER');

  const fetchedUser = useCallback(async () => {
    try {
      const fetched = await request('/api/users/me', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setUserRole(fetched.user.role);
    } catch (e) {
      message(e.message);
    }
  }, [token, request]);

  useEffect(() => {
    fetchedUser();
  }, [fetchedUser]);

  const getActiveLoad = useCallback(async () => {
    try {
      const fetched = await request(`/api/loads/active`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });

      setActiveLoadValue(fetched.load);
    } catch (e) {
      message(e.message, 'message_warning');
    }
  }, [token, request]);

  useEffect(() => {
    getActiveLoad();
  }, [getActiveLoad]);

  if (loading) {
    return <Loader/>
  }

  if (!activeLoadValue) {
    return (
      <div className="row">
        <h2 className="col s10 offset-s1 center-align">No Active Load Found!</h2>
      </div>)
  }

  return (
    <div>
      {activeLoadValue && <LoadCard load={activeLoadValue} role={userRole}/>}
    </div>
  );
};
