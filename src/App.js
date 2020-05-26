import React, { Component } from 'react';
import Customer from './component/Customer' // Customer.js 파일을 import하여 출력할 수 있도록 구현
import './App.css';

const customer = {
  'name': '이준형',
  'birthday': '940415',
  'gender': '남자',
  'job': '대학생'
}

class App extends Component {
  render() {
    return (
      <Customer // Customer.js 파일 출력
        // 전달받은 props를 통하여 화면에 출력
        name = {customer.name}
        birthday = {customer.birthday}
        gender = {customer.gender}
        job = {customer.job}
      />
    );
  }
}

export default App;