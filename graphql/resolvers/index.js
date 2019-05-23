const authResolver = require('./auth')
const eventsResolver = require('./events')
const bookingResolver = require('./booking')

module.exports = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
}