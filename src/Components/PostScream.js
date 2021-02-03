import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../redux/actions/dataActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyButton from '../utilities/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: '10px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '5%'    }
});

class PostScream extends Component{
    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '', open: false, errors: {} });
        }
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postScream({ body: this.state.body })
    };

    render(){
        const { errors } = this.state;
        const { classes, UI: loading} = this.props;
        
        return(
            <>
            <MyButton onClick={this.handleOpen}
                      tip="Post SCREAM!"
            >
                <AddIcon/> 
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

            <DialogTitle>Post a new SCREAM!</DialogTitle>

            <DialogContent>
               <form onSubmit={this.handleSubmit}>
                   <TextField name="body"
                              text="text"
                              label="SCREAM!"
                              multiline
                              rows="3"
                              placeholder="SCREAM INTO THE VOID!"
                              error={errors.body ? true : false}
                              helperText={errors.body}
                              className={classes.TextField}
                              onChange={this.handleChange}
                              fullWidth
                    />
                    
                    <Button type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submitButton}
                            disabled={loading}
                    >SUBMIT
                     {loading && (
                        <CircularProgress size={30}
                                          className={classes.progressSpinner}/>
                     )} 
                    </Button>
               </form> 
            </DialogContent>
            </Dialog>
            </>
        )
    }
};

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));