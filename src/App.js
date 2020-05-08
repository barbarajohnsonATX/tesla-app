import React from 'react';
import { fetchData, fetchDetailedInfo } from './api/';
import { CardContent, Typography, Grid, Button, Card, CardHeader} from '@material-ui/core';
import Car from './components/Car';
import InfoIcon from '@material-ui/icons/Info';
import Header from "./components/Header";


 class App extends React.Component {
  state = {
    data: {},
    myCars: [],
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
    

    const { data, myCars} = this.state;
 
    if(!data.response) {
      return "Loading"
    }


    return (

      <Grid container direction="column">
          <Grid item>
              <Header />
          </Grid>
 
 
           <Grid item container>
              <Grid item xs={false} sm={2} />

              { data.response.map( (vehicle, id) => 

                  <Grid item xs={12} sm={4} key={id} className="vehicle">
                    <Card>
                    <CardHeader
                            title={vehicle.display_name}
                     />


                    <CardContent>
                       <Typography variant="body2" component="p">ID: {vehicle.id_s}</Typography>
                      <Typography variant="body2" component="p">VIN: {vehicle.vin}</Typography>
                      <Typography variant="body2" component="p">State: {vehicle.state}</Typography>
                    </CardContent>
                    </Card>
                  </Grid>

              )}
                  <Grid item xs={false} sm={2} />
            </Grid>
                
 



 
          <Grid item container justify="center">
              <Button onClick = {e => this.handleDetails(e)} style={{backgroundColor: "#654F97", color: 'white'}} variant="contained" startIcon={<InfoIcon />}>Details</Button>
          </Grid>

         <Grid container justify="center" >
         <  Grid item xs={false} sm={2} />

                   { myCars.map( (car, id) => <Car car={car} key={id}/> )  }
          <Grid item xs={false} sm={2} />

          </Grid>
 
       
      {/* </div> */}

      </Grid>

     );
  }
}

export default App;