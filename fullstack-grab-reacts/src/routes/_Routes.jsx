import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home-page";
import FoodContent from "../pages/food-content";
import DriverContent from "../pages/driver-content";
import StatisticContent from "../pages/statistic-content";

const _Routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FoodContent />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/driver" element={<DriverContent />} />
        <Route exact path="/statistic" element={<StatisticContent />} />
      </Routes>
    </Router>
  );
};

export default _Routes;
