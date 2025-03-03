import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './componants/logincomponants/Login';
import Dashboard from './componants/pages/Dashboard';
import Profile from './componants/profile/Profile';
import { useEffect } from 'react';
import UserSidebar from './componants/navbar/UserSidebar';
import UserDashboard from './componants/pages/UserDashboard';
import AdminSidebar from './componants/navbar/AdminSidebar';
import SupervisorSidebar from './componants/navbar/placeOwnerSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/slices/registerSlice';
import { getProfile } from './redux/slices/profileSlice';
import ForgotPassword from './componants/logincomponants/ForgotPassword';
import ResetPassword from './componants/logincomponants/ResetPassword';
import ParkingOwnerDashboard from './componants/pages/placeownerDashboard';
import OnlineUserRegistration from './componants/pages/SignUp';
import CityManagement from './componants/pages/CityManagement';
import AreaManagement from './componants/pages/AreaManagement';
import { fetchCities } from './redux/slices/city';
import { fetchAreas } from './redux/slices/area';
import UserManagement from './componants/pages/UserManagement';
import { ProfileUserEndpoint } from './Atoms/constatnt';
import CategoryManagement from './componants/pages/Category';
import { fetchCategories } from './redux/slices/category';
import LoginHistory from './componants/pages/LoginHistory';
import { fetchAllLoginHistory, fetchLoginHistoryByUserLogin } from './redux/slices/loginhistory';
import UserLoginHistory from './componants/pages/UserLoginHistory';
import SubscribeEmail from './componants/pages/SubscribeEmail';
import ManageSubscriptions from './componants/pages/ManageSubscriptions';
import FeedbackForm from './componants/pages/FeedbackForm';
import ManageFeedback from './componants/pages/ManageFeedback';
import UserPackageList from './componants/pages/UserPackageList';
import PackageList from './componants/pages/PackageList';
import { fetchPackages } from './redux/slices/package';
import { fetchParkingSpaces } from './redux/slices/parkingSpace';
import UserParkingList from './componants/pages/UserParkingList';
import VehicleManagement from './componants/pages/VehicleManagement';
import { fetchVehicles } from './redux/slices/vehicle';
import BusinessPlaceManagement from './componants/pages/BusinessManagement';
import { fetchBusinessPlaces, getAllLoginUserPlaces } from './redux/slices/bussinessPlace';
import ParkingAssignmentManagement from './componants/pages/ParkingAssignmentManagement';
import { fetchParkingAssignments } from './redux/slices/assign';

function App() {
  let dispatch = useDispatch();
  dispatch(fetchCities());
  dispatch(fetchAreas())
  dispatch(fetchParkingSpaces());

  let { type, token } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchPackages({ token: token }));
    dispatch(fetchVehicles(token));
    if (token && type !== null) {
      dispatch(getProfile({ endpoint: ProfileUserEndpoint, token: token }));
      if (type === 1) {
        dispatch(fetchParkingAssignments(token));
        dispatch(fetchBusinessPlaces(token));
        dispatch(getUser());
        dispatch(fetchCategories({ token: token }))
        dispatch(fetchAllLoginHistory({ token }));
      }
      if (type === 2) {
        dispatch(fetchCategories({ token: token }))
        dispatch(fetchLoginHistoryByUserLogin({ token: token }))
        dispatch(getAllLoginUserPlaces(token));
      }
      if (type === 0) {
        dispatch(fetchLoginHistoryByUserLogin({ token: token }))
      }
    }
  }, [token, type, dispatch]);

  const renderRoutes = () => {
    switch (type) {
      case 1:
        return (
          <>
            <AdminSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/citymangement" element={<CityManagement />} />
              <Route path="/areamanagement" element={<AreaManagement />} />
              <Route path="/categorymanage" element={<CategoryManagement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/loginhistory" element={<LoginHistory />} />
              <Route path='/usermanagement' element={<UserManagement />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/packages" element={<PackageList />} />
              <Route path="/managesubscri" element={<ManageSubscriptions />} />
              <Route path='/admin/changepassword' element={<ResetPassword />} />
              <Route path="/managefeedback" element={<ManageFeedback />} />
              <Route path="/history" element={<UserLoginHistory />} />
              <Route path='/vehiclemanage' element={<VehicleManagement />} />
              <Route path="/businessplaceManage" element={<BusinessPlaceManagement />} />
              <Route path="/assign" element={<ParkingAssignmentManagement />} />
              <Route path="/parkingspace" element={< UserParkingList />} />
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
              <Route path="/history" element={<UserLoginHistory />} />
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/packages" element={<UserPackageList />} />
              <Route path="/parkingspace" element={< UserParkingList />} />
            </Routes>
          </>
        );
      case 2:
        return (
          <>
            <SupervisorSidebar />
            <Routes>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ParkingOwnerDashboard />} />
              <Route path='/supervisor/changepassword' element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/businessplaceManage" element={<BusinessPlaceManagement />} />
              <Route path="/packages" element={<PackageList />} />
              <Route path="/history" element={<UserLoginHistory />} />
              <Route path="/feedback" element={<FeedbackForm />} />
            </Routes>
          </>
        );

      default:
        return (
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/signup' element={<OnlineUserRegistration />} />
            <Route path='/emailsub' element={<SubscribeEmail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        );
    }
  };

  return renderRoutes();
}

export default App;
