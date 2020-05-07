import React from 'react';
 
import { CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Car.module.css';
import { honk } from '../api';



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

        <div className={styles.container}>

            <Grid item xs={12} md={12} className="car">

                <CardContent >
                    <Typography color="textPrimary" >Model: {car.data.response.vehicle_config.car_type}</Typography >
                    <Typography color="textSecondary" >Version: {car.data.response.vehicle_state.car_version}</Typography >
                    <Typography color="textSecondary" >Color: {car.data.response.vehicle_config.exterior_color}</Typography >
                    <Typography color="textSecondary" >Spoiler: {car.data.response.vehicle_config.spoiler_type}</Typography >
                    <Typography color="textSecondary" >Wheels: {car.data.response.vehicle_config.wheel_type}</Typography >
                    <Typography color="textSecondary" >Roof: {car.data.response.vehicle_config.roof_color}</Typography >
                    <Typography color="textSecondary" >Odometer: {Math.floor(car.data.response.vehicle_state.odometer)} miles</Typography >
                    <Typography color="textSecondary" >Battery level: {car.data.response.charge_state.battery_level}%</Typography >
                    <Typography color="textSecondary" >Battery range: {Math.floor(car.data.response.charge_state.battery_range)} miles</Typography >   
                    <Typography color="textSecondary" >Inside Temp: {Math.floor(car.data.response.climate_state.inside_temp)}℃</Typography >   
                    <Typography color="textSecondary" >Outside Temp: {Math.floor(car.data.response.climate_state.outside_temp)}℃</Typography >   
         

                    {console.log("id_s", car.data.response.id_s)}
                    <form onClick = {e => handleHonk(e, car.data.response.id_s)}>

                        <button className="button" type="submit" >Honk</button>
                    </form>

                </CardContent>
            </Grid>
                 

        </div>
    )

}

export default Car 