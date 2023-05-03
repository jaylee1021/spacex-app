const request = require('supertest');
const { app, PORT, server } = require('../index')
const axios = require('axios');


describe('PORT', function () {
    it('PORT should return a number', function () {
        expect(typeof PORT).toBe('number');
    });
    it('PORT is 8000 on development', function () {
        expect(PORT).toBe(8000);
    });
})

describe('GET /', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /capsules', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/capsules')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /capsules/*', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/capsules/*')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/capsules/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('should respond with true', function () {
        axios.get('http://localhost:8000/capsules/serial/C103')
            .then(function (response) {
                let result = response.data.capsule.serial
                expect(Boolean(result)).toBe(true)
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
    it('should respond with \'Capsule not found. Please try again\'', function () {
        axios.get('http://localhost:8000/capsules/serial/C1032')
            .then(function (response) {
                expect(response.data.message).toBe('Capsule not found. Please try again.')
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })

});

describe('GET /company', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/company')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/company')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /cores', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/cores')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/cores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /cores/*', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/cores/*')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/cores/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('should respond with true', function () {
        axios.get('http://localhost:8000/cores/status/active')
            .then(function (response) {
                let result = response.data.cores[0].status
                expect(Boolean(result)).toBe(true)
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
    it('should respond with \'Core not found. Please try again\'', function () {
        axios.get('http://localhost:8000/cores/status/activ')
            .then(function (response) {
                expect(response.data.message).toBe('Core not found. Please try again.')
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
});

describe('GET /crew', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/crew')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/crew')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /dragons', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/dragons')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/dragons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /dragons/*', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/dragons/*')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/dragons/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('should respond with true', function () {
        axios.get('http://localhost:8000/dragons/type/capsule')
            .then(function (response) {
                let result = response.data.dragons[0].type
                expect(Boolean(result)).toBe(true)
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
    it('should respond with \'Dragon not found. Please try again\'', function () {
        axios.get('http://localhost:8000/dragons/type/cap')
            .then(function (response) {
                expect(response.data.message).toBe('Dragon not found. Please try again.')
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
});

describe('GET /landpads', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/landpads')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/landpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /landpads/*', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/landpads/*')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/landpads/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('should respond with true', function () {
        axios.get('http://localhost:8000/landpads/region/California')
            .then(function (response) {
                let result = response.data.landpads[0].region
                expect(Boolean(result)).toBe(true)
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
    it('should respond with \'Landpad not found. Please try again\'', function () {
        axios.get('http://localhost:8000/landpads/region/cali')
            .then(function (response) {
                expect(response.data.message).toBe('Landpad not found. Please try again.')
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
});

describe('GET /launches', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/launches')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /launches/*', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/launches/*')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/launches/*')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('should respond with true', function () {
        axios.get('http://localhost:8000/launches/success/false')
            .then(function (response) {
                let result = response.data.launches[0].success
                expect(result).toBe(false)
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
    it('should respond with \'Launch not found. Please try again\'', function () {
        axios.get('http://localhost:8000/launches/region/cali')
            .then(function (response) {
                expect(response.data.message).toBe('Launch not found. Please try again.')
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
});

describe('GET /launchpads', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/launchpads')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/launchpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /launchpads/*', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/launchpads')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/launchpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
    it('should respond with true', function () {
        axios.get('http://localhost:8000/launchpads/status/retired')
            .then(function (response) {
                let result = response.data.launchpads[0].status
                expect(Boolean(result)).toBe(true)
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
    it('should respond with \'Launchpad not found. Please try again\'', function () {
        axios.get('http://localhost:8000/launchpads/region/cali')
            .then(function (response) {
                expect(response.data.message).toBe('Launchpad not found. Please try again.')
            })
            .catch(function (error) {
                console.log('error', error);
            })
    })
});



describe('GET /payloads', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/payloads')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/payloads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /roadster', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/roadster')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/roadster')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /rockets', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/rockets')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/rockets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /ships', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/ships')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/ships')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /starlink', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/starlink')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/starlink')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

describe('GET /history', function () {
    it('respond with 200', function (done) {
        request(app)
            .get('/history')
            .expect(200, done);
    })
    it('should respond with json', function () {
        request(app)
            .get('/history')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
    })
});

afterAll((done) => {
    server.close();
    done();
})