import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import themes from '../utilities/themes';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import dayjs from 'dayjs';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { logoutUser, uploadImage } from '../redux/actions/userActions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditProfile from './EditProfile';


const styles = (theme) => ({
    paper: {
        padding:20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
    '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
            verticalAlign: 'middle'
        },
        '& a': {
            color: themes.palette.primary.main
        }
    },
    '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
    },
    '& svg.button': {
        '&:hover': {
            cursor: 'pointer'
        }
    }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20pz 10px'
        }
    }

});

class Profile extends Component {
    handleImageChange = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated}} = this.props;
        
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
              <div className={classes.profile}>
                  <div className="image-wrapper">
                      <img src={imageUrl} 
                           alt="profile" 
                           className="profile-image"/>
                       <input type="file" 
                              id="imageInput"
                              hidden="hidden" 
                              onChange={this.handleImageChange}/>
                        <Tooltip title="Edit Pic" placement="bottom">
                        <IconButton onClick={this.handleEditPicture}    className="button">
                            <EditIcon color="primary"/>
                        </IconButton>
                        </Tooltip>
                  </div>
                  {/* HORIZONTAL BORDER */}
                  <hr/>
                  <div className="profile-details">
                    <MuiLink component={Link}
                             to={`/users/${handle}`}
                             color="primary"
                             variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <>
                        <LocationOn color="primary"/> <span>{location}</span>
                        <hr/>
                        </>
                    )}
                    {website && (
                        <>
                        <LinkIcon color="primary"/>
                        <a href={website} 
                           target="blank"
                           rel="noopener noreferrer">
                            {' '}{website}
                        </a>
                        <hr/>
                        </>
                    )}
                    <CalendarTodayIcon color="primary"/>{' '}
                    <span>Joined {dayjs(createdAt).format('MM YYYY')}</span>
                  </div>
                  <Tooltip title="Logout" placement="bottom">
                      <IconButton onClick={this.handleLogout}>
                          <ExitToAppIcon/>
                      </IconButton>
                  </Tooltip>
                  <EditProfile/>
              </div> 
            </Paper>
        ): (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                  Unable to find profile. Please Login.  
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" 
                            color="primary" 
                            component={Link} 
                            to="/login"> LOGIN
                    </Button>
                    <Button variant="contained" 
                            color="secondary" 
                            component={Link} 
                            to="/signup"> SIGNUP
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>)
        
        return profileMarkup;
    }
}
 
const mapStateToProps = (state) => ({
     user: state.user
 });

 const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
 };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
