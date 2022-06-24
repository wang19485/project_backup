const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/contact",function(req, res){
  res.send("Contact me");
});

app.get("/about",function(req, res){
  res.send("About me");
});

app.get("/test",function(req, res){
  res.send("this is a test");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
