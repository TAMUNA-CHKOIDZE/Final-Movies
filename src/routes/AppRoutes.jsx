import ROUTES from "./Routes";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/shared/layout/Layout";
import Home from "../pages/home/Home";
import Catalog from "../pages/catalog/Catalog";
import MovieDetails from "../pages/movieDetails//MovieDetails";
import TvSeries from "../pages/tvSeries/TvSeries";
import NotFound from "../pages/notFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* React Router-ს ვეუბნები, რომ ყველა ამ Route-ის wrapper გახადოს <Layout /> კომპონენტი და 
        Layout-ის შიგნით არსებული <Outlet /> იმუშავებს როგორც placeholder, სადაც Home, MoviesPage და სხვა ელემენტები ჩაჯდება. */}
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MOVIES} element={<Catalog />} />
        <Route path={ROUTES.TV_SERIES} element={<TvSeries />} />
        <Route path={ROUTES.DETAILS} element={<MovieDetails />} />
        {/* <Route path={ROUTES.NOT_FOUND} element={<NotFound />} /> */}
      </Route>
      {/* 404 გვერდი Layout-ის გარეშე */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
export default AppRoutes;

