/**
 *
 * Select option with a specific value.
 *
 * @param {String} ID ID of a WebElement JSON object to route the command to
 * @param {String} value      value of option element to get selected
 *
 * @uses protocol/elementIdClick, protocol/elementIdElement
 * @type action
 *
 */

var async = require('async'),
    ErrorHandler = require('../utils/ErrorHandler.js');

module.exports = function elementIdSelectByValue (ID, value) {

    /*!
     * make sure that callback contains chainit callback
     */
    var callback = arguments[arguments.length - 1];

    /**
     * convert value into string
     */
    if(typeof value === 'number') {
        value = value.toString();
    }

    /*!
     * parameter check
     */
    if(typeof ID !== 'string' || typeof value !== 'string') {
        return callback(new ErrorHandler.CommandError('number or type of arguments don\'t agree with selectByValue command'));
    }

    var that = this,
        response = {},
        option;

    async.waterfall([
        /**
         * get options element by xpath
         */
        function(cb) {
            /**
             * find option elem using xpath
             */
            return that.elementIdElement(ID, './option[normalize-space(@value) = "' + value.trim() + '"]', cb)
        },
        /**
         * select option
         */
        function(res, cb) {
            response.elementIdElement = res;
            that.elementIdClick(res.value.ELEMENT, cb);
        },
        function(res, cb) {
            response.elementIdClick = res;
            cb();
        }
    ], function(err) {

        callback(err, null, response);

    })

};

