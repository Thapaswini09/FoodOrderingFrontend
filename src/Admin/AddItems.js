import React, { useState } from 'react';
import '../css/AddItems.css';
import { toast } from 'react-toastify';
import { AddItemValidation } from './AdminValidation';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddItems = () => {
  const [form, setForm] = useState({
    resturentName: '',
    foodName: '',
    foodDescription: '',
    foodType: '',
    foodPrice: '',
    foodImage: null,
    lat: '',
    log: ''
  });

  const [error, setError] = useState({});
  const handleChange = (e) => {
   setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm(prev => ({
          ...prev,
          lat: position.coords.latitude,
          log: position.coords.longitude
        }));
        toast.success('Location fetched!', { autoClose: 1500 });
      },
      () => toast.error('Failed to get location')
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errorsData = AddItemValidation(form);
  if (Object.keys(errorsData).length === 0) {
    const formData = new FormData();
    formData.append('resturentName', form.resturentName);
    formData.append('foodName', form.foodName);
    formData.append('foodDescription', form.foodDescription);
    formData.append('foodType', form.foodType);
    formData.append('foodPrice', form.foodPrice);
    formData.append('lat', form.lat);
    formData.append('lon', form.log);
    
    // Append image
    if (form.foodImage) {
      formData.append('foodImage', form.foodImage);
    } else {
      toast.error('Please select an image');
      return;
    }

    try {
      const token = Cookies.get('adminToken');
      const res = await axios.post('http://localhost:8000/api/add-items', formData, {
        headers: {
          'x-access-token': token
        },
        withCredentials: true
      });
      setError({});
      toast.success(res.data.message, { autoClose: 2000 });
      setForm({
        resturentName: '',
        foodName: '',
        foodDescription: '',
        foodType: '',
        foodPrice: 0,
        foodImage: null,
        lat: '',
        log: ''
      })
    } catch (error) {
    
      setError({});
      toast.error(error.response.data.message);
    }
  } else {
    setError(errorsData);
  }
};


  return (
    <div class="add-item">
    <div className="form-container">
      <h2>Add Item</h2>

      <input name="resturentName" type="text" placeholder="Restaurant Name" onChange={handleChange} value={form.resturentName} />
      <span>{error.resturentName}</span>

      <input name="foodName" type="text" placeholder="Food Name" onChange={handleChange} value={form.foodName} />
      <span>{error.foodName}</span>

      <textarea name="foodDescription" placeholder="Description" onChange={handleChange} value={form.foodDescription}></textarea>
      <span>{error.foodDescription}</span>

      <select name="foodType" onChange={handleChange} value={form.foodType}>
        <option value="">Select Category</option>
        <option value="vegetarian">Veg</option>
        <option value="non">Non-Veg</option>
        <option value="softdrink">Soft Drinks</option>
        <option value="fastfood">Fast Food</option>
      </select>
      <span>{error.foodType}</span>

      <input name="foodPrice" type="number" placeholder="Price" onChange={handleChange} value={form.foodPrice} />
      <span>{error.foodPrice}</span>
      <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, foodImage: e.target.files[0] })} />
      <button className="btn blue" type="button" onClick={handleGetLocation}>Get Location</button>

      <input
        type="number"
        placeholder="Enter latitude"
        name="lat"
        value={form.lat}
        onChange={handleChange}
      />
      <span>{error.lat}</span>

      <input
        type="number"
        placeholder="Enter longitude"
        name="log"
        value={form.log}
        onChange={handleChange}
      />
      <span>{error.log}</span>

      <button className="btn green" type="submit" onClick={handleSubmit}>Add Item</button>
    </div>
    </div>
  );
};

export default AddItems;
