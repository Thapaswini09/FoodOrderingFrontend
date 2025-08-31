export const AdminValidation = (values) => {
  const error = {};
  if (values.name === '')
    error.name = "Name is required";
  if (values.email === '')
    error.email = "Email is required";
  if (values.password === '')
    error.password = "Password is required";
  if (values.resturentname === '')
    error.resturentname = "Restaurant name is required";
  if (values.phonenumber === '')
    error.phonenumber = "Phone number is required";
  return error;
};


export const LoginValidation=(values)=>{
    const loginError={}
    if(values.email==='')
     loginError.email="Email is required."
    if(values.password==='')
     loginError.password="Password is requied."
    return loginError
}

export const AddItemValidation=(value)=>{
  const itemError={}
  if(value.resturentName==='')
  itemError.resturentName="Resturent is required."
  if(value.foodPrice===0 || value.price === '')
  itemError.foodPrice="Price is required"
  if(value.log==='')
  itemError.log="Longitutde is required."
  if(value.lat==='')
  itemError.lat="Latitute is required."
  if(value.foodName==='')
  itemError.foodName="Food Name is required."
  if(value.foodType==='')
  itemError.foodType="Category is required."
  if(value.foodDescription==='')
  itemError.foodDescription="Description is required."
// // Image validation
// if (!value.foodImage) {
//   itemError.foodImage = "Image is required.";
// } else if (!['image/jpeg', 'image/png', 'image/jpg'].includes(value.foodImage.type)) {
//   itemError.foodImage = "Only JPG or PNG images are allowed.";
// } else if (value.foodImage.size > 2 * 1024 * 1024) {
//   itemError.foodImage = "Image must be smaller than 2MB.";
// }
return itemError;
}