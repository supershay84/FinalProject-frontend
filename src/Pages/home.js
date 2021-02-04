import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../Components/scream/Scream';
import Profile from '../Components/profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';


class home extends Component {
    componentDidMount(){
       this.props.getScreams();
    }
    render() {
        const { screams, loading } = this.props.data
        let recentScreams = !loading ? (
        screams.map((scream) => <Scream key={scream.screamId} scream={scream}/>)
        ) : (<p>Loading...</p>); 
        return (
           <Grid container spacing={10}>
               <Grid item sm={8} xs={12}>
                   {recentScreams}
               </Grid>
               <Grid item sm={4} xs={12}>
                   <Profile></Profile>
               </Grid>
           </Grid>
        )
    }
};

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getScreams })(home);
