import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    display: 'inline-block',
    float: 'left',
    minWidth: 275,
    maxWidth: 500,
    margin: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleResource(data: any) {
    const classes = useStyles();
    const { title, author, exerpt, resolved_url, time_length } = data.resource

    return (
    <Card className={classes.card}>
        <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
            {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {author} - {time_length} Seconds
        </Typography>
        <Typography variant="body2" component="p">
            {exerpt}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small">{resolved_url}</Button>
        </CardActions>
    </Card>
    );
}