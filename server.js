let express = require('express'),
    app = express();

app.use(express.static('public'));

app.listen(3010,()=>console.log('NodeJS express server started at port 3010'));