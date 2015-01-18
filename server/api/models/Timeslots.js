/**
* Timeslots.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    date : { type: 'date' },

    start : { type: 'date' },

    end : { type: 'date' },

    tags : { type: 'array' },

    description : { type: 'string' },

    comment : { type: 'string' }
  }
};

