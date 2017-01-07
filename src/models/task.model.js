const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * Task schema
 */
const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: [5, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH})']
  },
  assignee : {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  dueDate : {
    type: Date
  }
}, { timestamps: true });

/**
 * Statics
 */
TaskSchema.statics = {
  /**
   * List tasks in ascending order of 'dueDate' timestamp (oldest ones first)
   */
  list({ skip = "0", limit = "0" } = {}) {
    return this.find()
      .sort({ username: 1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .exec();
  },
  findAndPopulate(id) {
    return this.findById(id)
      .populate('assignee', 'username')
      .exec();
  },
  findByUserId(userId) {
    return this.find({assignee: userId})
      .exec();
  }
};

module.exports = mongoose.model('Task', TaskSchema);
