'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Keywords = mongoose.model('Keywords');

/**
 * Globals
 */
var user, keywords;

/**
 * Unit tests
 */
describe('Keywords Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() { 
      keywords = new Keywords({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return keywords.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Keywords.remove().exec();
    User.remove().exec();

    done();
  });
});
