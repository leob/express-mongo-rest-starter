const mongoose = require('mongoose');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true/*,
    match: [/^[a-z,A-Z][a-z,A-Z,0-9,_,-]$/, 'The value of path {PATH} ({VALUE}) is not a valid user name.']*/
  }
}, { timestamps: true });

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * List users in descending order of 'createdAt' timestamp.
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

module.exports = mongoose.model('User', UserSchema);
