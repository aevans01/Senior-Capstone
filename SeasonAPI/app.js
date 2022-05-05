const express = require('express');
const cors = require('cors');
var flash = require('connect-flash');
const app = express();
const port = 3001;
const mysql = require('mysql');
const { getNodeText } = require('@testing-library/react');
var seasonID = 0;
app.use(cors());
app.use(express.json());
app.use(flash());
const logEvents = require("./logEvents");
const EventEmitter = require("events");
const { isBuffer } = require('util');
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smtb',
    multipleStatements: true
});

app.listen(port, () =>
    console.log(`listening on port: ${port}`),
);



app.get('/seasons', (req, res) => {
    pool.query('SELECT * FROM SEASON', (err, rows) => {
        if (err) {
            res.send(err.message);
            console.log("error")
        } else {
            res.send(rows);
        }
    })
});
app.get('/seasons/:id', (req, res) => {
    pool.query('SELECT * FROM SEASON WHERE SEASONID = ?', [req.params.id], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            res.json(rows);
        }
    })
});
app.post('/tournaments/seasons',(req,res)=>{
    pool.query(`SELECT * FROM TOURNEY WHERE SEASONID = ? AND USERID = ?`,[req.body.seasonId, req.body.userId],(err,rows) =>{
        if (err) {
            res.send(err.message);
        } else {
            console.log(rows.length)
            if(rows.length > 0){
                res.send(rows);    
            }
            console.log("rows ==> " + rows);
        }
    })
})
app.post('/tournaments/season',(req,res)=>{
    console.log("seasonID ==> " + req.body.seasonId);
    pool.query(`SELECT * FROM TOURNEY WHERE SEASONID = ?`,[req.body.seasonId],(err,rows) =>{
        if (err) {
            res.send(err.message);
        } else {
            console.log(rows.length)
            if(rows.length > 0){
                res.send(rows);    
            }
            console.log("rows ==> " + rows);
        }
    })
})
app.put('/seasons/:id', (req, res) => {
    pool.query('SELECT * FROM SEASON WHERE SEASONID = ?', [req.params.id], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            
        }
    })
});
app.get('/season/user/:id', (req, res) => {
    console.log(req.params.id);
    pool.query('SELECT SEASON.SEASONID, SEASON.STARTDATE, SEASON.ENDDATE, TOURNEY.USERID FROM SEASON , TOURNEY WHERE SEASON.SEASONID = TOURNEY.SEASONID AND TOURNEY.USERID = ?', [req.params.id], (err, rows) => {
        if (err) {
            res.send(err.message);
        } else {
            if (rows.length > 0) {
                res.json(rows);
            }
        }
    })
});
app.post('/createSeason', (req, res) => {
    pool.query(`INSERT INTO SEASON (SEASONNAME, STARTDATE, ENDDATE, COMMUNITYID) VALUES (?,?,?,?)`, [req.body.name, req.body.start, req.body.end, req.body.community], (err, rows) => {
        if (err) {
            console.log(err.message);
        } else {
               console.log("POST COMPLETE")
            }
    })
});

app.post('/deleteSeason',(req,res) =>{
  console.log(req.body);
  pool.query(`DELETE FROM SEASON WHERE SEASONID = ?`,[req.body.id],(err) =>{
      if(err){
          console.log(err.message);
      }else{
          console.log("delete complete")
      }
  })
})
app.post('/updateSeason',(req,res) =>{
  console.log(req.body);
  pool.query("UPDATE SEASON SET SEASONNAME = ?, STARTDATE = ?, ENDDATE = ?, COMMUNITYID = ? WHERE SEASONID = ?",[req.body.name,req.body.start,req.body.end,req.body.community, req.body.id],(err) =>{
      if(err){
          console.log(err.message)
      }else{
          console.log("update complete")
      }
  })
})
app.post('/getIdForEditSeason',(req,res) =>{
  console.log("getting id => " + req.body.id);
  seasonID = req.body.id;
  res.send("success");
})

app.get('/sendIdForEditSeason',(req,res) =>{
  console.log("seasonID = " + seasonID)
  res.send({seasonID: seasonID});
})

app.post('/editSeason/:id', (req,res) => {
  console.log("id inside seasons " + req.body.id);
  pool.query('SELECT * FROM SEASON WHERE SEASONID = ?', [req.params.id], (err, rows) => {
      if (err) {
          res.send(err.message);
      } else {
          res.send(rows);
      }
})
});

app.get('/leaderboardUsers',(req,res) => {
pool.query('SELECT * FROM USER ORDER BY ELO DESC LIMIT 3,7', (err,rows) => {
  if(err){
    res.send(err.message);
  }else{
    if(rows.length > 0){
    res.send(rows);
    }else{
      res.send("No data returned");
      console.log("No data returned");
    }
  }
}) 
});

