import React from 'react';
import { CardContent, Typography, Grid, Button, CardHeader, Card, CardActions } from '@material-ui/core';
import { honk } from '../api';
import WarningIcon from '@material-ui/icons/Warning';


const handleHonk = async (e, id) => {
    e.preventDefault()
       const response = await honk(id)
       console.log("honk response", response)
         
}

  


const Car = ( {car} ) => {

    console.log("Car", car)
     if(!car) {
        return ("Loading")
    } 

    return (

 
            <Grid item xs={12} sm={5} className="car">

                <Card>
                    <CardHeader
                            title={car.data.response.vehicle_config.car_type}
                    
                    />
                    
 
                <CardContent >
                    <Typography variant="body2" component="p">Version: {car.data.response.vehicle_state.car_version}</Typography >
                    <Typography variant="body2" component="p">Color: {car.data.response.vehicle_config.exterior_color}</Typography >
                    <Typography variant="body2" component="p">Spoiler: {car.data.response.vehicle_config.spoiler_type}</Typography >
                    <Typography  variant="body2" component="p">Wheels: {car.data.response.vehicle_config.wheel_type}</Typography >
                    <Typography  variant="body2" component="p">Roof: {car.data.response.vehicle_config.roof_color}</Typography >
                    <Typography  variant="body2" component="p">Odometer: {Math.floor(car.data.response.vehicle_state.odometer)} miles</Typography >
                    <Typography  variant="body2" component="p">Battery level: {car.data.response.charge_state.battery_level}%</Typography >
                    <Typography  variant="body2" component="p">Battery range: {Math.floor(car.data.response.charge_state.battery_range)} miles</Typography >   
                    <Typography  variant="body2" component="p">Inside Temp: {Math.floor(car.data.response.climate_state.inside_temp)}℃</Typography >   
                    <Typography  variant="body2" component="p">Outside Temp: {Math.floor(car.data.response.climate_state.outside_temp)}℃</Typography >   
         
                </CardContent>

                <CardActions>
                <       Button nClick = {e => handleHonk(e, car.data.response.id_s)} style={{backgroundColor: "#e7222e", color: 'white'}} variant="contained" color="default" startIcon={<WarningIcon />}>Honk</Button>
                </CardActions>
                </Card>
            </Grid>
                 

     )

}

export default Car 