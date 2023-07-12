import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/HttpHook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {Link} from "react-router-dom";
import {useMessage} from "../hooks/MessageHook";
import {LoadCard} from "../components/LoadCard";
import {LoadItemCard} from "../components/LoadItemCard";
import {getPageCount, getPagesArray} from "../utils/pages";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {Snackbars} from "../components/Alert";

export const LoadsPage = () => {
  const [loads, setLoads] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);
  const message = useMessage();
  const [userRole, setUserRole] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(3);
  const [status, setStatus] = useState('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const loadStatus = ['', 'NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'];
  const arrayPages = getPagesArray(totalPages);
  const limitArray = [2, 3, 4, 5, 6, 8, 10];
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('Hello!');
  const [severity, setSeverity] = useState('success');

  const fetchedLoads = useCallback(async () => {
    try {
      const fetched = await request('/api/loads', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLoads(fetched.loads);
    } catch (e) {
      message(e.message);
    }
  }, [token, request]);


  const fetchedLimitLoads = useCallback(async (status, limit, offset) => {
    try {
      const fetched = await request(`/api/loads?status=${status}&limit=${limit}&offset=${offset}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLoads(fetched.loads);
      setCount(fetched.count);
      setTotalPages(getPageCount(fetched.count, limit));

    } catch (e) {
      message(e.message);
    }
  }, [token, request]);


  const changeState = async () => {
    setAlert(false);
    try {
      const fetched = await request(`/api/loads/active/state`, 'PATCH', null, {
        Authorization: `Bearer ${token}`,
      });
      fetchedLimitLoads(status, limit, offset);
      setAlertMessage(fetched.message);
      setSeverity('success');
      setAlert(true);
    } catch (e) {
      setAlertMessage(e.message);
      setSeverity('error');
      setAlert(true);
    }
  }

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

  const changePage = (p) => {
    setPage(p);
    setOffset((p - 1) * limit);
  };

  const nextPage = (event) => {
    event.preventDefault();
    let nextP = page + 1;
    if (nextP > totalPages) {
      return
    }
    changePage(nextP);
  };

  const previousPage = (event) => {
    event.preventDefault();
    let previousP = page - 1;
    if (previousP < 1) {
      return
    }
    changePage(previousP);
  };

  useEffect(() => {
    fetchedUser();
  }, [fetchedUser]);

  useEffect(() => {
    fetchedLimitLoads(status, limit, offset);
  }, [fetchedLimitLoads, status, limit, offset]);

  const handleChange = (event) => {
    setLimit(Number(event.target.value));
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="row">
      {alert && <Snackbars show={alert} message={alertMessage} severity={severity}/>}
      <div className="filter" style={{marginBottom: '10px'}}>
        <div className="filter-status">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChangeStatus}
            >
              {loadStatus.map((item, index) => {
                return <MenuItem key={index} value={item}>
                  {!item ? 'ALL' : item}
                </MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
        <div className="filter-limit" style={{marginTop: '10px'}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Limit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={limit}
              label="Limit"
              onChange={handleChange}
            >
              {limitArray.map((item, index) => {
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
      </div>

      {loads.length
        ? loads.map(load => {
          return <LoadItemCard key={load._id} load={load} role={userRole} changeState={changeState}/>
        })
        : <div className="row">
          <div className="col s12">
            <h2 className="center-align">No Loads!</h2>
          </div>
        </div>}

      <ul className="pagination col s8 offset-s2" style={{marginTop: '10px'}}>
        <li className={page === 1 ? "disabled" : "waves-effect"}><a href="/" onClick={event => previousPage(event)}><i
          className="material-icons">chevron_left</i></a></li>
        {arrayPages.map((p) => {
          return <li key={p} className={page === p ? "active" : "waves-effect"}>
            <a href="/"
               onClick={(event) => {
                 event.preventDefault()
                 changePage(p)
               }}
            >{p}
            </a>
          </li>
        })}
        <li className={page === totalPages
          ? "disabled"
          : "waves-effect"}><a href="/"
                               onClick={event => nextPage(event)}><i
          className="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  );
};
