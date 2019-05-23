const Booking = require('../../models/booking')
const Event = require('../../models/event')
const { transformBooking, transformEvent } = require('./merge')

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find()
      return bookings.map(booking => transformBooking(booking))
    } catch (error) {
      throw error
    }
  },
  bookEvent: async args => {
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId })

      const booking = new Booking({
        user: '5cdd0c8913529b11a52b8b35',
        event: fetchedEvent,
      })

      const result = await booking.save()
      return transformBooking(result)
    } catch (error) {
      throw error
    }
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId)
        .populate('event')

      const event = transformEvent(booking.event)

      await Booking.deleteOne({ _id: args.bookingId })

      return event

    } catch (error) {
      throw error
    }
  },
}