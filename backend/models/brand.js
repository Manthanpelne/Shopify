const mongoose = require('mongoose');

const brandSchema =  mongoose.Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

const virtual = brandSchema.virtual('id');
virtual.get(() => {
  return this._id;
});
brandSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret)=> {
    delete ret._id;
  },
});

exports.Brand = mongoose.model('Brand', brandSchema);