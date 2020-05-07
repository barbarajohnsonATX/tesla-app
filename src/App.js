import React from 'react';
import styles from './App.module.css';
import { fetchData, fetchDetailedInfo } from './api/';
import { CardContent, Typography, Grid } from '@material-ui/core';
import Car from './components/Car';


 class App extends React.Component {
  state = {
    data: {},
    details: {},
    myCars: [],
    command: {}
    }

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData)
    this.setState({ data: fetchedData });
  }



  handleDetails = async (e) => {
    e.preventDefault()
    this.setState({myCars: []})
    this.state.data.response.forEach(async (c) => {
      const response = await fetchDetailedInfo(c.id_s)
      this.setState({myCars: [...this.state.myCars, response] })

    })

  }



 


  render() {
    const { data, details, myCars} = this.state;
 
    if(!data.response) {
      return "Loading"
    }

    let detailsExist = !!details.data
    console.log("detailsExist", detailsExist)

    return (
      <div className={styles.container}>
 
        <Grid container spacing={3} justify="space-evenly">

              { data.response.map( (vehicle, id) => 
                  <Grid item xs={12} md={2} key={id} className="vehicle">

                    <CardContent>
                      <Typography color="textPrimary" >Name: {vehicle.display_name}</Typography >
                      <Typography color="textSecondary">ID: {vehicle.id_s}</Typography>
                      <Typography color="textSecondary">VIN: {vehicle.vin}</Typography>
                      <Typography color="textSecondary">State: {vehicle.state}</Typography>
                    </CardContent>

                  </Grid>

              )}
  

                
         </Grid>

         <form onClick = {e => this.handleDetails(e)}>
                  <button className="button" type="submit" value="Get Details" >Get Detailed Info</button>
        </form>  
 
         <Grid container sapcing={3} justify="space-evenly" >
 
                   { myCars.map( (car, id) => <Car car={car} key={id}/> )  }
 
          </Grid>
 
       
      </div>
    );
  }
}

export default App;