import React, { Component } from 'react';
import Classlist from './component/ClassList';
import ClassAdd from './component/ClassAdd';
import { withStyles } from '@material-ui/core/styles';

/* material-ui를 이용하여 table 생성 */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'

/* topbar */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
      width: '100%',
      minWidth: 1080
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        marginLeft: 18,
        marginRight: 18
    },
    progress: {
        margin: theme.spacing.unit * 2
    },
    tableHead: {
        fontSize: '1.0rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
            width: '20ch',
            },
        },
    },
});

class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: '',
            completed: 0
        }
    }

    stateRefresh = () => {
        this.setState({
            list: '',
            completed: 0
        });
        this.callApi()
            .then(res => this.setState({list: res}))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({list: res}))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/list');
        const body = await response.json();
        return body;
    }

    progress = () => {
        const { completed } = this.state;
        this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    }

    render() {
        const { classes } = this.props;
        const cellList = ["학년", "과목이름", "학점"]
        return(
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                        졸업사정회 표
                        </Typography>
                        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="검색하기"
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                        />
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.menu}>
                    <ClassAdd stateRefresh={this.stateRefresh}/>
                </div>
                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {cellList.map(c => {
                                    return <TableCell className={classes.TableHead}>{c}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            this.state.list ? this.state.list.map(c => { // map함수를 사용함으로써 소스 코드가 훨씬 간결
                                return (
                                <Classlist
                                    stateRefresh={this.stateRefresh}
                                    key = {c.id} // map을 사용할 시 각각 구분을 할 수 있는 key값을 넣어주어야 함
                                    grade = {c.grade}
                                    name = {c.name}
                                    score = {c.score}
                                />
                                );
                            }) :
                            // progress bar 애니메이션 출력하는 것
                            <TableRow>
                                <TableCell colSpan="6" align="center">
                                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                                </TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(main);