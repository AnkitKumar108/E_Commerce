import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import validator from 'validator';
import {Country,State,City} from 'country-state-city'

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  // const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");



  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // const [selectedCountry, setSelectedCountry] = useState(auth?.user?.country || '');
  // const [selectedState, setSelectedState] = useState(auth?.user?.state || '');
  // const [selectedCity, setSelectedCity] = useState(auth?.user?.city || '');


  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  
  // Load countries and set the default selected country
useEffect(() => {
  const countryData = Country.getAllCountries();
  setCountries(countryData);
  
  // Set the user's country if available, but only on initial component load
  if (!selectedCountry) {
    setSelectedCountry(auth?.user?.country);
  }
}, [auth?.user, selectedCountry]);

// Load states based on the selected country
useEffect(() => {
  if (selectedCountry) {
    const stateData = State.getStatesOfCountry(selectedCountry);
    setStates(stateData);
    
    // Ensure that the selected state is reset if it's no longer available in the new country
    if (!stateData.some((state) => state.isoCode === selectedState)) {
      setSelectedState('');
    }
  }
}, [selectedCountry]);

// Load cities based on the selected state
useEffect(() => {
  if (selectedState) {
    const cityData = City.getCitiesOfState(selectedCountry, selectedState);
    setCities(cityData);
    
    // Ensure that the selected city is reset if it's no longer available in the new state
    if (!cityData.some((city) => city.isoCode === selectedCity)) {
      setSelectedCity('');
    }
  }
}, [selectedState]);

  
  
  
  // useEffect(() => {
  //   // Load countries and set the default selected country
  //   const countryData = Country.getAllCountries();
  //   setCountries(countryData);
  //   // setSelectedCountry(countryData[100]?.isoCode);
  // }, []);

  // useEffect(() => {
  //   // Load states based on the selected country
  //   if (selectedCountry) {
  //     const stateData = State.getStatesOfCountry(selectedCountry);
  //     setStates(stateData);
  //     // setSelectedState('');
  //   }
  // }, [selectedCountry]);

  // useEffect(() => {
  //   // Load cities based on the selected state
  //   if (selectedState) {
  //     const cityData = City.getCitiesOfState(selectedCountry,selectedState);
  //     setCities(cityData);
      
  //   }
  // }, [selectedState]);

  



  //get user data
  useEffect(() => {
    const { email, name, phone, city, address1,pincode, address2, address3, state, country } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress1(address1);
    setAddress2(address2);
    setAddress3(address3);
    setSelectedCity(city);
    setPincode(pincode);
    setSelectedState(state);
    setSelectedCountry(country);
  }, [auth?.user]);
  
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };
  
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  console.log(selectedCity)
  console.log(selectedState)
  console.log(selectedCountry)
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm()
    if(validateForm()){
    try {
      const updatedCountry = countries.find((country) => country.isoCode === selectedCountry);
      const updatedState = states.find((state) => state.isoCode === selectedState);
      const {data} = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        password,
        phone,
        address1,
        address2,
        address3,
        city: selectedCity,
        pincode,
        state: updatedState.name,
        country: updatedCountry.name,
      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success("Profile Updated Successfully ")
        window.location.reload()
      }

      setSelectedCountry(updatedCountry.isoCode);
      setSelectedState(updatedState.isoCode);
      setSelectedCity(selectedCity);

      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
};




const clearErrors = () => {
  const errors = document.getElementsByClassName('formerror');
  for (let item of errors) {
    item.innerHTML = '';
  }
};

const seterror = (id, error) => {
  // sets error inside tag of id
  const element = document.getElementById(id);
  if (element) {
    const errorElement = element.getElementsByClassName('formerror')[0];
    if (errorElement) {
      errorElement.innerHTML = error;
    }
  }
};



//   const clearErrors = () => {
//     const errors = document.getElementsByClassName('formerror');
//     for(let item of errors)
//     {
//         item.innerHTML = "";
//     }


// }
// const seterror =(id, error) => {
//     //sets error inside tag of id 
//     const element = document.getElementById(id);
//     element.getElementsByClassName('formerror')[0].innerHTML = error;

// }




