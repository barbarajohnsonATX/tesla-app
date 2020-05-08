import React from 'react';
import { CardContent, Typography, Grid, Button, CardHeader, Card, CardActions, Avatar} from '@material-ui/core';
import { honk,  openTrunk, flashLights } from '../api';
import { makeStyles } from '@material-ui/core/styles';


const handleHonk = async (e, id) => {
    e.preventDefault()
       const response = await honk(id)
       console.log("honk response", response)
}

  
/* const handleOpenFrunk = async (e, id) => {
    e.preventDefault()
       const response = await openFrunk(id)
       console.log("openFrunk response", response)
} */

const handleOpenTrunk = async (e, id, which_trunk) => {
    e.preventDefault()
       const response = await openTrunk(id, which_trunk)
       console.log("openTrunk response", response)
}

const handleFlashLights = async (e, id) => {
    e.preventDefault()
       const response = await flashLights(id)
       console.log("flashLights response", response)
}


const useStyles = makeStyles({
    avatarImage: {
        width: 120,
        height: 80,
    },
  
    button: {
        backgroundColor: "#e7222e", 
        color: 'white',
        size: 'small',
        variant: 'contained'
    },
   
  })


const Car = ( {car} ) => {
    const classes = useStyles();
    const { vehicle_config, vehicle_state, charge_state, climate_state, id_s } = car.data.response;


    const model3AvatarUrl = 'https://static-assets.tesla.com/configurator/compositor?&options=$W32D,$PPSW,$DV4W,$SLR1,$MT311,$IN3PB&view=STUD_3QTR&model=m3&size=1441&bkba_opt=1&version=v0027d202005073550&version=v0027d202005073550'
    const modelYAvatarUrl = 'https://static-assets.tesla.com/configurator/compositor?&options=$WY20P,$PPSW,$DV4W,$MTY03,$INYPB&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&version=v0027d202005073550&version=v0027d202005073550'
    


    const carModels = {
        'model3': "Model 3",
        'modely': "Model Y"
    }

    const carAvatars = {
        'model3': model3AvatarUrl,
        'modely': modelYAvatarUrl
    }

    if(!car) {
        return ("Loading")
    } 
    
    return (

 
            <Grid item xs={12} sm={4} className="car">
                <Card>
                    <CardHeader
                            title={carModels[vehicle_config.car_type].toUpperCase()}
                            avatar={<Avatar className={classes.avatarImage} src={carAvatars[vehicle_config.car_type]} />}
                    />
                    
 
                <CardContent >
                    <Typography variant="body2" component="p">Version {vehicle_state.car_version}</Typography >
                    <Typography variant="body2" component="p">Color: {vehicle_config.exterior_color}</Typography >
                    <Typography variant="body2" component="p">Spoiler: {vehicle_config.spoiler_type}</Typography >
                    <Typography variant="body2" component="p">Wheels: {vehicle_config.wheel_type}</Typography >
                    <Typography variant="body2" component="p">Odometer: {Math.floor(vehicle_state.odometer)} miles</Typography >
                    <Typography variant="body2" component="p">Battery level: {charge_state.battery_level}%</Typography >
                    <Typography variant="body2" component="p">Battery range: {Math.floor(charge_state.battery_range)} miles</Typography >   
                    <Typography variant="body2" component="p">Inside Temp: {Math.floor(climate_state.inside_temp)}℃</Typography >   
                    <Typography variant="body2" component="p">Outside Temp: {Math.floor(climate_state.outside_temp)}℃</Typography >   
         
                </CardContent>

                <CardActions>
                    <Button onClick = {e => handleHonk(e, id_s)} className={classes.button} >Honk</Button>
                    <Button onClick = {e => handleOpenTrunk(e, id_s, "front")} className={classes.button} >Frunk</Button>
                    <Button onClick = {e => handleOpenTrunk(e, id_s, "rear")} className={classes.button}>Trunk</Button>
                    <Button onClick = {e => handleFlashLights(e, id_s)} className={classes.button} >Lights</Button>

                
                </CardActions>
                </Card>
            </Grid>
                 

     )

}


export default Car 