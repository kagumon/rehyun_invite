var express = require('express');
var router = express.Router();

const fs = require("fs");
const { type } = require('os');

/* GET home page. */
router.get('/', function(req, res) {
  fs.readFile("like.dat", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      res.render('index', { like: data });
    }
  });
});

router.post('/sin', (req, res) => {
  let today = new Date();   
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds(); 

  var timetext = "[" + year + month + date + hours + minutes + seconds + "]";
  var wtext = timetext + " " + req.body.data1 + " " + req.body.data2 + " " + req.body.data3 + "\n";
  const file = "sin.dat";
  fs.appendFile(file, wtext, (err) => console.log(err));
  res.json({});
});

router.post('/likeplus', (req, res) => {
  fs.readFile("like.dat", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      likecnt = (parseInt(data) + 1).toString();
      fs.writeFile("like.dat", likecnt, (err) => console.log(err));
      res.json({like: likecnt});
    }
  });
});

module.exports = router;
