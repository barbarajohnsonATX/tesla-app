import React from 'react';
import styles from './App.module.css';
import { fetchData, fetchDetailedInfo } from './api/';
import { CardContent, Typography, Grid } from '@material-ui/core';
import Details from './components/Details';

 
 


 class App extends React.Component {
  state = {
    data: {},
    details: {}
    }

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData)
    this.setState({ data: fetchedData });
  }


   
 

 handleSubmit = async (e, id) => {
   e.preventDefault()
   const response = await fetchDetailedInfo(id)
   this.setState({details: response})

   console.log("vehicles", response)
     
 }


  render() {
    const { data, details } = this.state;

    if(!data.response) {
      return "Loading"
    }

    let detailsExist = !!details.data
    console.log("detailsExit", detailsExist)

    return (
      <div className={styles.container}>
 
        <Grid container spacing={3} justify="center">

              { data.response.map( (vehicle, id) => 
                  <Grid item xs={12} md={3} key={id} className="vehicle">

                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>Name: {vehicle.display_name}</Typography >
                      <Typography color="textSecondary">ID: {vehicle.id}</Typography>
                      <Typography color="textSecondary">VIN: {vehicle.vin}</Typography>
                      <Typography color="textSecondary">State: {vehicle.state}</Typography>
                      
 
                     <form onClick = {e => this.handleSubmit(e, vehicle.id)}>
                         <button className="button" type="submit" value="Get Details" >Get Details</button>
                      </form>  

                      { detailsExist && details.data.response.id === vehicle.id ? <Details details={details}/> : "" }

                    </CardContent>
                  </Grid>

              )}


                
         </Grid>

       
      </div>
    );
  }
}

export default App;