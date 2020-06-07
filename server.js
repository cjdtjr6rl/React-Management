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

const multer = require('multer');
const upload = multer({dest: './upload'});

// database에서 가져온 정보를 넘겨주도록 함
app.get('/api/customers', (req, res) => { // restApi
    // client가 요청을 하게 되면 아래와 같은 파일을 json 형식으로 불러오게 되서 client에게 보여줌
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows); // 사용자들에게 rows의 내용을 보여주는 것
      }
    );
});

app.use('/image', express.static('./upload')); // image라는 폴더에 접근을 할건데 실제 나의 폴더의 upload의 폴더와 이름이 같음

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
      (err, rows, fields) => {
        res.send(rows);
      }
    )
});

app.listen(port, () => console.log(`Listening on port ${port}`));