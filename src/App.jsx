// import Login from './componants/logincomponants/Login';
// import Dashboard from './componants/pages/Dashboard';
// import Profile from './componants/profile/Profile';
// import TicketCreation from './componants/pages/TicketCreation';
// import TicketList from './componants/pages/TicketList';
// import NotFound from './componants/pages/NotFound';
// import { useEffect, useState } from 'react';
// import Notification from './componants/pages/Notification';
// import UserManagementAdmin from './componants/pages/UsermanagementAdmin';
// import Reports from './componants/pages/Reports';
// import UserSidebar from './componants/navbar/UserSidebar';
// import ManageTicket from './componants/pages/ManageTicket';
// import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider, Routes, useNavigate } from 'react-router-dom';
// import UserDashboard from './componants/pages/UserDashboard';
// import TechnicianSidebar from './componants/navbar/TechnicianSidebar';
// import AdminSidebar from './componants/navbar/AdminSidebar';
// import SupervisorSidebar from './componants/navbar/SupervisorSidebar';
// import AddDepartment from './componants/pages/AddDepartment';
// import TechnicianDashboard from './componants/pages/TechnicianDashboard';
// import SupervisorDashboard from './componants/pages/SupervisorDashboard';
// import UserManageSupervisor from './componants/pages/UserManageSupervisor';
// import AssignTechnician from './componants/pages/AssignTechnician';
// import { getAllDepartments } from './redux/slices/departmentSlice';
// import { useDispatch } from 'react-redux';
// import { DepartmentEndpoint, GetLoginUserTicketEndpoint, GetTicketEndpoint, GetUserEndpoint, ProfileUserEndpoint, RoleEndpoint } from './Atoms/constatnt';
// import { getAllTickets } from './redux/slices/ticketSlice';
// import { getUser } from './redux/slices/registerSlice';
// import { getAllRoles } from './redux/slices/roleSlice';
// import { getProfile } from './redux/slices/profileSlice';

// const getRole = () => {
//   return localStorage.getItem("role");
// };

// function App() {
//   const [role, setRole] = useState(null);
//   // const navigate = useNavigate();
//   let dispatch = useDispatch();

//   useEffect(() => {
//     const userRole = getRole();
//     setRole(userRole);
//   }, [ role]);

//   useEffect(() => {
//     if (role !== null && role !== undefined && role !== "" && role === 'ADMIN') {
//       dispatch(getAllDepartments({ endpoint: DepartmentEndpoint }));
//       dispatch(getAllTickets({ endpoint: GetTicketEndpoint }));
//       dispatch(getUser({ endpoint: GetUserEndpoint }));
//       dispatch(getAllRoles({ endpoint: RoleEndpoint }));
//       dispatch(getProfile({ endpoint: ProfileUserEndpoint }));
//     }
//     if (role !== null && role !== undefined && role !== "" && role === 'STAFF') {
//       dispatch(getAllTickets({ endpoint: GetLoginUserTicketEndpoint }));
//       dispatch(getProfile({ endpoint: ProfileUserEndpoint }));
//     }
//   }, [dispatch, role]);

//   // if (!role) {
//   //   return <Login />
//   // }


//   // Layouts with sidebars and outlet for nested routing
//   const AdminLayout = () => (
//     <div>
//       <AdminSidebar />
//       <Outlet />
//     </div>
//   );

//   const StaffLayout = () => (
//     <div>
//       <UserSidebar />
//       <Outlet />
//     </div>
//   );



//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         {role === null || role === "" ? (
//           <Route path="/" element={<Login />} />
//         ) : role === 'ADMIN' ? (
//           <Route element={<AdminLayout />}>
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/admin/report" element={<Reports />} />
//           </Route>
//         ) : role === 'STAFF' ? (
//           <Route element={<StaffLayout />}>
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/dashboard" element={<UserDashboard />} />
//             <Route path="/user/ticketcreation" element={<TicketCreation />} />
//           </Route>
//         ) : (
//           <Route path="*" element={<NotFound />} />
//         )}
//       </>
//     )
//   );

//   return <RouterProvider router={router} />



