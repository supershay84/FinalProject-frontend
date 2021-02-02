import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import defaultImage from '../images/images-1.jpg';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import MyButton from '../utilities/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



const styles = {
    card: {
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
    // CHECK IF USER LIKED SCREAM ALREADY
    likedScream = () => {
        if(this.props.user.likes && 
           this.props.user.likes.find(
                (like) => like.screamId === this.props.scream.screamId))
            return true;
        else return false;
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    };

    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    };

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
                    authenticated
                }
             } = this.props;

        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary"/>
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="Unlike"
                          onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like"
                          onClick={this.likeScream}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        )

        return (
           <Card className={classes.card}>
               <CardMedia
               height="200"
               className={classes.image} 
               image={defaultImage}
               title="Profile image"/>
               <CardContent className={classes.content} >
                   <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`} 
                    color="secondary">{userHandle}</Typography> 
                   <Typography 
                    variant="body2" 
                    color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                   <Typography 
                    variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
               </CardContent>
           </Card>
        )
    }
};

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
