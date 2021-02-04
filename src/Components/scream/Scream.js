import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultImage from '../../images/images-1.jpg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../utilities/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';




const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        object: 'cover'
    }
}

class Scream extends Component { 
    render() {
        // EX: POSTED XXH AGO
        dayjs.extend(relativeTime)

        const { classes, 
                scream : 
                { body, 
                  createdAt, 
                  userImage, 
                  userHandle, 
                  screamId, 
                  likeCount, 
                  commentCount
                },
                user: {
                    authenticated,
                    credentials: { handle }
                }
             } = this.props;

        // ONLY DELETE AUTHENTICATED USER'S SCREAMS/COMMENTS
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId ={screamId} />
        ) : null

        return (
           <Card className={classes.card}>
               <CardMedia
               height="200"
               className={classes.image} 
               image={defaultImage}
               title="Profile image"
               />
               
               <CardContent className={classes.content} >
                   <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`} 
                    color="primary">
                    {userHandle}
                   </Typography>

                   {deleteButton}

                    <Typography 
                    variant="body2" 
                    color="textSecondary">{dayjs(createdAt).fromNow()}
                    </Typography>
                    
                    <Typography 
                    variant="body1">{body}
                    </Typography>
                    
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    
                    <span>{commentCount} comments</span>

                    <ScreamDialog screamId={screamId} 
                                  userHandle={userHandle}
                    />
                    
               </CardContent>
           </Card>
        )
    }
};

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    // openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
