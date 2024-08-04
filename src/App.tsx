import { Route, Routes } from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees";
import CreateEditEmployee from "./components/Employees/CreateEditEmployee";
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <AppWrapper>
      <Routes>
        {/* As we don't have default path, so considering 'Employee' component as default
      else we can use: `/employees`*/}
        <Route path="/" element={<Employees />} />
        <Route path="/create" element={<CreateEditEmployee type="CREATE" />} />
        <Route path="/view-profile/:id" element={<CreateEditEmployee type="VIEW" />} />
      </Routes>
    </AppWrapper>
  );
}

export default App;
