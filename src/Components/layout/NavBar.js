import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../utilities/MyButton';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostScream from '../scream/PostScream';



export class NavBar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                   {authenticated ? (
                    <> 
                    <PostScream/>          
                    <Link to="/">
                        <MyButton tip="Home">
                            <HomeIcon/>
                        </MyButton>
                    </Link>
                    
                    <MyButton tip="Notifications">
                        <NotificationsIcon/>
                    </MyButton>
                    </>
                   ) : (
                    <>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    </>
                   )}
                </Toolbar>
            </AppBar>
        )
    }
};

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar);
