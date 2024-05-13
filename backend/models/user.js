const mongoose = require('mongoose');
const {Schema} = mongoose

const userSchema =  mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: Buffer, required: true },
    role: { type: String, required: true, default:'user' },
    addresses: { type: [Schema.Types.Mixed] }, 
    // TODO:  We can make a separate Schema for this
    name: { type: String },
    salt:Buffer,
    resetPasswordToken: {type:String, default:""}
});

const virtual = userSchema.virtual('id');
virtual.get(() => {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret)=> {
    delete ret._id;
  },
});

exports.User = mongoose.model('User', userSchema);