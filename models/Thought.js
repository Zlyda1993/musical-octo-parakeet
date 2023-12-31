const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  });
  
  thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });
  
  thoughtSchema.set('toJSON', { getters: true });
  
  const Thought = mongoose.model('Thought', thoughtSchema);
  
  module.exports = Thought;