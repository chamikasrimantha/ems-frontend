import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Default from './pages/Default';
import SuperAdminSignIn from './pages/superadmin/superadmin.auth/SuperAdminSignIn';
import AdminSignIn from './pages/admin/admin.auth/AdminSignIn';
import SuperAdminDashboard from './pages/superadmin/superadmin.dashboard/SuperAdminDashboard';
import SuperAdminDepartment from './pages/superadmin/superadmin.departments/SuperAdminDepartment';
import SuperAdminEmployees from './pages/superadmin/superadmin.employees/SuperAdminEmployees';
import SuperAdminAddEmployee from './pages/superadmin/superadmin.employees/SuperAdminAddEmployee';
import SuperAdminViewEmployee from './pages/superadmin/superadmin.employees/SuperAdminViewEmployee';
import SuperAdminAddAdmins from './pages/superadmin/superadmin.admins/SuperAdminAddAdmins';
import SuperAdminAddSuperAdmins from './pages/superadmin/superadmin.admins/SuperAdminAddSuperAdmins';
import SuperAdminAdmins from './pages/superadmin/superadmin.admins/SuperAdminAdmins';
import SuperAdminViewAll from './pages/superadmin/superadmin.admins/SuperAdminViewAll';
import SuperAdminGetEmployeesByDepartment from './pages/superadmin/superadmin.employees/SuperAdminGetEmployeesByDepartment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Default />} />
          <Route path='/superadmin/signin' element={<SuperAdminSignIn />} />

          <Route path='/superadmin/dashboard' element={<SuperAdminDashboard />} />
          <Route path='/superadmin/departments' element={<SuperAdminDepartment />} />
          <Route path='/superadmin/employees' element={<SuperAdminEmployees />} />
          <Route path='/superadmin/add-employee' element={<SuperAdminAddEmployee />} />
          <Route path='/superadmin/employees/:id' element={<SuperAdminViewEmployee />} />
          <Route path='/superadmin/employees-by-department' element={<SuperAdminGetEmployeesByDepartment />} />
          <Route path='/superadmin/admins' element={<SuperAdminAdmins />} />
          <Route path='/superadmin/add-admin' element={<SuperAdminAddAdmins />} />
          <Route path='/superadmin/add-superadmin' element={<SuperAdminAddSuperAdmins />} />
          <Route path='/superadmin/admins/:id' element={<SuperAdminViewAll />} />

          <Route path='/admin/signin' element={<AdminSignIn />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
