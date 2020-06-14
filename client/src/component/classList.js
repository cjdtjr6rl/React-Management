import React from 'react';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class ClassList extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.grade}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.score}</TableCell>
            </TableRow>
        );
    }
}

export default ClassList;