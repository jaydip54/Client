import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './componants/logincomponants/Login';
import Dashboard from './componants/pages/Dashboard';
import Profile from './componants/profile/Profile';
import NotFound from './componants/pages/NotFound';
import { useEffect } from 'react';
import UserSidebar from './componants/navbar/UserSidebar';
import UserDashboard from './componants/pages/UserDashboard';
import TechnicianSidebar from './componants/navbar/TechnicianSidebar';
import AdminSidebar from './componants/navbar/AdminSidebar';
import SupervisorSidebar from './componants/navbar/SupervisorSidebar';
import SupervisorDashboard from './componants/pages/placeowner/SupervisorDashboard';

import { useDispatch, useSelector } from 'react-redux';
import { Getassignedfalse_ticket, Getassignedtrue_ticket, GetbyDepartmentAssigned, getloginsupervisorbydepartmentEndpoint, GetLoginUserTicketEndpoint, GetSuperVisorDepartment, GetSuperVisorDepartment_technician_only, GetTicketEndpoint, GetUserEndpoint, ProfileUserEndpoint, RoleEndpoint } from './Atoms/constatnt';

import { getUser, getUser_SuperVisor_Department, getUser_SuperVisor_Department_technician } from './redux/slices/registerSlice';
import { getAllRoles } from './redux/slices/roleSlice';
import { getProfile } from './redux/slices/profileSlice';
import ForgotPassword from './componants/logincomponants/ForgotPassword';
import ResetPassword from './componants/logincomponants/ResetPassword';


function App() {
  let { role, auth, token } = useSelector((state) => state.auth)
  let dispatch = useDispatch();

  useEffect(() => {
    if (role !== null && role !== undefined && role !== "" && role === 'ADMIN' && auth === true) {

      dispatch(getUser({ endpoint: GetUserEndpoint, token: token }));
      dispatch(getAllRoles({ endpoint: RoleEndpoint, token: token }));
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
    }
    if (role !== null && role !== undefined && role !== "" && role === 'STAFF' && auth === true) {

      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
    }
    if (role !== null && role !== undefined && role !== "" && role === 'TECHNICIAN' && auth === true) {
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
    }
    if (role !== null && role !== undefined && role !== "" && role === 'SUPERVISOR' && auth === true) {
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
      dispatch(getAllRoles({ endpoint: RoleEndpoint, token: token }));

      dispatch(getPersonalTickets({ endpoint: GetLoginUserTicketEndpoint, token: token }));
      dispatch(getAssignFalseTickets({ endpoint: Getassignedfalse_ticket, token: token }));
      dispatch(getDepartmentTickets({ endpoint: getloginsupervisorbydepartmentEndpoint, token: token }));
      dispatch(getAssignTrueTickets({ endpoint: Getassignedtrue_ticket, token: token }));

      dispatch(getUser_SuperVisor_Department({ endpoint: GetSuperVisorDepartment, token: token }));
      dispatch(getUser_SuperVisor_Department_technician({ endpoint: GetSuperVisorDepartment_technician_only, token: token }));

      dispatch(getAssignedTickets({ endpoint: GetbyDepartmentAssigned, token: token }));

    }
  }, [
    // role,
    //  auth,
    token
  ]);


  const renderRoutes = () => {
    switch (role) {
      case 1:
        return (
          <>
            <AdminSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path='/admin/changepassword' element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case 0:
        return (
          <>
            <UserSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/user/changepassword' element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case 2:
        return (
          <>
            <SupervisorSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<SupervisorDashboard />} />
              <Route path='/supervisor/changepassword' element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case 3:
        return (
          <>
            <TechnicianSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path='/technician/changepassword' element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      default:
        return (
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        )
    }
  };

  return renderRoutes();
}

export default App;