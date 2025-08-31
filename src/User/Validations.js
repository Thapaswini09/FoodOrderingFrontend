//User Register Validation
export const Validation=(values)=>{
    const error={}
    if(values.name==='')
     error.name="Name is required";
    if(values.age===0)
    error.age="Age is required";
    if(values.email==='')
     error.email="Email is required";
    if(values.password==='')
    error.password='Password is required'
    if(values.gender==='')
    error.gender="Gender is required"
    if(values.phonenumber==='')
    error.phonenumber='Phone Number is required'
    return error
}
//User Login Validation
export const LoginValidation=(values)=>{
    const loginError={}
    if(values.email==='')
     loginError.email="Email is required."
    if(values.password==='')
     loginError.password="Password is requied."
    return loginError
}


// Admin Register Validation
// export const AdminValidation = (values) => {
//   const error = {};
//   if (values.name === '')
//     error.name = "Name is required";
//   if (values.email === '')
//     error.email = "Email is required";
//   if (values.password === '')
//     error.password = "Password is required";
//   if (values.restaurant === '')
//     error.restaurant = "Restaurant name is required";
//   if (values.phonenumber === '')
//     error.phonenumber = "Phone number is required";
//   return error;
// };
