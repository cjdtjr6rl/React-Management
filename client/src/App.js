import React, { Component } from 'react';
import Customer from './component/Customer'; // Customer.js 파일을 import하여 출력할 수 있도록 구현
import CustomerAdd from './component/CustomerAdd';
import './App.css';
/* material-ui를 이용하여 table 생성 */
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080 // 가로 길이가 1080px보다 작아지면 가로 스크롤바가 생기게 함
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

// 컴포넌트 불러오는 순서(컴포넌트 라이크 사이클 방법)
/*
  
1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*/

// react 내에서 상태 변화를 감지해서 프로젝트를 업데이트 해주기에 상태만 관리를 해주면 됨
/*

props or state => shouldComponentUpdate()

*/

class App extends Component {

  // 데이터가 변경될 수 있으므로
  state = { // state -> 컴포넌트에서 데이터를 변경할 수 있을 때 명시
    customers: "",
    completed: 0
  }

  componentDidMount() { // api에 접근을 해서 데이터를 받아오는 작업을 함
    this.timer = setInterval(this.progress, 20); // 0.02초마다 1번씩 progress함수가 실행되도록 설정
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json(); // 데이터를 json형식으로 가져와 body에 넣어 주겠다는 뜻
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 }); // completed가 1씩 증가를 하도록 progress 함수에 넣어줌
  }

  render() {
    const { classes } = this.props; // props -> 데이터를 변경할 수 없을 때 명시
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.state.customers ? this.state.customers.map(c => { // map함수를 사용함으로써 소스 코드가 훨씬 간결
                  return (
                  <Customer
                    key = {c.id} // map을 사용할 시 각각 구분을 할 수 있는 key값을 넣어주어야 함
                    id = {c.id}
                    image = {c.image}
                    name = {c.name}
                    birthday = {c.birthday}
                    gender = {c.gender}
                    job = {c.job}
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
        <CustomerAdd/>
      </div>
    );
  }
}

export default withStyles(styles)(App);