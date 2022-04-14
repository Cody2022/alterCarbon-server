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
            return (Number((electricityCO2.co2e).toFixed(2)));
            
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        };
    } 

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
           return (Number((gasCO2.co2e).toFixed(2)));
       }
       catch (err) {
           // Handle Error Here
           console.error(err);
       };
   } 


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
       return (Number((waterCO2.co2e).toFixed(2)));
   }
   catch (err) {
       // Handle Error Here
       console.error(err);
   };
} 

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
        return (Number((carCO2.co2e).toFixed(2)));
        }
        catch (err) {
            // Handle Error Here
            console.error(err);
        };
} 

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
       console.log("typeof", typeof plasticCO2);
       return (Number((plasticCO2.co2e).toFixed(4)));
   }
   catch (err) {
       // Handle Error Here
       console.error(err);
   };
} 

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
       return (Number((foodCO2.co2e).toFixed(4)));
   }
   catch (err) {
       // Handle Error Here
       console.error(err);
   };
} 

const carbonCalculation=async(carbonSources)=>{
    let {electricity, nGas, water, food, plastic, car}=carbonSources;
    try {
        let electricityco2e=await electricityEstimate(Number(electricity));
        let gasco2e=await natualGasEstimate(Number(nGas));
        let waterco2e=await waterEstimate(Number(water));
        let foodco2e=await foodWasteEstimate(Number(food));
        let plasticco2e=await plasticWasteEstimate(Number(plastic));
        let carco2e=await passengerCarEstimate(Number(car));

        return {electricityco2e,gasco2e,waterco2e,foodco2e,plasticco2e,carco2e}
    } catch(error){
        console.log("carbonCalculation Error!")
    }
}

module.exports = {
 carbonCalculation
};
