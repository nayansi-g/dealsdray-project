import EmployeeForm from "../EmployeeForm/EmployeeForm"

const UpdateEmployee = ({updateItem, fetchData, closeUpdate})=>{
    return <>
        <EmployeeForm closeUpdate={closeUpdate} updateItem={updateItem} fetchData={fetchData} type="Updating" />
    </>
}


export default UpdateEmployee;