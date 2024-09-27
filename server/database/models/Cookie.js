const mongoose = require('mongoose');

const cookieSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  service: { type: String, required: true },
  cookies: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cookie', cookieSchema);