app.get('/leaderboardUsersTop3',(req,res) => {
pool.query('SELECT * FROM USER ORDER BY ELO DESC LIMIT 3', (err,rows) => {
  if(err){
    res.send(err.message);
  }else{
      console.log(rows);
    res.send(rows);
  }
}) 
});

let temp = "";

app.post("/createTourney", (req, res) => {
  const NAME = req.body.NAME;
  const FORMAT = req.body.FORMAT;
  const DESCRIPTION = req.body.DESCRIPTION;
  const STARTDATE = req.body.STARTDATE;
  const MAXPLAYER = req.body.MAXPLAYER;
  const IMAGE = req.body.IMAGE;
    console.log("Name: ", NAME);
    console.log("Description: ", DESCRIPTION);
    console.log("Start Date: ", STARTDATE);
    console.log("Image: ", IMAGE);
  pool.query(
    `INSERT INTO TOURNEY (NAME,FORMAT,DESCRIPTION,IMAGE,STARTTIME,MAXPLAYER,USERID,SEASONID,COMMUNITYID) VALUES (?,?,?,?,?,?,20000,40000,10000);`,
    [NAME, FORMAT, DESCRIPTION, IMAGE, STARTDATE, MAXPLAYER],
    (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    }
  );
});

//This method is used for sending the TourneyID to be held in this API
app.post("/sendID", (req, res) => {

  temp = req.body.TOURNEYID;
  console.log("TEMP SEND:", temp);
});

// This method is used for pullling data from one entry for editing a tourney
app.get("/getID", (req, res) => {
  console.log("TEMP GET:", temp);
  pool.query(
    `SELECT * FROM TOURNEY WHERE TOURNEYID=?;`,
    [temp],
    (err, result) => {
      res.send(result);
    }
  );
});

app.post("/getTourneyURL", (req, res) => {
    pool.query(
      `SELECT * FROM TOURNEY WHERE NAME = ?`,[req.body.name],
      (err, result) => {
        console.log(err);
        res.send(result);
      }
    );
  });

