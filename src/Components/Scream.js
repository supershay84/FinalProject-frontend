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
    render() {
        // EX: POSTED XXH AGO
        dayjs.extend(relativeTime)
        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = this.props;
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
               </CardContent>
           </Card>
        )
    }
}

export default withStyles(styles)(Scream);
