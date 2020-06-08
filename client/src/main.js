import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      minWidth: 1080
    }
});

class main extends Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <h2>Home Page</h2>
            </div>
        )
    }
}

export default withStyles(styles)(main);