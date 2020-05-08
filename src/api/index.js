import axios from 'axios';


 
const url = 'https://cors-anywhere.herokuapp.com/https://owner-api.teslamotors.com/api/1/vehicles';

const AUTHORIZATION_KEY = process.env.REACT_APP_TESLA_AUTHORIZATION_KEY;
const headers = {
      'Authorization': `Bearer ${AUTHORIZATION_KEY}`,
       //'Content-Type': 'application/json; charset=utf-8',
       //'Content-Type': 'application/x-www-form-urlencoded',
 

    };
 


export const fetchData = async () => {
   
    try {
        const { data: { response } } = await axios.get(url, 
        { headers });
 
        return { response };
        
    } catch (error) {
        return error
        
    }
} 


export const fetchDetailedInfo = async (id) => {
    const detailsUrl = `${url}/${id}/vehicle_data`
  
    try {
      const response = await axios.get(detailsUrl, {headers})
       console.log("resp", response)
       return response 
  
    } catch (error) {
       return error
    }
}




 export const honk =  async(id) => {   
    const honkUrl = `${url}/${id}/command/honk_horn`
    console.log("honkUrl", honkUrl)
 
    try {
        const response = await axios.post(honkUrl, null, { headers });
 
        return response
        
    } catch (error) {
        console.log("Error")
        return error
    }
 
 }

 /* export const openFrunk =  async(id) => {   
    const openFrunkUrl = `${url}/${id}/command/actuate_trunk`
    console.log("openFrunkUrl", openFrunkUrl)
    const body = {"which_trunk":"front"}


    try {
        const response = await axios.post(openFrunkUrl, body, { headers });
 
        return response
        
    } catch (error) {
        console.log("Error")
        return error
    }
 
 } */

 export const openTrunk =  async(id, which_trunk) => {   
    const openTrunk = `${url}/${id}/command/actuate_trunk`
    console.log("openTrunk", openTrunk)
    const body = {"which_trunk": which_trunk}


    try {
        const response = await axios.post(openTrunk, body, { headers });
 
        return response
        
    } catch (error) {
        console.log("Error")
        return error
    }
 
 }

 export const flashLights =  async(id) => {   
    const flash_lights = `${url}/${id}/command/flash_lights`
    console.log("flash_lights", flash_lights)
 

    try {
        const response = await axios.post(flash_lights, null, { headers });
 
        return response
        
    } catch (error) {
        console.log("Error")
        return error
    }
 
 }