// This method is used for selecting all tourneys by by date for any that start after the current time
app.get("/getTourneys", (req, res) => {
  pool.query(
    `SELECT * FROM TOURNEY WHERE STARTTIME > CURRENT_DATE() ORDER BY STARTTIME;`,
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

// This method is used for selecting all tourneys by by date for any that start after the current time
app.get("/getHomeTourneys", (req, res) => {
  pool.query(
    `SELECT * FROM TOURNEY WHERE STARTTIME > CURRENT_DATE() ORDER BY STARTTIME Limit 5;`,
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

// This method is used for selecting all tourneys by by date for any that start after the current time
app.get("/getPastTourneys", (req, res) => {
  pool.query(
    `SELECT * FROM TOURNEY WHERE STARTTIME < CURRENT_DATE() ORDER BY STARTTIME;`,
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

app.post("/editTourney", (req, res) => {
  const TOURNEYID = req.body.TOURNEYID;
  const NAME = req.body.NAME;
  const FORMAT = req.body.FORMAT;
  const DESCRIPTION = req.body.DESCRIPTION;
  const STARTDATE = req.body.STARTDATE;
  const MAXPLAYER = req.body.MAXPLAYER;

  pool.query(
    `UPDATE TOURNEY SET NAME=?, FORMAT=?, DESCRIPTION=?, STARTTIME=?, MAXPLAYER=? WHERE TOURNEYID = ?; `,
    [NAME, FORMAT, DESCRIPTION, STARTDATE, MAXPLAYER, TOURNEYID],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/deleteTourney", (req, res) => {
  const TOURNEYID = req.body.TOURNEYID;

  pool.query(
    `DELETE FROM TOURNEY WHERE TOURNEYID =?`,
    [TOURNEYID],
    (err, result) => {
      console.log(err);
    }
  );
});

/***********************************************************************************
 * Community API Here
 * By Jackson
***********************************************************************************/

// This method is used for retrieving all Communities from the database
app.get("/getCommunities", (req, res) => {
  pool.query(
    `SELECT * FROM COMMUNITY;`,
    (err, result) => {
      console.log(err);
      res.send(result);
    }
  );
});

// used to create new tourney on our pool system
app.post("/createCommunity", (req, res) => {
  const NAME = req.body.NAME;
  const DESCRIPTION = req.body.DESCRIPTION;

  pool.query(
    `INSERT INTO COMMUNITY (NAME,DESCRIPTION,USERID) VALUES (?,?,10000);`,
    [NAME, DESCRIPTION],
    (err, result) => {
      console.log(err);

      console.log(result);
    }
  );
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
  
    pool.query(
      "INSERT INTO user (username, password, email, firstName, lastName, phone) VALUES (?,?,?,?,?,?)",
      [username, password, email, firstName, lastName, phone],
      (err, result) => {
        console.log(err);
      }
    );
  });
  
  // This method is used for loggin into the system using a username and password
  app.post("/usernameLogin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    pool.query(
      "SELECT * FROM user WHERE username = ? AND password = ?",
      [username, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Incorrect username or password." });
        }
      }
    );
  });
  
  // This method is for logging in using email and password
  app.post("/emailLogin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
   
    pool.query(
      "SELECT * FROM user WHERE EMAIL = ? AND PASSWORD = ?",
      [email, password],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Incorrect username or password." });
        }
      }
    );
  });
  
  app.post("/getAllUsers", (req, res) => {
  
    pool.query("SELECT * FROM user", (err, result) => {
      if (err) {
        res.send({ err: err });
        myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
      }
      if (result.length > 0) {
        console.log(result);
        res.send(result);
      } else {
        res.send({ message: "There was a problem getting all users." });
      }
    });
  });
  
  app.post("/updateUserData", (req, res) => {
  
    pool.query("SELECT * FROM user", (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "There was a problem getting all users." });
      }
    });
  });

  app.post("/userById",(req,res) =>{
    pool.query("Select * from user where USERID = ?",[req.body.USERID],(err,result) => {
      if(err){
        res.send(err)
      }else{
        res.send(result);
      }
    })
    
  });
  app.post("/viewProfile/:username",(req,res) => {
    console.log("username --> ",req.params.username);
    pool.query("Select * from user where USERNAME = ?",[req.params.username],(err,result) => {
      if(err){
        res.send(err)
      }else{
        res.send(result);
      }
    })
  });

  app.post("/PastTournaments/:username",(req,res) => {
    pool.query("SELECT * FROM TOURNAMENTS WHERE USERNAME = ?"[req.body.USERID],(err,result) =>{
      if(err){
        res.send(err)
      }else{
        res.send(result);
      }
    })
  });

  app.post("/getUserByUsername",(req,res) => {
    console.log("req.body ==> ",req.body);
    pool.query("SELECT * FROM user WHERE USERNAME = ?" [req.body.username],(err,result) => {
      if(err){
        res.send(err)
      }else{
        res.send(result);
      }
    })
  });

app.post('/upload', (req, res) => {
    const profilePic = req.body.PROFILEPIC
    console.log(profilePic);
    pool.query("UPDATE USER SET PROFILEPIC = ? WHERE USERID = ?", [req.body.PROFILEPIC,req.body.userID],(err,result) => {
      if(err){
        res.send(err);
      }else{
        console.log("success!");
        res.status(204).end()
      }
    })
    
});

app.post("/getUsersTournaments",(req,res) => {
  pool.query("select * from tourney where USERID = ?",[req.body.userID],(err,result) => {
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
})


//bridge entity creation for tourney and users.
app.post("/createBridgeTourney", (req, res) => {
  const tourID = req.body.TOURNEYID;
  const groupPlayerID = req.body.groupPlayerID;
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );

  myEmitter.emit(
    "log",
    `inserting in bridge_tourney with tourneyID: ${tourID}, and userID: ${groupPlayerID}`,
    "createBridgeTourney.txt"
  );

  pool.query(
    "INSERT INTO bridge_tourney (TOURNEYID, USERID) VALUES (?,?);",
    [tourID, groupPlayerID],
    (err, result) => {
      if (err !== null) {
        console.log(err);
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      }
      res.send(result);
    }
  );
});

//get a list of tournament players NAMES using tourney ID.  This uses RIGHT JOIN
app.post("/getTourneyPlayers", (req, res) => {
  const tourneyid = req.body.TOURNEYID;
  console.log("tourneyid ==> ",tourneyid)

  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `getting tourney players names in tourney with tourneyid: ${tourneyid}`,
    "getTourneyPlayers.txt"
  );

  pool.query(
    "SELECT u.username FROM bridge_tourney as bt  RIGHT JOIN user as u on bt.USERID = u.userid WHERE (TOURNEYID = ?);",
    [tourneyid],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("result from getTourneyPlayers: ", result);
        res.send(result);
      }
    }
  );
});

//match creation
app.post("/createMatch", (req, res) => {
  const tourneyID = parseInt(req.body.TOURNEYID);
  const time = req.body.time;
  console.log(req.body.TOURNEYID);
  console.log("tourneyID is: ", tourneyID);
  console.log("time is: ", time);

  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `inserting in match with tourneyID: ${tourneyID}, and date: ${time}`,
    "createMatch.txt"
  );
  pool.query(
    "INSERT INTO MATCHES (MATCHTIME, TOURNEYID) VALUES (?, ?);",
    [time, tourneyID],
    (err, result) => {
      if (err) {
        console.log(err);
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      }
      console.log("result from createMatch: ", result);
      res.send(result);
    }
  );
});

