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
import AdminDashboard from './pages/admin/admin.dashboard/AdminDashboard';
import AdminEmployees from './pages/admin/admin.employees/AdminEmployees';
import AdminGetEmployeesByDepartment from './pages/admin/admin.employees/AdminGetEmployeesByDepartment';
import AdminViewEmployee from './pages/admin/admin.employees/AdminViewEmployee';
import AdminUploadAttendance from './pages/admin/admin.attendance/AdminUploadAttendance';
import AdminGetAttendancesByEmployee from './pages/admin/admin.attendance/AdminGetAttendancesByEmployee';
import AdminSalaries from './pages/admin/admin.salaries/AdminSalaries';
import AdminAddSalary from './pages/admin/admin.salaries/AdminAddSalary';
import AdminSalarySummary from './pages/admin/admin.salaries/AdminSalarySummary';
import AdminSalarySheet from './pages/admin/admin.salaries/AdminSalarySheet';
import AdminSalarySlips from './pages/admin/admin.salaries/AdminSalarySlips';
import AdminAllowanceSlips from './pages/admin/admin.salaries/AdminAllowanceSlips';
import AdminSalaryTransferList from './pages/admin/admin.salaries/AdminSalaryTransferList';
import SuperAdminSalaries from './pages/superadmin/superadmin.salaries/SuperAdminSalaries';
import SalarySheet from './pages/superadmin/superadmin.salaries/SalarySheet';
import SalarySummarySheet from './pages/superadmin/superadmin.salaries/SalarySummarySheet';
import SalarySlips from './pages/superadmin/superadmin.salaries/SalarySlips';
import AllowanceSlips from './pages/superadmin/superadmin.salaries/AllowanceSlips';
import SalaryTransferList from './pages/superadmin/superadmin.salaries/SalaryTransferList';
import SuperAdminAnalysis from './pages/superadmin/superadmin.analysis/SuperAdminAnalysis';
import AdminAnalysis from './pages/admin/admin.analysis/AdminAnalysis';
import SuperAdminProtectedRoutes from './utils/SuperAdminProtectedRoutes';
import AdminProtectedRoutes from './utils/AdminProtectedRoutes';
import SuperAdminProfile from './pages/superadmin/superadmin.profile/SuperAdminProfile';
import AdminProfile from './pages/admin/admin.profile/AdminProfile';
import AdminSalarySheetByEPFNoOrder from './pages/admin/admin.salaries/AdminSalarySheetByEPFNoOrder';
import SalarySheetByEPFNoOrder from './pages/superadmin/superadmin.salaries/SalarySheetByEPFNoOrder';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Default />} />
          <Route path='/superadmin/signin' element={<SuperAdminSignIn />} />

          <Route element={<SuperAdminProtectedRoutes />} >
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
            <Route path='/superadmin/salaries' element={<SuperAdminSalaries />} />
            <Route path='/superadmin/salaries/sheet' element={<SalarySheet />} />
            <Route path='/superadmin/salaries/sheet-by-epfNo-order' element={<SalarySheetByEPFNoOrder />} />
            <Route path='/superadmin/salaries/summary' element={<SalarySummarySheet />} />
            <Route path='/superadmin/salaries/slips' element={<SalarySlips />} />
            <Route path='/superadmin/salaries/allowances' element={<AllowanceSlips />} />
            <Route path='/superadmin/salaries/transfers' element={<SalaryTransferList />} />
            <Route path='/superadmin/more' element={<SuperAdminAnalysis />} />
            <Route path='/superadmin/profile' element={<SuperAdminProfile />} />
          </Route>

          <Route path='/admin/signin' element={<AdminSignIn />} />

          <Route element={<AdminProtectedRoutes />} >
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/employees' element={<AdminEmployees />} />
            <Route path='/admin/employees-by-department' element={<AdminGetEmployeesByDepartment />} />
            <Route path='/admin/employees/:id' element={<AdminViewEmployee />} />
            <Route path='/admin/attendances' element={<AdminUploadAttendance />} />
            <Route path='/admin/attendance-by-employee' element={<AdminGetAttendancesByEmployee />} />
            <Route path='/admin/salaries' element={<AdminSalaries />} />
            <Route path='/admin/salaries/sheet' element={<AdminSalarySheet />} />
            <Route path='/admin/salaries/sheet-by-epfNo-order' element={<AdminSalarySheetByEPFNoOrder />} />
            <Route path='/admin/salaries/summary' element={<AdminSalarySummary />} />
            <Route path='/admin/salaries/slips' element={<AdminSalarySlips />} />
            <Route path='/admin/salaries/allowances' element={<AdminAllowanceSlips />} />
            <Route path='/admin/salaries/transfers' element={<AdminSalaryTransferList />} />
            <Route path='/admin/create-salary' element={<AdminAddSalary />} />
            <Route path='/admin/more' element={<AdminAnalysis />} />
            <Route path='/admin/profile' element={<AdminProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
