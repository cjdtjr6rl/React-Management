const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => { // restApi
    // client가 요청을 하게 되면 아래와 같은 파일을 json 형식으로 불러오게 되서 client에게 보여줌
    res.send([
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
      ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));