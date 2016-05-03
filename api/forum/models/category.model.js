'use strict';

var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: { type: String, lowercase: false, trim: true, required: true },
    uuid: { type: String, lowercase: true, trim: true },
    section: { type: String, lowercase: true, trim: true, required: true },
    description: { type: String, lowercase: false, trim: false },
    order: { type: Number, min: 0, max: 1000 },
    numberOfThreads: Number,
    numberOfAnswers: Number,
    lastThread: {},
    _createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

/**
 * Validations
 */

// Validate empty name category
CategorySchema
    .path('name')
    .validate(function(name) {
        return name.length;
    }, 'Category name cannot be empty');

// Validate empty name section
CategorySchema
    .path('section')
    .validate(function(section) {
        return section.length;
    }, 'Category section cannot be empty');

// Validate unique name
CategorySchema
    .path('name')
    .validate(function(name, respond) {
        return this.constructor.findOneAsync({
            name: name
        }).then(function(category) {
            if (category) {
                return respond(false);
            } else {
                return respond(true);
            }
            return respond(true);
        }).catch(function(err) {
            throw err;
        })

    }, 'Category name already in use');


/**
 * Methods
 */
CategorySchema.methods = {

};

module.exports = mongoose.model('Category', CategorySchema);
