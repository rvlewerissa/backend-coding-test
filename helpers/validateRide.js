'use strict'

const { Errors } = require('../constants/errors');

module.exports = ({ startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle }) => {
    const validation = {
        isValid: true,
        errorMessage: ''
    }
    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
        validation.isValid = false;
        validation.errorMessage = Errors.START_POSITION_ERROR;
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        validation.isValid = false;
        validation.errorMessage = Errors.END_POSITION_ERROR;
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
        validation.isValid = false;
        validation.errorMessage = Errors.RIDER_NAME_ERROR;
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
        validation.isValid = false;
        validation.errorMessage = Errors.DRIVER_NAME_ERROR;
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        validation.isValid = false;
        validation.errorMessage = Errors.DRIVER_VEHICLE_ERROR;
    }

    return validation;
}
