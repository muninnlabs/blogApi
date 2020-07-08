const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema,
  SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userAvatar: {
    data: Buffer,
    contentType: String
  },
  firstName: String,
  lastName: String,
  company: String,
  address: String,
  city: String,
  jobTitle: String,
  country: String,
  zipcode: String,
  about: String,
  facebook: String,
  twitter: String,
  created: Date,
  lastUpdate: Date,
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number }
});

UserSchema.pre('save', function(next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  return cb(null, bcrypt.compareSync(candidatePassword, this.password));
};

// UserSchema.pre('findOneAndUpdate', () => {
//   this._update.password = bcrypt.hashSync(this._update.password, 10);
// });

module.exports = mongoose.model('User', UserSchema);
