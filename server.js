const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// database에서 가져온 정보를 넘겨주도록 함
app.get('/api/customers', (req, res) => { // restApi
    // client가 요청을 하게 되면 아래와 같은 파일을 json 형식으로 불러오게 되서 client에게 보여줌
    connection.query(
      "SELECT * FROM CUSTOMER",
      (err, rows, fields) => {
        res.send(rows); // 사용자들에게 rows의 내용을 보여주는 것
      }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));