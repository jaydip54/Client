import { configureStore } from "@reduxjs/toolkit"
import registerreducer from "../slices/registerSlice";
import rolereducer from "../slices/roleSlice";
import profilereducer from "../slices/profileSlice";
import authreducer from '../slices/authSlice';


const store = configureStore({
    reducer: {
        register: registerreducer,
        role: rolereducer,
        profile: profilereducer,
        auth: authreducer,
    }
})


export default store