//inserting into bridge_match
app.post("/createBridgeMatch", (req, res) => {
  const matchID = req.body.matchID;
  const userID = req.body.userID;
  
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `inserting in bridge match with matchID: ${matchID}, and userID: ${userID}`,
    "createBridgeMatch.txt"
  );
  pool.query(
    "INSERT INTO BRIDGE_MATCH (MATCHID, USERID) VALUES (?, ?);",
    [matchID, userID],
    (err, result) => {
      if (err) {
        console.log(err);
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      }
      console.log(
        "result from createBridgeMatch FOR PLAYER ",
        userID,
        ": ",
        result
      );
      res.send(result);
    }
  );
});

app.post("/getBridgeMatch", (req, res) => {
  const matchID = req.body.matchID;

  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `getting bridge_match by matchID: ${matchID}`,
    "gettingBridgeMatch.txt"
  );

  pool.query(
    "SELECT * FROM BRIDGE_MATCH WHERE (MATCHID = ?);",
    [matchID],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("result from getBridgeMatch: ", result);
        res.send(result);
      }
    }
  );
});

app.post("/getMatch", (req, res) => {
  const tourneyID = req.body.TOURNEYID;

  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `getting match by tourneyID: ${tourneyID}`,
    "gettingMatch.txt"
  );

  pool.query(
    "SELECT * FROM MATCHES  WHERE (TOURNEYID = ?);",
    [tourneyID],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("result from getMatch: ", result);
        res.send(result);
      }
    }
  );
});

app.post("/getMatchByID", (req, res) => {
  const matchID = req.body.matchID;

  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `getting match by matchID: ${matchID}`,
    "gettingMatchByID.txt"
  );

  pool.query(
    "SELECT * FROM MATCHES WHERE (MATCHID = ?);",
    [matchID],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("result from getMatchByID: ", result);
        res.send(result);
      }
    }
  );
});

app.post("/updateMatchByID", (req, res) => {
  const matchID = req.body.MATCHID;
  const winnerID = req.body.winnerID;
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `getting match by matchID: ${matchID} and updating winner with id of ${winnerID}`,
    "updateMatchByIDLog.txt"
  );

  pool.query(
    "UPDATE MATCHES SET WINNERID = ? WHERE MATCHID = ?;",
    [winnerID, matchID],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("result from updating match winner: ", result);
        res.send(result);
      }
    }
  );
});

app.post("/deleteMatches", (req, res) => {
  const ID = req.body.TOURNEYID;
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `deleting matches for tourney,  id: ${ID}`,
    "deletingMatches.txt"
  );
  pool.query(
    "DELETE FROM MATCHES WHERE TOURNEYID = ?;",
    [ID],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("deleting matches sent back: ", result);
        res.send(result);
      }
    }
  );
});

app.post("/deleteBridgeMatches", (req, res) => {
  const ID = req.body.MATCHID;
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit(
    "log",
    `deleting bridge matches for tourney,  id: ${ID}`,
    "deletingbridgeMatches.txt"
  );
  pool.query(
    "DELETE FROM BRIDGE_MATCH WHERE MATCHID = ?;",
    [ID],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("deleting bridge matches sent back this: ", result);
        res.send(result);
      }
    }
  );
});

//get a user by their ID
app.post("/getUserByID", (req, res) => {
  const ID = req.body.ID;
  console.log(" user id to get with: ", ID);
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit("log", `getting user by id: ${ID}`, "selectUserByID.txt");
  pool.query("SELECT * FROM user WHERE userid = ?;", [ID], (err, result) => {
    if (err) {
      myEmitter.emit("log", ` ${err}`, "errLog.txt");
      res.send(err);
    } else {
      console.log("result from getUserByID: ", result);
      res.send(result);
    }
  });
});

app.post("/getUserByName", (req, res) => {
  const name = req.body.username;
  console.log("name ==> ",name);
  myEmitter.emit(
    "log",
    `${req.url}\t${req.headers.origin}\t${req.method}`,
    "reqLog.txt"
  );
  myEmitter.emit("log", `getting user by name: ${name}`, "selectUserByID.txt");
  pool.query(
    "SELECT userid FROM USER WHERE username = ?;",
    [name],
    (err, result) => {
      if (err) {
        myEmitter.emit("log", ` ${err}`, "errLog.txt");
        res.send(err);
      } else {
        console.log("result from getUserByName: ", result);
        res.send(result);
      }
    }
  );
});