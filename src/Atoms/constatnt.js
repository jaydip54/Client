
export const baseUrl = `http://localhost:5000/api/`

//endpoints users
export const loginEndpoint = `user/login`;
export const ProfileUserEndpoint = `user/profile`;
export const GetUserEndpoint = `user/get`;
export const AddUserEndpoint = `user/add`;
export const AddUserBySuperVisorEndpoint = `user/SuperVisorAdd`
export const GetSuperVisorDepartment = `user/supervisorget`
export const GetSuperVisorDepartment_technician_only = `user/techniciandepartment`;
//password endpoints
export const ResetpasswordEndpoint = `user/resetpassword`
export const SendOtpEndpoint = `user/sendotp`
export const FillOtpEndpoint = `user/fillotp`
export const ChangePasswordEndpoint = `user/changepassword`
//tickets endpoints
export const TicketCreationEndpoint = `ticket/create`;
export const GetTicketEndpoint = `ticket/get`;
export const GetLoginUserTicketEndpoint = `ticket/loginuserget`;
export const DeleteTicketEndpoint = `ticket/delete`;
export const UpdateTicketEndpoint = `ticket/update`;
export const GetDepartmentFilterEndpoint = `ticket/departmentfilter/`
export const GetFilterData = `ticket/filter/`
export const getloginsupervisorbydepartmentEndpoint = `ticket/getloginsupervisorbydepartment`
export const Getassignedfalse_ticket = `ticket/assignedfalselogin`;
export const Getassignedtrue_ticket = `ticket/assignedtruelogin`;

//departments endpoints
export const DepartmentEndpoint = `department/get`;
export const AddDepartmentEndpoint = `department/add`;

//role endpoints
export const RoleEndpoint = `role/get`;
export const AddRoleEndpoint = `role/add`;

//assignments endpoints
export const assignedgettechnicianlogin = `assigned/technicianget`
export const GetAllassigned = `assigned/getall`
export const GetbyDepartmentAssigned = `assigned/getbydepartment`
export const assignedaddendpoint = `assigned/add`



