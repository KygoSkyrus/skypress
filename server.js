const express = require('express')
const app = express();
const path=require('path')



//app.use(express.static('client/public'));
app.use(express.json());

// app.use(require('./routes/route'));

 

const port = process.env.PORT || 4000;



// app.get('/', (req, res) => { 
//     res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
//   }); 
  


// if(process.env.NODE_ENV ==="production"){
//   app.use(express.static("client/build"));
// }


app.listen(port, () => console.log(`server is running at ${port}`));