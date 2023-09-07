const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'заполните поле'],
    minlength: [2, 'длина поля должна быть больше 2'],
    maxlength: [30, 'длина поля должна быть не больше 30'],
  },
  about: {
    type: String,
    minlength: [2, 'длина поля должна быть больше 2'],
    maxlength: [30, 'длина поля должна быть не больше 30'],
    require: [true, 'заполните поле'],
  },
  avatar: {
    type: String,
    require: [true, 'заполните поле'],
    validare: {
      validator(v) {
        return /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(v);
      },
    },
    message: ['введите корректную ссылку'],
  },

});
module.exports = mongoose.model('user', userSchema);
