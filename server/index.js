import app from './app';

const PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, err => {
  if (err) {
    console.error(`👽Houston we have a problem : ${err} ☠️`);
  } else {
    console.log(`🎉 APP Listen to port: ${PORT} 🎉`);
  }
});