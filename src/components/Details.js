import React from 'react';
 
import { CardContent, Typography, Grid } from '@material-ui/core';

const Details = ( { details }) => {


    return (

        <div>

           
                <CardContent>
                        <Typography color="textSecondary" >Model: {details.data.response.vehicle_config.car_type}</Typography >
                        <Typography color="textSecondary" >Color: {details.data.response.vehicle_config.exterior_color}</Typography >
                        <Typography color="textSecondary" >Odometer: {Math.floor(details.data.response.vehicle_state.odometer)} miles</Typography >

                      <Typography color="textSecondary" >Battery level: {details.data.response.charge_state.battery_level}%</Typography >
                      <Typography color="textSecondary" >Battery range: {details.data.response.charge_state.battery_range} miles</Typography >

                </CardContent>
                 

        </div>
    )

}

export default Details 