const validateForm = () => {
    var returnval = true;
    clearErrors();

    //perform validation and if validation fails, set the value of returnval to false
    const name = document.forms['myForm']["fname"].value;
    if (!isNaN(name)){
        seterror("name", "*Enter a valid name");
        returnval = false;
    }

    if (name.length === 0){
        seterror("name", "*Please enter your name");
        returnval = false;
    }


    var password = document.forms["myForm"]["fpass"].value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password.length === 0) {
      seterror("pass","*Please enter your password");
      returnval=false;
    }

     else if (password.length<8) {
      seterror("pass","*Password must be 8 character");
      returnval=false;
    
    }else{
      const numberPattern = /\d/;
      const specialCharPattern = /[@$!%*?&]/;
      const lowercasePattern = /[a-z]/;
      const uppercasePattern = /[A-Z]/;

    if (!numberPattern.test(password)) {
      seterror("pass","*Include one number");
      returnval=false;
    }
    if (!specialCharPattern.test(password)) {
      seterror("pass","*Include one symbol");
      returnval=false;
    }
     if (!lowercasePattern.test(password)) {
      seterror("pass","*Include one lowercase");
      returnval=false;
    }
     if (!uppercasePattern.test(password)) {
      seterror("pass","*Include one uppercase");
      returnval=false;
  }

  }




    var phone = document.forms["myForm"]["fphone"].value;
    if (phone.length !== 10) {
      seterror("phone", "*Please enter your phone");
      returnval = false;
    } else {
      var expr = /^(0|91)?[6-9][0-9]{9}$/;
      if (!expr.test(phone)) {
        seterror("phone", "*Enter Valid Indian Phone Number!");
        returnval = false;
      }
      if (isNaN(phone)) {
        seterror("phone", "*Enter a valid Phone Number!");
        returnval = false;
      }
    }

    var address1 = document.forms["myForm"]["faddress1"].value;
    if (address1.length === 0) {
      seterror("address1", "*Please enter your address");
      returnval = false;
    }
    var address2 = document.forms["myForm"]["faddress2"].value;
    if (address2.length === 0) {
      seterror("address2", "*Required field!");
      returnval = false;
    }

    if (!selectedCity) {
      seterror("city", "*Please select city");
      returnval = false;
    }

    if (!selectedState) {
      seterror("state", "*Please select state");
      returnval = false;
    }
    if (!selectedCountry) {
      seterror("country", "*Please select country");
      returnval = false;
    }

    var pincode = document.forms["myForm"]["fpincode"].value;
    if (!pincode) {
      seterror("pincode", "*Please enter pincode");
      returnval = false;
      }else if (pincode.length !== 6) {
        seterror("pincode", "*Enter a valid 6 digit pincode!");
        returnval = false;

    
    }
    
    return returnval;
  };

const handleNameKeyPress = (e) => {
  // Get the key code of the pressed key
  const keyCode = e.charCode;

  // Check if the pressed key is a number (0-9)
  if (keyCode >= 48 && keyCode <= 57) {
    e.preventDefault(); // Prevent the input of numbers
  }
};

const handleKeyPress = (e) => {
  // Get the key code of the pressed key
  const keyCode = e.charCode;

  // Check if the pressed key is a number (0-9)
  if (keyCode < 48 || keyCode > 57) {
    e.preventDefault(); // Prevent the input of non-numeric characters
  }
};
  return (
    <Layout title={"Your Profile"}>
        <div className='container-fluid m-3 p-3 dashboard'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu/>
            </div>
            <div className='col-md-9'>
            <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} name='myForm'>
          <h4 className="title">Update Profile </h4>
          <div className="mb-3" id='name'>
            <input
              type="text"
              name='fname'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleNameKeyPress}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              
              autoFocus
            /><span class="formerror"> </span>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              
              disabled
            />
          </div>
          <div className="mb-3" id='pass'>
            <input
              type="password"
              name='fpass'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              
            /><span class="formerror"> </span>
          </div>
          <div className="mb-3" id='phone'>
            <input
              type="text"
              name="fphone"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              
            /><span class="formerror"> </span>
          </div>
          <div className="col-sm mb-3" id="country">
          <select
            style={{width: 250, height: 30}}
            bordered={false}
            placeholder="Select a category"
            size="large"
            name="fcountry"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
          {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
          </div>

          <div className="col-sm mb-3" id="state">
          <select
            style={{width: 250,height: 30}}
            name="fstate"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          <br/><span class="formerror"> </span>
          </div>
          
          <div className="col-sm mb-3" id="city">
          <select
            style={{width: 250,height: 30}}
            name="fcity"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.isoCode} value={city.isoCode}>
                {city.name}
              </option>
            ))}
          </select>
          <br/><span class="formerror"> </span>
          </div>

          <div className="mb-3" id="address1">
            <input
              type="text"
              name="faddress1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="House No., Building Name"             
            /><span class="formerror"> </span>
          </div>
          <div className="mb-3" id="address2">
            <input
              type="text"
              name="faddress2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Road Name, Area, Colony"             
            /><span class="formerror"> </span>
          </div>
          <div className="mb-3" id="address3">
            <input
              type="text"
              name="faddress3"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Landmark(Optional)"             
            />
          </div>

          <div className="col-sm mb-3" id="pincode">
            <input
              type="pincode"
              name="fpincode"
              value={pincode}
              maxLength={6}
              onChange={(e) => setPincode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Pincode"             
            /><span class="formerror"> </span>
          </div>
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </div>
        </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile






//errorr waala code from here

// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";

// const Profile = () => {
//   // Context
//   const [auth, setAuth] = useAuth();

//   // User information
//   const [name, setName] = useState("");
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
  
//   // Address information
//   const [pincode, setPincode] = useState("");
//   const [cityDistrict, setCityDistrict] = useState("");
//   const [state, setState] = useState("");

//   // // Handle ZIP code search
//   // const handleZipCodeSearch = async () => {
//   //   if (pincode.length === 6) {
//   //     try {
//   //       const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
//   //       const [data] = response.data;
//   //       if (data && data.Status === "Success") {
//   //         const { PostOffice } = data;
//   //         const [office] = PostOffice;
//   //         setCityDistrict(office.District); // Update cityDistrict
//   //         setState(office.State); // Update state
//   //       } else {
//   //         // Handle error or clear fields if PIN code is invalid
//   //         setCityDistrict(""); // Clear cityDistrict
//   //         setState(""); // Clear state
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching data from the API:", error);
//   //     }
//   //   } else {
//   //     // Clear fields if PIN code is not 6 digits
//   //     setCityDistrict(""); // Clear cityDistrict
//   //     setState(""); // Clear state
//   //   }
//   // };

//  
//   };





