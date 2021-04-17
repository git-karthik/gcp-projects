const xpress = require('express')
const os = require("os");

console.log('Loading the server on k8s clusters')

const app = xpress()
const port = process.env.PORT || 3600

app.get('/', (req, res) => {
  let serverdata = {
    "Hostname": os.hostname(),
    'Remote Address': req.socket.remoteAddress,
    'Remote Port': req.socket.remotePort,
    'Local Address': req.socket.localAddress,
    'Local Port': req.socket.localPort
  }

  return res.json(serverdata).status(200);
})

app.listen(port, ()=>{
    console.log("Server Listening on port", port);
})
