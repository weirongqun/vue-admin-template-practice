import {axiosDel, axiosGet, axiosPost, axiosPut} from '@/utils/apiRequest'

export function getRoleList(data){
    return axiosGet('Role/GetAll',data)
}

export function getAllPermission(){
    return axiosGet('Role/GetAllPermissions')
}

export function createRole(formItems){
    return axiosPost('Role/Create',formItems)
}

export function deleteRole(id){
    return axiosDel('Role/Delete',id)
}

export function getRoles(RoleName){
    return axiosGet('Role/GetRoles',RoleName)
}

export function getRoleForEdit(id){
    return axiosGet('Role/GetRoleForEdit',id)
}

export function getRoleById(id){
    return axiosGet('Role/Get',id)
}

export function update(role){
    console.log('axios');
    return axiosPut('Role/Update',role)
}