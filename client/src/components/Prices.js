//array contains objects representing different price ranges, each with a unique identifier, 
//a name, and an array of price bounds.
//defining an array of objects named Prices


//This line declares a constant variable named Prices and assigns it an 
//array of objects using the square brackets [ and ]
export const Prices = [
    {
      _id: 0,
      name: " ₹0 to 499",
      array: [0, 499],
    },
    {
      //This line defines the _id property for the second object with the value 1.
//defines the name property for the second object with the value " ₹499 to 1000".
      _id: 1,
      name: " ₹499 to 1000",
      array: [499, 1000],
    },
    {
      _id: 2,
      name: " ₹1000 to 1499",
      array: [1000, 1499],
    },
   
    {
      _id: 3,
      name: " ₹ 1500 to More",
      array: [1500, 9999],
    },
    
  ];