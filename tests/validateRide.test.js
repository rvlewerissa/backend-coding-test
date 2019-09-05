'use strict';

const assert = require('chai').assert;

const validateRide = require('../helpers/validateRide');

describe('Validate Ride', () => {
    it('start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', () => {
        const actual = validateRide({
            startLatitude: 100.175110,
            startLongitude: 106.865036,
            endLatitude: -6.597147,
            endLongitude: 106.806038,
            riderName: 'Irvin',
            driverName: 'John',
            driverVehicle: 'Car'
        })
        assert.include(actual, {
            isValid: false
        });
    });

    it('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively', () => {
        const actual = validateRide({
            startLatitude: 10,
            startLongitude: 106.865036,
            endLatitude: 100,
            endLongitude: 106.806038,
            riderName: 'Irvin',
            driverName: 'John',
            driverVehicle: 'Car'
        })
        assert.include(actual, {
            isValid: false
        });
    })

    it('Rider name must be a non empty string', () => {
        const actual = validateRide({
            startLatitude: 10,
            startLongitude: 106.865036,
            endLatitude: 10,
            endLongitude: 106.806038,
            riderName: '',
            driverName: 'John',
            driverVehicle: 'Car'
        })
        assert.include(actual, {
            isValid: false
        });
    });

    it('Driver name must be a non empty string', () => {
        const actual = validateRide({
            startLatitude: 10,
            startLongitude: 106.865036,
            endLatitude: 10,
            endLongitude: 106.806038,
            riderName: 'Irvin',
            driverName: '',
            driverVehicle: 'Car'
        })
        assert.include(actual, {
            isValid: false
        });
    })

    it('Driver name must be a non empty string', () => {
        const actual = validateRide({
            startLatitude: 10,
            startLongitude: 106.865036,
            endLatitude: 10,
            endLongitude: 106.806038,
            riderName: 'Irvin',
            driverName: 'John',
            driverVehicle: ''
        })
        assert.include(actual, {
            isValid: false
        });
    })
})
