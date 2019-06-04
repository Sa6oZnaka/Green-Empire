let express = require('express'),
    app = express();

app.get('/',(request,response)=>{
    response.send('Hello Express!');
});

app.listen(3010,()=>console.log('node.js express server started at port 3010'));