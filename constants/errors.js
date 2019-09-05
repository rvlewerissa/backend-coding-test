'use strict';

const Errors = {
    START_POSITION_ERROR: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    END_POSITION_ERROR: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    RIDER_NAME_ERROR: 'Rider name must be a non empty string',
    DRIVER_NAME_ERROR: 'Driver name must be a non empty string',
    DRIVER_VEHICLE_ERROR: 'Driver vehicle must be a non empty string',
    RIDES_NOT_FOUND_ERROR: 'Could not find any rides',
    PAGINATION_VALIDATION_ERROR: 'Invalid query params for pagination',
    SERVER_ERROR: 'Unknown Error'
};

function generateError(errorMessage) {
    return {
        message: errorMessage
    }
}

module.exports = { Errors, generateError }
