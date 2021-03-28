const Express = require("express");
const uuid = require("uuid");
const PORT = process.env.PORT || 8080;
const _exp = Express();

_exp.listen(PORT, () => {
    console.info(`Server started on PORT:${PORT}`)
})

_exp.get('/uuid',(req, res) =>{
    res.json(uuid.v4()).status(200);
})
