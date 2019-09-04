// GET ALL RIDES

/**
 * @api {get} /rides Get All Rides
 * @apiName GetRides
 * @apiGroup Rides
 *
 * @apiSuccess {Object[]} rides List of rides
 * @apiSuccess {Number} rides.rideID Ride ID of the ride
 * @apiSuccess {Number} rides.startLat Starting latitude of the ride
 * @apiSuccess {Number} rides.startLong Starting longitude of the ride
 * @apiSuccess {Number} rides.endLat Ending latitude of the ride
 * @apiSuccess {Number} rides.endLong Ending longitude of the ride
 * @apiSuccess {String} rides.riderName Name of the rider
 * @apiSuccess {String} rides.driverName Name of the driver
 * @apiSuccess {String} rides.driverVehicle Driver vehicle description
 * @apiSuccess {String} rides.created Timestamp of when the order is placed
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *      "rideID": 1,
 *      "startLat": -6.17511,
 *      "startLong": 106.865036,
 *      "endLat": -6.597147,
 *      "endLong": 106.806038,
 *      "riderName": "Irvin",
 *      "driverName": "John",
 *      "driverVehicle": "Car",
 *      "created": "2019-09-04 16:59:42"
 *     }]
 *
 * @apiError RIDES_NOT_FOUND_ERROR No rides record found.
 * @apiError SERVER_ERROR Unknown error from server
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Ok
 *     {
 *       "error_code": "RIDES_NOT_FOUND_ERROR",
 *       "message": "Could not find any rides"
 *     }
 */

// CREATE RIDE

 /**
 * @api {post} /rides Create Ride
 * @apiName CreateRide
 * @apiGroup Rides
 * 
 * @apiParam {String} start_lat Starting latitude of the ride
 * @apiParam {String} start_long Starting longitude of the ride
 * @apiParam {String} end_lat Ending latitude of the ride
 * @apiParam {String} end_long Ending longitude of the ride
 * @apiParam {String} rider_name Starting latitude of the ride
 * @apiParam {String} driver_name Name of the driver
 * @apiParam {String} driver_vehicle Driver vehicle description
 *
 * @apiSuccess {Number} rideID Ride ID of the ride
 * @apiSuccess {Number} startLat Starting latitude of the ride
 * @apiSuccess {Number} startLong Starting longitude of the ride
 * @apiSuccess {Number} endLat Ending latitude of the ride
 * @apiSuccess {Number} endLong Ending longitude of the ride
 * @apiSuccess {String} riderName Name of the rider
 * @apiSuccess {String} driverName Name of the driver
 * @apiSuccess {String} driverVehicle Driver vehicle description
 * @apiSuccess {String} created Timestamp of when the order is placed
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "rideID": 1,
 *      "startLat": -6.17511,
 *      "startLong": 106.865036,
 *      "endLat": -6.597147,
 *      "endLong": 106.806038,
 *      "riderName": "Irvin",
 *      "driverName": "John",
 *      "driverVehicle": "Car",
 *      "created": "2019-09-04 16:59:42"
 *     }
 *
 * @apiError VALIDATION_ERROR Param does not pass validation
 * @apiError SERVER_ERROR Unknown error from server
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error_code": "VALIDATION_ERROR",
 *       "message": "Rider name must be a non empty string"
 *     }
 */

// GET RIDE

/**
 * @api {get} /rides/:id Get Ride
 * @apiName GetRide
 * @apiGroup Rides
 *
 * @apiParam {Number} id Ride unique ID.
 *
 * @apiSuccess {Number} rideID Ride ID of the ride
 * @apiSuccess {Number} startLat Starting latitude of the ride
 * @apiSuccess {Number} startLong Starting longitude of the ride
 * @apiSuccess {Number} endLat Ending latitude of the ride
 * @apiSuccess {Number} endLong Ending longitude of the ride
 * @apiSuccess {String} riderName Name of the rider
 * @apiSuccess {String} driverName Name of the driver
 * @apiSuccess {String} driverVehicle Driver vehicle description
 * @apiSuccess {String} created Timestamp of when the order is placed
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "rideID": 1,
 *      "startLat": -6.17511,
 *      "startLong": 106.865036,
 *      "endLat": -6.597147,
 *      "endLong": 106.806038,
 *      "riderName": "Irvin",
 *      "driverName": "John",
 *      "driverVehicle": "Car",
 *      "created": "2019-09-04 16:59:42"
 *     }
 *
 * @apiError RIDES_NOT_FOUND_ERROR No rides found with the specified ID.
 * @apiError SERVER_ERROR Unknown error from server
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Ok
 *     {
 *       "error_code": "RIDES_NOT_FOUND_ERROR",
 *       "message": "Could not find any rides"
 *     }
 */
