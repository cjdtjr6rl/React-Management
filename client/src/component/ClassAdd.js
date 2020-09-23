// 학과 추가 양식
import React from 'react';
import { post } from 'axios'; // post 방식으로 회원추가 방식을 보낼 수 있도록 axios 사용
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class ClassAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null, // 실제로 byte형태의 데이터
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 보내고자 하는 file의 이름(파일명)
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => { // server로부터 response가 건너왔을 때
                console.log(response.data); // 건너온 data를 console창에 출력
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value; // 변경된 내용
        this.setState(nextState); // 현재 state에 새로운 내용을 갱신
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);  // this의 내용을 image라는 이름으로 append 해주는 것
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = { // 전달하는데 파일이 포함되어 있을 때 해 주어야 하는 것
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config); // 환경설정에 맞게 header를 붙여서 server를 데이터로 보내주는 것
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    // 값이 변경이 되었는지 감지를 하기 위해서 onChange의 handleValueChange를 사용
    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    학과 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>학과 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="학과" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="학부" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="과목이름" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="학점" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(ClassAdd);