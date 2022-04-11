const axios=require("axios");
require("dotenv").config()
const APIKey=process.env.CarbonAPIKey;

const url="https://beta3.api.climatiq.io/estimate";

const headers={
    Authorization: `Bearer ${APIKey}`
    };

/* Electricity carbon function*/
const electricityEstimate=async (electricity=0)=>{
     const data= {
                emission_factor: {
                    id: "electricity-energy_source_grid_mix",
                    region: 'CA-AB'
                },   
                parameters: {
                energy: electricity,
                energy_unit: "kWh",
                },
            }
     try {
            let response=await axios.post(url, data, {
                headers: headers,
            });
            let electricityCO2=response.data;
            console.log(electricityCO2);
            return (electricityCO2.co2e);
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        };
    } 

// electricityEstimate(294)

/* naturalGasEstimate function*/
const natualGasEstimate=async (gasGJ=0)=>{
    const data= {
               emission_factor: {
                   id: "fuel_type_natural_gas-fuel_use_stationary_combustion",
                },   
               parameters: {
               energy: gasGJ,
               energy_unit: "GJ",
               },
           }
    try {
           let response=await axios.post(url, data, {
               headers: headers,
           });
           let gasCO2=response.data;
           console.log(gasCO2);
           return (gasCO2.co2e);
       }
       catch (err) {
           // Handle Error Here
           console.error(err);
       };
   } 

//    natualGasEstimate(9)

/* waterEstimate function*/
const waterEstimate=async (volume=0)=>{
    const data={
               emission_factor: {
                   id: "water-treatment",
                },   
               parameters: {
                   volume: volume,
                   volume_unit: "m3",
               },
           }
    try {
       let response=await axios.post(url, data, {
           headers: headers,
       });
       let waterCO2=response.data;
       console.log(waterCO2);
       return (waterCO2.co2e);
   }
   catch (err) {
       // Handle Error Here
       console.error(err);
   };
} 
// waterEstimate(9)

/* passengerCarEstimate function*/
const passengerCarEstimate=async (distance=0)=>{
     const data={
                emission_factor: {
                    id: "passenger_vehicle-vehicle_type_car-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
                },   
                parameters: {
                    distance: distance,
                    distance_unit: "km",
                },
            }
     try {
        let response=await axios.post(url, data, {
            headers: headers,
        });
        let carCO2=response.data;
        console.log(carCO2);
        return (carCO2.co2e);
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        };
} 

// passengerCarEstimate(10)

/* plasticWasteEstimate function*/
const plasticWasteEstimate=async (weight=0)=>{
    const data={
               emission_factor: {
                   id: "waste_type_mixed_plastics-disposal_method_landfilled",
                },   
               parameters: {
                   weight: weight,
                   weight_unit: "kg",
               },
           }
    try {
       let response=await axios.post(url, data, {
           headers: headers,
       });
       let plasticCO2=response.data;
       console.log(plasticCO2);
       return (plasticCO2.co2e);
   }
   catch (err) {
       // Handle Error Here
       console.error(err);
   };
} 
// plasticWasteEstimate(20)

/* plasticWasteEstimate function*/
const foodWasteEstimate=async (weight=0)=>{
    const data={
               emission_factor: {
                   id: "waste_type_mixed_organics-disposal_method_composted",
                },   
               parameters: {
                   weight: weight,
                   weight_unit: "kg",
               },
           }
    try {
       let response=await axios.post(url, data, {
           headers: headers,
       });
       let foodCO2=response.data;
       console.log(foodCO2);
       return (foodCO2.co2e);
   }
   catch (err) {
       // Handle Error Here
       console.error(err);
   };
} 
// foodWasteEstimate(20)

module.exports = {
  electricityEstimate,
  natualGasEstimate,
  waterEstimate,
  passengerCarEstimate,
  foodWasteEstimate,
  plasticWasteEstimate,
};
