import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {ProfilePage} from "./pages/ProfilePage";
import {TruckPage} from "./pages/TrucksPage";
import {CreateTruckPage} from "./pages/CreateTruckPage";
import {DetailPage} from "./pages/DetailPage";
import {CreateLoadPage} from "./pages/CreateLoadPage";
import {LoadsPage} from "./pages/LoadsPage";
import {DetailLoadPage} from "./pages/DetailLoadPage";
import {ActiveLoadPage} from "./pages/ActiveLoadPage";
import {InfoPage} from "./pages/InfoPage";
import {WeatherPage} from "./pages/WeatherPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path={'api/weather'} element={<WeatherPage />} />
        <Route path={'api/trucks'} element={<TruckPage />} />
        <Route path={'api/loads'} element={<LoadsPage />} />
        <Route path={'api/loads/:id'} element={<DetailLoadPage />} />
        <Route path={'api/loads/:id/shipping_info'} element={<InfoPage />} />
        <Route path={'api/loads/active'} element={<ActiveLoadPage />} />
        <Route path={'api/create'} element={<CreateTruckPage />} />
        <Route path={'api/create_load'} element={<CreateLoadPage />} />
        <Route path={'api/users/me'} element={<ProfilePage />} />
        <Route path={'api/trucks/:id'} element={<DetailPage />} />
        {/*<Route path={'*'} element={<Navigate replace to="api/users/me" />} />*/}
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path={'api/auth'} element={<AuthPage />} />
      <Route path={'*'} element={<Navigate replace to="api/auth" />} />
    </Routes>
  )
};