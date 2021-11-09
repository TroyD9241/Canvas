const express = require('express');
const morgan = require('morgan')

const routes = require('./routes')
const app = express();

app.set('json replacer', (key, value) =>{
    if (typeof value === "undefined") {
        return null
    }
    return value
})

app.use(morgan('combined'))
app.use(express.json())
app.use(routes) //localhost 3000



app.listen(4000, () => {
    console.log('listening on port 4000')
})
