import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Icon from '../images/images-1.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
    form: {
        backgroundColor: 'white',
        textAlign: 'center',
        height: '600px'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '20px auto 20px auto',
        
    },
    textField: {
        margin: '20px auto 20px auto',
        
    },
    button: {
        margin: 20,
        position: 'relative'
    
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    }
};

class login extends Component {
    constructor(){
        super();
        this.state= {
            email: '',
            password: '',
            errors: {}
        };
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.UI.errors){
    //         this.setState({ errors: nextProps.UI.errors });
    //     }
    // };
    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history)
    };
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { classes, UI: loading } = this.props;
        const { errors } = this.state;
        return (
           <Grid container className={classes.form}>
               <Grid item sm/>
               <Grid item sm>
                   <img src={Icon} className={classes.image} alt="void"/>
                    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" 
                                   name="email" type="email" label="Email" className={classes.textField}
                                   helperText={errors.email} 
                                   error={errors.email ? true : false }
                                   value={this.state.email} 
                                   onChange={this.handleChange} 
                                   fullWidth/> 
                        <TextField id="password" 
                                   name="password" 
                                   type="password" 
                                   label="Password" 
                                   className={classes.textField} 
                                   helperText={errors.password} 
                                   error={errors.password ? true : false }
                                   value={this.state.password} 
                                   onChange={this.handleChange} 
                                   fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}
                            </Typography>
                        )}
                        <Button type="submit" 
                                variant="contained" 
                                color="primary" 
                                className={classes.button}
                                disabled={loading}>LOGIN
                                {loading && (
                                    <LinearProgress variant="determinate" className={classes.progress}/>
                                )}
                        </Button>
                        <br/>
                        <small>Sign Up <Link to="/signup">Here</Link></small>    
                    </form>
               </Grid>
               <Grid item sm/>
           </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
