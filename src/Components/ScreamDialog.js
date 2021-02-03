import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MyButton from '../utilities/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import LikeButton from './LikeButton';

const styles = (theme) => ({
    seperator: {
        border: 'none',
        margin: 4
    },
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    dialogContent: {
      padding: 20,
      textAlign: 'center'
    },
    closeButton: {
      position: 'absolute',
      left: '90%'
    },
    expandButton: {
      position: 'absolute',
      left: '90%'
    },
    circleOfDeath: {
      textAlign: 'center',
      marginTop: 50,
      marginBottom: 50
    }
  });

class ScreamDialog extends Component{
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        const { classes, 
                scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, 
                UI: loading 
              } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.circleOfDeath}>
            <CircularProgress size={100}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={6}>
                    <img src={userImage} 
                         alt="Profile" 
                         className={classes.profileImage}/>
                </Grid>
                    
                <Grid item sm={6}>
                    <Typography component={Link}
                                color="primary"
                                variant="h5"
                                to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>

                    <hr className={classes.seperator}/>
                    <Typography variant="body2"
                                color="textSecondary"
                    >
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.seperator}/>

                    <Typography variant="body1">
                        {body}
                    </Typography>

                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>

                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    
                    <span>{commentCount} comments</span>
                </Grid>
            </Grid>
        )
              
        return (
            <>
            <MyButton onClick={this.handleOpen}
                      tip="Expand"
                      tipClassName={classes.expandButton}>
                <UnfoldMore color="primary"/>
            </MyButton>

            <Dialog open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='xs'
            >
            <MyButton tip="Close"
                      onClick={this.handleClose}
                      tipClassName={classes.closeButton}
            >
                <CloseIcon/>
            </MyButton>

            <DialogContent className={classes.dialogContent}>
                {dialogMarkup}
            </DialogContent>
            </Dialog>
            </>
              )
    }

}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps ={
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));

