import React from 'react';
import { fetchData, fetchDetailedInfo, wake } from './api/';
import { CardContent, Typography, Grid, Button, Card, CardHeader, CardActions } from '@material-ui/core';
import Car from './components/Car';
import InfoIcon from '@material-ui/icons/Info';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Header from "./components/Header";
 

 class App extends React.Component {
  state = {
    data: {},
    myCars: [],
    isHovering: false,
    
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

  
  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
 
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  handleWake = async (e, id) => {
    e.preventDefault()
       const response = await wake(id)
       console.log("wake response", response)
       const fetchedData = await fetchData();
       console.log(fetchedData)
       this.setState({ data: fetchedData });

}


  render() {
    

    const { data, myCars, isHovering } = this.state;



 
 
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


                    <CardContent onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} >
                      {isHovering  ? 
                          <div> 
                              <Typography variant="body2" component="p">ID: <VisibilityIcon color="primary" fontSize="small"/> {vehicle.id}</Typography>
                              <Typography variant="body2" component="p">VIN: <VisibilityIcon color="primary" fontSize="small"/> {vehicle.vin}</Typography>
                            </div>
                       :    
                       
                          <div>
                            <Typography variant="body2" component="p">ID: <VisibilityOffIcon color="secondary" fontSize="small"/></Typography>
                            <Typography variant="body2" component="p">VIN: <VisibilityOffIcon color="secondary" fontSize="small"/></Typography>
                          </div>

                      }

                      <Typography variant="body2" component="p">State: {vehicle.state}</Typography>
                    </CardContent>


                    <CardActions>
                      {vehicle.state === 'asleep' ? 
                         <Button onClick = {e => this.handleWake(e, vehicle.id_s)}>Wake</Button>
 
                      : "" }
                
                    </CardActions>


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