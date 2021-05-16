const axios = require("axios")
const express = require("express")
const redis = require("redis");

const app = express();
const redisClient = redis.createClient(6379,process.env.REDIS_HOST || 'localhost')
    
const USER_API = "https://jsonplaceholder.typicode.com/users/";

app.get("/users", (req, res) => {
    const email = req.query.email;
  
    try {
      if(!email){
        axios.get(`${USER_API}`).then(function (response) {
          const users = response.data;
          if(users){
            users.forEach(user => {
              redisClient.setex(user.email,600,JSON.stringify(user));
              console.log("User successfully retrieved from the API");
            });
          }        
          res.status(200).json(users);
        });
      } else{
      axios.get(`${USER_API}?email=${email}`).then(function (response) {
        const users = response.data;
  
        console.log("User successfully retrieved from the API");
  
        res.status(200).json(users);
      });
    }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  app.get("/cached-users", (req, res) => {
    const email = req.query.email;
  
    try {
      redisClient.get(email, (err, data) => {
        if (err) {
          console.error(err);
          throw err;
        }
  
        if (data) {
          console.log("User successfully retrieved from Redis");
  
          res.status(200).send(JSON.parse(data));
        } else {
          axios.get(`${USER_API}?email=${email}`).then(function (response) {
            const users = response.data;
            redisClient.setex(email, 600, JSON.stringify(users));
  
            console.log("User successfully retrieved from the API");
  
            res.status(200).send(users);
          });
        }
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
  });