//exports two functions for hashing and comparing 
//passwords using the bcrypt library

import bcrypt from "bcrypt";


// function is used to hash a plaintext password.
export const hashPassword = async (password) => {
  try {

//number 10 here represents the cost factor or the 
//number of times the hashing algorithm is applied.    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;

//bcrypt.hash function to hash the 
//provided password with the specified saltRounds
//resulting hashed password is 
//stored in the hashedPassword variable.    
  } catch (error) {
    console.log(error);
  }
};

//defines a named export comparePassword, which is an asynchronous arrow 
//function that takes two arguments: password (the plaintext password to 
//compare) and hashedPassword (the previously hashed password to compare against).
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};