const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/company')
    .then(function (response) {
      // handle success
      // console.log(response.data);
      // to find company -> console.log(response.data.name)
      console.log('data for /company: ', response.data);
      res.render('index', { company: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/index', function (req, res) {

  return res.sendFile(__dirname + '/views/index.html');

});

app.get('/about', function (req, res) {

  res.sendFile(__dirname + '/views/about.html');

});

app.get('/blog-directory', function (req, res) {

  res.sendFile(__dirname + '/views/blog-directory.html');

});


app.get('/capsules', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/capsules/')
    .then(function (response) {
      console.log('data for /capsules: ', response.data);
      res.render('capsules', { capsules: response.data })
    })


    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/capsules/*', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/capsules/')
    .then(function (response) {
      const capsuleArray = [];
      for (let i = 0; i < response.data.length; i++) {
        let capsule = response.data[i];
        let userRequst = req.params['0'].split('/'); // ['reuse_count', '0'] parsing -> getting it into the format that will serve us..
        if (userRequst[0] === 'serial') {
          if (capsule.serial === userRequst[1].toUpperCase()) {
            return res.json({ capsule });
          }
        } else if (userRequst[0] === 'id') {
          if (capsule.id === userRequst[1]) {
            return res.json({ capsule });
          }
        } else if (userRequst[0] === 'reuse_count') {
          let countValue = parseInt(userRequst[1]);
          if (capsule.reuse_count === countValue) {
            capsuleArray.push(capsule);
          }
        } else if (userRequst[0] === 'water_landings') {
          let countValue = parseInt(userRequst[1]);
          if (capsule.water_landings === countValue) {
            capsuleArray.push(capsule);
          }
        } else if (userRequst[0] === 'land_landings') {
          let countValue = parseInt(userRequst[1]);
          if (capsule.land_landings === countValue) {
            capsuleArray.push(capsule);
          }
        } else if (userRequst[0] === 'last_update') {
          if (capsule.last_update === userRequst[1]) {
            capsuleArray.push(capsule);
          }
        } else if (userRequst[0] === 'status') {
          if (capsule.status === userRequst[1]) {
            capsuleArray.push(capsule);
          }
        } else if (userRequst[0] === 'type') {
          if (capsule.type === userRequst[1]) {
            capsuleArray.push(capsule);
          }
        } else {
          return res.json({ message: 'Capsule not found. Please try again.' });
        }
      }
      if (capsuleArray.length < 1) {
        return res.json({ message: 'Capsule not found. Please try again.' });
      } else {
        return res.json({ capsules: capsuleArray });
      }
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/cores', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/cores/')
    .then(function (response) {
      console.log('data for /cores: ', response.data);
      res.render('cores', { cores: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/cores/*', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/cores/')
    .then(function (response) {
      const coreArray = [];
      for (let i = 0; i < response.data.length; i++) {
        let core = response.data[i];
        let userRequst = req.params['0'].split('/'); // ['reuse_count', '0'] parsing -> getting it into the format that will serve us..
        switch (userRequst[0]) {
          case 'block':
            if (userRequst[1].length > 1) {
              if (String(core.block) === userRequst[1]) {
                coreArray.push({ core });
              }
            } else if (userRequst[1].length === 1) {
              if (core.block === parseInt(userRequst[1])) {
                coreArray.push({ core });
              }
            }
            break
          case 'serial':
            if (core.serial === userRequst[1].toUpperCase()) {
              return res.json({ core });
            }
            break
          case 'reuse_count':
            if (core.reuse_count === parseInt(userRequst[1])) {
              coreArray.push({ core });
            }
            break
          case 'rtls_attempts':
            if (core.rtls_attempts === parseInt(userRequst[1])) {
              coreArray.push({ core });
            }
            break
          case 'rtls_landings':
            if (core.rtls_landings === parseInt(userRequst[1])) {
              coreArray.push({ core });
            }
            break
          case 'asds_attempts':
            if (core.asds_attempts === parseInt(userRequst[1])) {
              coreArray.push({ core });
            }
            break
          case 'asds_landings':
            if (core.asds_landings === parseInt(userRequst[1])) {
              coreArray.push({ core });
            }
            break
          case 'status':
            if (core.status === userRequst[1]) {
              coreArray.push(core);
            }
            break
          case 'id':
            if (core.id === userRequst[1]) {
              coreArray.push(core);
            }
            break
          default:
            return res.json({ message: 'Core not found. Please try again.' });
        }
      }
      if (coreArray.length < 1) {
        return res.json({ message: 'Core not found. Please try again.' });
      } else {
        return res.json({ cores: coreArray });
      }

    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/crew', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/crew/')
    .then(function (response) {
      console.log('data for /crew: ', response.data);
      res.render('crew', { crew: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/crew/agency/:agency', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/crew/')
    .then(function (response) {
      let agency = response.data;
      let result = [];
      const crewAgency = req.params.agency;
      agency.forEach((element) => {
        if (element.agency === crewAgency) {
          result.push({ crew: element });
        }
      });
      res.json(result);
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/dragons', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/dragons/')
    .then(function (response) {
      console.log('data for /dragons: ', response.data);
      res.render('dragons', { dragons: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/dragons/*', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/dragons/')
    .then(function (response) {
      const dragonArray = [];
      for (let i = 0; i < response.data.length; i++) {
        let dragon = response.data[i];
        let userRequst = req.params['0'].split('/'); // ['reuse_count', '0'] parsing -> getting it into the format that will serve us..
        switch (userRequst[0]) {
          case 'name':
            let dragonCapitalize = userRequst[1].charAt(0).toUpperCase() + userRequst[1].slice(1);
            if (dragon.name === dragonCapitalize) {
              return res.json(dragon);
            }
            break
          case 'type':
            if (dragon.type === userRequst[1]) {
              dragonArray.push(dragon);
            }
            break
          case 'active':
            if (String(dragon.active) === userRequst[1]) {
              dragonArray.push(dragon);
            }
            break
          case 'crew_capacity':
            if (dragon.crew_capacity === parseInt(userRequst[1])) {
              dragonArray.push(dragon);
            }
            break
          case 'sidewall_angle_deg':
            if (dragon.sidewall_angle_deg === parseInt(userRequst[1])) {
              dragonArray.push(dragon);
            }
            break
          case 'orbit_duration_yr':
            if (dragon.orbit_duration_yr === parseInt(userRequst[1])) {
              dragonArray.push(dragon);
            }
            break
          case 'dry_mass_kg':
            if (dragon.dry_mass_kg === parseInt(userRequst[1])) {
              dragonArray.push(dragon);
            }
            break
          case 'dry_mass_lb':
            if (dragon.dry_mass_lb === parseInt(userRequst[1])) {
              dragonArray.push(dragon);
            }
            break
          default:
            return res.json({ message: 'Dragon not found. Please try again.' });
        }
      }
      if (dragonArray.length < 1) {
        return res.json({ message: 'Dragon not found. Please try again.' });
      } else {
        return res.json({ dragons: dragonArray });
      }

    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/landpads', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/landpads/')
    .then(function (response) {
      console.log('data for /landpads: ', response.data);
      res.render('landpads', { landpads: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/landpads/*', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/landpads/')
    .then(function (response) {
      const landpadArray = [];
      for (let i = 0; i < response.data.length; i++) {
        let landpad = response.data[i];
        let userRequst = req.params['0'].split('/'); // ['reuse_count', '0'] parsing -> getting it into the format that will serve us..
        switch (userRequst[0]) {
          case 'name':
            if (landpad.name === userRequst[1].toUpperCase()) {
              return res.json(landpad);
            }
            break
          case 'status':
            if (landpad.status === userRequst[1]) {
              landpadArray.push(landpad);
            }
            break
          case 'region':
            let regionCapitalize = userRequst[1].charAt(0).toUpperCase() + userRequst[1].slice(1);
            if (landpad.region === regionCapitalize) {
              landpadArray.push(landpad);
            }
            break
          case 'landing_attempts':
            if (landpad.landing_attempts === parseInt(userRequst[1])) {
              landpadArray.push(landpad);
            }
            break
          case 'landing_successes':
            if (landpad.landing_successes === parseInt(userRequst[1])) {
              landpadArray.push(landpad);
            }
            break
          case 'type':
            if (landpad.type === userRequst[1].toUpperCase()) {
              landpadArray.push(landpad);
            }
            // else {
            //   return res.json({ dragons: landpadArray });
            // }
            break
          case 'locality':
            const localitySplit = userRequst[1].split(' ');
            const array = [];
            for (let i = 0; i < localitySplit.length; i++) {
              let localCap = localitySplit[i].charAt(0).toUpperCase() + localitySplit[i].slice(1);
              array.push(localCap);
            }
            let joinArray = array.join(' ');
            if (landpad.locality === joinArray) {
              landpadArray.push(landpad);
            }
            break
          default:
            return res.json({ message: 'Landpad not found. Please try again.' });
        }
      }
      if (landpadArray.length < 1) {
        return res.json({ message: 'Landpad not found. Please try again.' });
      } else {
        return res.json({ landpads: landpadArray });
      }
      // return res.json({ dragons: landpadArray });
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/launches', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/launches/')
    .then(function (response) {
      // handle success
      console.log('data for /launches: ', response.data);
      res.render('launches', { launches: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/launches/*', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/launches/')
    .then(function (response) {
      const launchArray = [];
      for (let i = 0; i < response.data.length; i++) {
        let launch = response.data[i];
        let userRequst = req.params['0'].split('/'); // ['reuse_count', '0'] parsing -> getting it into the format that will serve us..
        switch (userRequst[0]) {
          case 'net':
            if (String(launch.net) === userRequst[1]) {
              launchArray.push(launch);
            }
            break
          case 'success':
            if (String(launch.success) === userRequst[1]) {
              launchArray.push(launch);
            }
            break
          case 'flight_number':
            if (launch.flight_number === parseInt(userRequst[1])) {
              return res.json(launch);
            }
            break
          case 'window':
            if (launch.window === parseInt(userRequst[1])) {
              launchArray.push(launch);
            }
            break
          case 'name':
            if (launch.name === userRequst[1]) {
              return res.json(launch);
            }
            break
          case 'upcoming':
            if (String(launch.upcoming) === userRequst[1]) {
              launchArray.push(launch);
            }
            break
          default:
            return res.json({ message: 'Launch not found. Please try again.' });
        }
      }
      if (launchArray.length < 1) {
        return res.json({ message: 'Launch not found. Please try again.' });
      } else {
        return res.json({ launches: launchArray });
      }
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/launchpads', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/launchpads/')
    .then(function (response) {
      // handle success
      console.log('data for /launchpad: ', response.data);
      res.render('launchpads', { launchpads: response.data });
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/launchpads/*', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/launchpads/')
    .then(function (response) {
      const launchpadArray = [];
      for (let i = 0; i < response.data.length; i++) {
        let launchpad = response.data[i];
        let userRequst = req.params['0'].split('/'); // ['reuse_count', '0'] parsing -> getting it into the format that will serve us..
        switch (userRequst[0]) {
          case 'name':
            if (launchpad.name === userRequst[1]) {
              return res.json({ launchpad });
            }
            break
          case 'status':
            if (launchpad.status === userRequst[1]) {
              launchpadArray.push(launchpad);
            }
            break
          case 'region':
            let regionCapitalize = userRequst[1].charAt(0).toUpperCase() + userRequst[1].slice(1);
            if (launchpad.region === regionCapitalize) {
              launchpadArray.push(launchpad);
            }
            break
          case 'launch_attempts':
            if (launchpad.launch_attempts === parseInt(userRequst[1])) {
              launchpadArray.push(launchpad);
            }
            break
          case 'launch_successes':
            if (launchpad.launch_successes === parseInt(userRequst[1])) {
              launchpadArray.push(launchpad);
            }
            break
          case 'locality':
            const localitySplit = userRequst[1].split(' ');
            const array = [];
            for (let i = 0; i < localitySplit.length; i++) {
              let localCap = localitySplit[i].charAt(0).toUpperCase() + localitySplit[i].slice(1);
              array.push(localCap);
            }
            let joinArray = array.join(' ');
            if (launchpad.locality === joinArray) {
              launchpadArray.push(launchpad);
            }
            break
          default:
            return res.json({ message: 'Launchpad not found. Please try again.' });
        }
      }
      if (launchpadArray.length < 1) {
        return res.json({ message: 'Launchpad not found. Please try again.' });
      } else {
        return res.json({ launchpads: launchpadArray });
      }
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get("/search", (req, res) => {
  axios.get(`https://api.spacexdata.com/v4/${req.query.item}`)
    .then(function (response) {
      let result = [];
      for (let key in req.query) {
        // if (key !== 'item') {
        //   return res.json({ message: `1111'${req.query.item}' not found in database. Please check and try again.` });
        // } else 
        if (key === 'item') {
          continue;
        }
        // else if (!(Object.keys(req.query)[1])) {
        //   result.push(response.data)
        // }
        else {
          response.data.forEach(element => {
            if (element[key] === req.query[key]) {
              result.push(element);
            }
          })
        }
      }
      if (result.length < 1) {
        return res.json({ message: `2222${Object.keys(req.query)[1]} '${Object.values(req.query)[1]}' not found in ${req.query.item}. Please check and try again.` });
      } else {
        return res.json({ result });
      }
    })
    .catch(function (error) {
      return res.json({ message: `3333'${req.query.item}' not found in database. Please check and try again.` });
    })
});

app.get('/payloads', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/payloads/')
    .then(function (response) {
      // handle success
      console.log('data for /payloads: ', response.data);
      res.render('payloads', { payloads: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/payloads/type/:type', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/payloads/')
    .then(function (response) {
      let type = response.data;
      let result = [];
      const payloadType = req.params.type;
      type.forEach((element) => {
        if (element.type === payloadType) {
          result.push({ payload: element });
        }
      });
      res.json(result);
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/roadster', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/roadster/')
    .then(function (response) {
      console.log('data for /roadster: ', response.data);
      res.render('roadster', { roadster: response.data });
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/rockets', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/rockets/')
    .then(function (response) {
      console.log('data for /rockets: ', response.data);
      res.render('rockets', { rockets: response.data });
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/rockets/type/:type', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/rockets/')
    .then(function (response) {
      let type = response.data;
      let result = [];
      const rocketType = req.params.type;
      type.forEach((element) => {
        if (element.type === rocketType) {
          result.push({ rocket: element });
        }
      });
      res.json(result);
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/ships', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/ships/')
    .then(function (response) {
      console.log('data for /ships: ', response.data);
      res.render('ships', { ships: response.data });
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/ships/type/:type', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/ships/')
    .then(function (response) {
      let type = response.data;
      let result = [];
      const shipType = req.params.type;
      type.forEach((element) => {
        if (element.type === shipType) {
          result.push({ ships: element });
        }
      });
      res.json(result);
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/starlink', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/starlink/')
    .then(function (response) {
      console.log('data for /starlink: ', response.data);
      res.render('starlink', { starlink: response.data });
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/starlink/:version', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/starlink/')
    .then(function (response) {
      let version = response.data;
      let result = [];
      const starlinkVersion = req.params.version;
      version.forEach((element) => {
        if (element.version === starlinkVersion) {
          result.push({ Starlink: element });
        }
      });
      res.json(result);
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/history', function (req, res) {
  axios.get('https://api.spacexdata.com/v4/history/')
    .then(function (response) {
      console.log('data for /history: ', response.data);
      res.render('history', { history: response.data });
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again.' });
    });
});

app.get('/:input', function (req, res) {
  // console.log('REQ.PARAMS', req.params)

  res.json({ message: 'There is no data for ' + req.params.input });
})

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, function () {
  console.log(`Server is running on port`, PORT);
});

module.exports = {
  app,
  PORT,
  server
}