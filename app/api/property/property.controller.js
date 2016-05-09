'use strict';

var Property = require('./property.model.js');

var perPage = 20;

/**
 * Get public property list
 */
exports.getAll = function(req, res) {
    var query = req.query.query ? JSON.parse(req.query.query) : {},
        page = req.query.page || 0,
        pageSize = req.query.pageSize || perPage;
    Property.find(query)
        .limit(parseInt(pageSize))
        .skip(parseInt(pageSize * page))
        .sort({
            name: 'asc'
        })
        .exec(function(err, projects) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(projects);
        });
};

exports.createAll = function(req, res) {
    Property.collection.insert(req.body, function(err) {
        if (err) {
            utils.handleError(res, null, err)
        } else {
            res.sendStatus(200);
        }
    });
};

exports.deleteAll = function(req, res) {
    Property.remove({}, function(err) {
        if (err) {
            utils.handleError(res, null, err)
        } else {
            res.sendStatus(200);
        }
    });
};