'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Keyword = mongoose.model('Keyword');

/**
 * Globals
 */
var user, keyword;

/**
 * Unit tests
 */
describe('Keyword Model Unit Tests:', function() {
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
      keyword = new Keyword({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return keyword.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    Keyword.remove().exec();
    User.remove().exec();

    done();
  });
});
