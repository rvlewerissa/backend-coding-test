'use strict';

const request = require('supertest');
const sqlite = require('sqlite');
const assert = require('chai').assert;

let app;

describe('API tests', () => {
    before(async () => {
        const db = await sqlite.open(':memory:');
        app = require('../src/app')(db);
        const buildSchemas = require('../src/schemas');
        buildSchemas(db);
    })

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should create ride', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '-6.597147',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 'John',
                    driver_vehicle: 'Car'
                })
                .set('Accept', 'application/json')
                .expect((res) => {
                    assert.include(res.body, {
                        startLat: -6.17511,
                        startLong: 106.865036,
                        endLat: -6.597147,
                        endLong: 106.806038,
                        riderName: 'Irvin',
                        driverName: 'John',
                        driverVehicle: 'Car'
                    });
                }).end(done)
        });

        it('should validate start latitude and longitude', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: '-100',
                    start_long: '106.865036',
                    end_lat: '-6.597147',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 'John',
                    driver_vehicle: 'Car'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                }, done);
        });

        it('should validate end latitude and longitude', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '100',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 'John',
                    driver_vehicle: 'Car'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, {
                    error_code: 'VALIDATION_ERROR',
                    message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
                }, done);
        });

        it('should validate rider name', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '6.597147',
                    end_long: '106.806038',
                    rider_name: 10,
                    driver_name: 'John',
                    driver_vehicle: 'Car'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Rider name must be a non empty string'
                }, done);
        });

        it('should validate driver name', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '6.597147',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 10,
                    driver_vehicle: 'Car'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Driver name must be a non empty string'
                }, done);
        });

        it('should validate driver name', (done) => {
            request(app)
                .post('/rides')
                .send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '6.597147',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 'John',
                    driver_vehicle: 1
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200, {
                    error_code: 'VALIDATION_ERROR',
                    message: 'Driver vehicle must be a non empty string'
                }, done);
        });
    });

    describe('GET /rides', () => {
        it('should get all rides', (done) => {
            request(app)
                .get('/rides')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((res) => {
                    assert.isArray(res.body);
                    assert.lengthOf(res.body, 1);
                    assert.include(res.body[0], {
                        startLat: -6.17511,
                        startLong: 106.865036,
                        endLat: -6.597147,
                        endLong: 106.806038,
                        riderName: 'Irvin',
                        driverName: 'John',
                        driverVehicle: 'Car'
                    })
                }).end(done)
        });

        it('should test /rides pagination', (done) => {
            request(app)
                .post('/rides').send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '-6.597147',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 'John',
                    driver_vehicle: 'Car'
                })
                .then(() => {
                    request(app).get('/rides?page=1&page_len=2')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200)
                        .expect((res) => {
                            assert.lengthOf(res.body, 2);
                            assert.include(res.body[0], { rideID: 1 });
                            assert.include(res.body[1], { rideID: 2 });
                        }).end(done)
                });
        });

        it('should test validate /rides pagination query params', (done) => {
            request(app)
                .post('/rides').send({
                    start_lat: '-6.175110',
                    start_long: '106.865036',
                    end_lat: '-6.597147',
                    end_long: '106.806038',
                    rider_name: 'Irvin',
                    driver_name: 'John',
                    driver_vehicle: 'Car'
                })
                .then(() => {
                    request(app).get('/rides?page=0&page_len=0')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', 'application/json; charset=utf-8')
                        .expect(200, {
                            message: 'Invalid query params for pagination'
                        }).end(done);
                });
        });
    });

    describe('GET /rides/:id', () => {
        it('should get ride by ID', (done) => {
            request(app)
                .get('/rides/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .expect((res) => {
                    assert.include(res.body, {
                        startLat: -6.17511,
                        startLong: 106.865036,
                        endLat: -6.597147,
                        endLong: 106.806038,
                        riderName: 'Irvin',
                        driverName: 'John',
                        driverVehicle: 'Car'
                    })
                }).end(done)
        });
    });
});
