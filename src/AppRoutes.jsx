
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from "./Pages/HomePage/HomePage";
import NeighborhoodPage from "./Pages/NeighborhoodPage/NeighborhoodPage";
import PropertyDetailsPage from "./Pages/NeighborhoodPage/PropertyDetailsPage";
import RealEstatePage from "./Pages/NeighborhoodPage/RealEstatePage";
import FinishingPage from "./Pages/FinishingPage/FinishingPage";
import Decorations from "./Pages/decorations/decorations";
import AddPropertyPage from "./Pages/AddPropertyPage/AddPropertyPage";

function AppRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />
      <Route path="/real-estate" element={<RealEstatePage/>} />
      <Route path="/finishing" element={<FinishingPage />} />
      <Route path="/neighborhood/:neighborhoodId" element={<NeighborhoodPage />} />
      <Route path="/property/:propertyId" element={<PropertyDetailsPage />} />
      <Route path="/decorations" element={<Decorations />} />
      <Route path="/add-property" element={<AddPropertyPage />} />
    </Routes>
  );
}

export default AppRoutes;