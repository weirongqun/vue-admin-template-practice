import { axiosDel, axiosGet, axiosPost, axiosPut } from "@/utils/apiRequest";

export function getAllTenants(data){
    return axiosGet('Tenant/GetAll',data)
}
export function editTenant(form){
    return axiosPut('Tenant/Update',form)
}
export function deleteTenant(data){
    return axiosDel('Tenant/Delete',data)
}
export function add(data){
    return axiosPost('Tenant/Create',data)
}