// 고객 추가 양식
import React from 'react';
import { post } from 'axios'; // post 방식으로 고객추가 방식을 보낼 수 있도록 axios 사용

class CustomerAdd extends React.Component {

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
            fileName: ''
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0], // 파일을 업로드 할 때 하나만 올리기 때문에
            fileName: e.target.value
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

    // 값이 변경이 되었는지 감지를 하기 위해서 onChange의 handleValueChange를 사용
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;