//   // const renderRoutes = () => {
//   //   switch (role) {
//   //     case "ADMIN":
//   //       return (
//   //         <>
//   //           <AdminSidebar />
//   //           <Routes>
//   //             <Route path="/profile" element={<Profile />} />
//   //             <Route path="/" element={<Dashboard />} />
//   //             <Route path="/admin/manageticket" element={<ManageTicket />} />
//   //             <Route path="/admin/notification" element={<Notification />} />
//   //             <Route path="/admin/reports" element={<Reports />} />
//   //             <Route path="/admin/usermanagement" element={<UserManagementAdmin />} />
//   //             <Route path="/admin/adddepartment" element={<AddDepartment />} />
//   //             <Route path="*" element={<Dashboard />} />
//   //           </Routes>
//   //         </>
//   //       );
//   //     case "STAFF":
//   //       return (
//   //         <>
//   //           <UserSidebar />
//   //           <Routes>
//   //             <Route path="/" element={<UserDashboard />} />
//   //             <Route path="/user/ticketcreation" element={<TicketCreation />} />
//   //             <Route path="/user/mytickets" element={<TicketList />} />
//   //             <Route path="/user/notification" element={<Notification />} />
//   //             <Route path="/profile" element={<Profile />} />
//   //             <Route path="*" element={<UserDashboard />} />
//   //           </Routes>
//   //         </>
//   //       );
//   //     case "SUPERVISOR":
//   //       return (
//   //         <>
//   //           <SupervisorSidebar />
//   //           <Routes>
//   //             <Route path="/dashboard" element={<SupervisorDashboard />} />
//   //             <Route path="/supervisor/reports" element={<Reports />} />
//   //             <Route path="/supervisor/manageticket" element={<ManageTicket />} />
//   //             <Route path="/supervisor/usermanagement" element={<UserManageSupervisor />} />
//   //             <Route path="/supervisor/notification" element={<Notification />} />
//   //             <Route path="/profile" element={<Profile />} />
//   //             <Route path="*" element={<NotFound />} />
//   //           </Routes>
//   //         </>
//   //       );
//   //     case "TECHNICIAN":
//   //       return (
//   //         <>
//   //           <TechnicianSidebar />
//   //           <Routes>
//   //             <Route path="/dashboard" element={<TechnicianDashboard />} />
//   //             <Route path="/technician/assigntechnician" element={<AssignTechnician />} />
//   //             <Route path="/profile" element={<Profile />} />
//   //             <Route path="*" element={<NotFound />} />
//   //           </Routes>
//   //         </>
//   //       );
//   //     default:
//   //       return (
//   //         <Routes>
//   //           <Route path="/" element={<Login />} />
//   //           <Route path="*" element={<Navigate to="/" replace />} />
//   //         </Routes>
//   //       );
//   //   }
//   // };

//   // return renderRoutes();
// }

// export default App;






































