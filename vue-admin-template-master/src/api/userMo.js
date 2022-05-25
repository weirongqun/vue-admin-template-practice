import { axiosDel, axiosGet, axiosPost, axiosPut } from "@/utils/apiRequest";

export function getAll(data){
    return axiosGet('User/GetAll',data)
};

export function update(data){
    return axiosPut('User/Update',data)
};

export function createUser(data){
    console.log('axios');
    console.log(data);
    return axiosPost('User/Create',data)
};

export function deleteUser(data){
    return axiosDel('User/Delete',data)
};