'use strict';

const Errors = {
    START_POSITION_ERROR: {
        errorCode: 'START_POSITION_ERROR',
        message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
    },
    END_POSITION_ERROR: {
        errorCode: 'END_POSITION_ERROR',
        message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
    },
    RIDER_NAME_ERROR: {
        errorCode: 'RIDER_NAME_ERROR',
        message: 'Rider name must be a non empty string'
    },
    DRIVER_NAME_ERROR: {
        errorCode: 'DRIVER_NAME_ERROR',
        message: 'Driver name must be a non empty string'
    },
    DRIVER_VEHICLE_ERROR: {
        errorCode: 'DRIVER_VEHICLE_ERROR',
        message: 'Driver vehicle must be a non empty string'
    },
    RIDES_NOT_FOUND_ERROR: {
        errorCode: 'RIDES_NOT_FOUND_ERROR',
        message: 'Could not find any rides'
    },
    PAGINATION_VALIDATION_ERROR: {
        errorCode: 'PAGINATION_VALIDATION_ERROR',
        message: 'Invalid query params for pagination'
    },
    SERVER_ERROR: {
        errorCode: 'SERVER_ERROR',
        message: 'Unknown Error'
    },
    VALIDATION_ERROR: {
        errorCode: 'VALIDATION_ERROR'
    }
};

function generateError(error) {
    return {
        error_code: error.errorCode,
        message: error.message
    }
}

module.exports = { Errors, generateError }