import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './componants/logincomponants/Login';
import Dashboard from './componants/pages/Dashboard';
import Profile from './componants/profile/Profile';
import TicketCreation from './componants/pages/TicketCreation';
import TicketList from './componants/pages/TicketList';
import NotFound from './componants/pages/NotFound';
import { useEffect } from 'react';
import Notification from './componants/pages/Notification';
import UserManagementAdmin from './componants/pages/UsermanagementAdmin';
import Reports from './componants/pages/Reports';
import UserSidebar from './componants/navbar/UserSidebar';
import ManageTicket from './componants/pages/ManageTicket';
import UserDashboard from './componants/pages/UserDashboard';
import TechnicianSidebar from './componants/navbar/TechnicianSidebar';
import AdminSidebar from './componants/navbar/AdminSidebar';
import SupervisorSidebar from './componants/navbar/SupervisorSidebar';
import AddDepartment from './componants/pages/AddDepartment';
import TechnicianDashboard from './componants/pages/technician/TechnicianDashboard';
import SupervisorDashboard from './componants/pages/supervisor/SupervisorDashboard';
import UserManageSupervisor from './componants/pages/UserManageSupervisor';
import AssignTechnician from './componants/pages/supervisor/AssignTechnician';
import { getAllDepartments } from './redux/slices/departmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { assignedgettechnicianlogin, DepartmentEndpoint, Getassignedfalse_ticket, Getassignedtrue_ticket, GetbyDepartmentAssigned, getloginsupervisorbydepartmentEndpoint, GetLoginUserTicketEndpoint, GetSuperVisorDepartment, GetSuperVisorDepartment_technician_only, GetTicketEndpoint, GetUserEndpoint, ProfileUserEndpoint, RoleEndpoint } from './Atoms/constatnt';
import { getAllTickets } from './redux/slices/ticketSlice';
import { getUser, getUser_SuperVisor_Department, getUser_SuperVisor_Department_technician } from './redux/slices/registerSlice';
import { getAllRoles } from './redux/slices/roleSlice';
import { getProfile } from './redux/slices/profileSlice';
import ForgotPassword from './componants/logincomponants/ForgotPassword';
import ResetPassword from './componants/logincomponants/ResetPassword';
import SuperVisorMangeTicket from './componants/pages/SuperVisorMangeTicket';
import AssignedTicket from './componants/pages/technician/AssignedTicket';
import { getAssignFalseTickets, getAssignTrueTickets, getDepartmentTickets, getPersonalTickets } from './redux/slices/superVisorTicketSlice';
import PersonalTicket from './componants/pages/supervisor/PersonalTicket';
import ReportSuperVisor from './componants/pages/supervisor/ReportSuperVisor';
import UpdateAssignTicket from './componants/pages/technician/UpdateAssignTicket';
import { getAssignedTickets } from './redux/slices/assigned.Slice';


function App() {
  let { role, auth, token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (role !== null && role !== undefined && role !== "" && role === 'ADMIN' && auth === true) {
      dispatch(getAllDepartments({ endpoint: DepartmentEndpoint, token: token }));
      dispatch(getAllTickets({ endpoint: GetTicketEndpoint, token: token }));
      dispatch(getUser({ endpoint: GetUserEndpoint, token: token }));
      dispatch(getAllRoles({ endpoint: RoleEndpoint, token: token }));
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
    }
    if (role !== null && role !== undefined && role !== "" && role === 'STAFF' && auth === true) {
      dispatch(getAllTickets({ endpoint: GetLoginUserTicketEndpoint, token: token }));
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
    }
    if (role !== null && role !== undefined && role !== "" && role === 'TECHNICIAN' && auth === true) {
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
      dispatch(getAssignedTickets({ endpoint: assignedgettechnicianlogin, token: token }));
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
    token]);


  const renderRoutes = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <AdminSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/admin/manageticket" element={<ManageTicket />} />
              <Route path="/admin/notification" element={<Notification />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/usermanagement" element={<UserManagementAdmin />} />
              <Route path="/admin/adddepartment" element={<AddDepartment />} /> */}
              <Route path='/admin/changepassword' element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case "STAFF":
        return (
          <>
            <UserSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/user/ticketcreation" element={<TicketCreation />} />
              <Route path="/user/mytickets" element={<TicketList />} />
              <Route path="/user/notification" element={<Notification />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/user/changepassword' element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case "SUPERVISOR":
        return (
          <>
            <SupervisorSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<SupervisorDashboard />} />
              <Route path="/supervisor/reports" element={<ReportSuperVisor />} />
              <Route path="/supervisor/ticketcreation" element={<TicketCreation />} />
              <Route path="/supervisor/mytickets" element={<PersonalTicket />} />
              <Route path="/supervisor/manageticket" element={<SuperVisorMangeTicket />} />
              <Route path="/supervisor/assign-technician" element={<AssignTechnician />} />
              <Route path="/supervisor/usermanagement" element={<UserManageSupervisor />} />
              <Route path="/supervisor/notification" element={<Notification />} />
              <Route path='/supervisor/changepassword' element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case "TECHNICIAN":
        return (
          <>
            <TechnicianSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<TechnicianDashboard />} />
              <Route path="/technician/assignedtickets" element={< AssignedTicket />} />
              <Route path="/technician/updateticket" element={<UpdateAssignTicket />} />
              <Route path='/technician/changepassword' element={<ResetPassword />} />
              <Route path="/technician/notification" element={<Notification />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      default:
        return (
          // <Login />
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