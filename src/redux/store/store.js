import { configureStore } from "@reduxjs/toolkit"
import registerreducer from "../slices/registerSlice";
import profilereducer from "../slices/profileSlice";
import authreducer from '../slices/authSlice';
import cityreducer from '../slices/city'
import areareducer from '../slices/area'
import categoryReducer from '../slices/category'
import loginHistoryreducer from '../slices/loginhistory'
import packagesReducer from '../slices/package'
import vehicleRsducer from '../slices/vehicle'
import businessPlaceReducer from '../slices/bussinessPlace'
import parkingAssignmentReducer from '../slices/assign'
import parkingSpacesReducer from '../slices/parkingSpace'
import bookingreducer from '../slices/ParkingBooking'
const store = configureStore({
    reducer: {
        register: registerreducer,
        profile: profilereducer,
        auth: authreducer,
        city: cityreducer,
        area: areareducer,
        category: categoryReducer,
        loginHistory: loginHistoryreducer,
        packages: packagesReducer,
        vehicle: vehicleRsducer,
        businessPlace: businessPlaceReducer,
        parkingAssignment: parkingAssignmentReducer,
        parkingSpaces: parkingSpacesReducer,
        bookings: bookingreducer,
    }
})


export default store