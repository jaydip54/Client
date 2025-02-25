import { configureStore } from "@reduxjs/toolkit"
import departmentreducer from "../slices/departmentSlice";
import ticketreducer from "../slices/ticketSlice";
import registerreducer from "../slices/registerSlice";
import rolereducer from "../slices/roleSlice";
import profilereducer from "../slices/profileSlice";
import authreducer from '../slices/authSlice';
import assignedreducer from '../slices/assigned.Slice'
import supervisorticketreducer from "../slices/superVisorTicketSlice";


const store = configureStore({
    reducer: {
        department: departmentreducer,
        ticket: ticketreducer,
        register: registerreducer,
        role: rolereducer,
        profile: profilereducer,
        auth: authreducer,
        assigned: assignedreducer,
        supervisorticket: supervisorticketreducer
    }
})


export default store