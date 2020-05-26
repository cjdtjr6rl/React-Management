import React, { Component } from 'react';
import Customer from './component/Customer' // Customer.js 파일을 import하여 출력할 수 있도록 구현
import './App.css';

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/any',
    'name': '이준형',
    'birthday': '940415',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/65/any',
    'name': '용범중',
    'birthday': '961234',
    'gender': '남자',
    'job': '프로그래머'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/66/any',
    'name': '심지희',
    'birthday': '950508',
    'gender': '여자',
    'job': '직장인'
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => { // map함수를 사용함으로써 소스 코드가 훨씬 간결
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
          })
        }
      </div>
    );
  }
}

export default App;