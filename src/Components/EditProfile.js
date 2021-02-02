import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { editUserProfile } from '../redux/actions/userActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';


const styles = (theme) => ({
   
});

class EditProfile extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserProfile(userDetails);
        this.handleClose();
    };

    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);  
    };
    
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        }); 
    };
    
    render() {
        const { classes } = this.props;
        return (
         <>
            <Tooltip title="Edit Profile" placement="bottom">
                <IconButton onClick={this.handleOpen} className={classes.button}>
                    <EditIcon/>
                </IconButton>
            </Tooltip>
            <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="xs">
                <DialogTitle>Edit your profile</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField name="bio"
                                   type="text"
                                   label="Bio"
                                   multiline
                                   rows="3"
                                   placeholder="Scream about yourself"
                                   className={classes.textField}
                                   value={this.state.bio}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                          <TextField name="website"
                                   type="text"
                                   label="Website"
                                   placeholder="Where can we find you?"
                                   className={classes.textField}
                                   value={this.state.website}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                          <TextField name="location"
                                   type="text"
                                   label="Location"
                                   placeholder="Where are you screaming from?"
                                   className={classes.textField}
                                   value={this.state.location}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
         </>
        )
    }
};

EditProfile.propTypes = {
    editUserProfile: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserProfile })(withStyles(styles)(EditProfile));
