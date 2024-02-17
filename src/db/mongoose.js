const mongoose = require('mongoose');

const startserver=(app,port,uri)=>{
    try {
        mongoose.connect(uri);
        console.log('connection established');
        app.listen(port,()=>{
            console.log('listening on port '+port);
        });
    } catch (er) {
        console.log(er);
    }
}

module.exports=startserver;