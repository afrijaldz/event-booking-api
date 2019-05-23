const Event = require('../../models/event')
const { transformEvent } = require('./merge')

module.exports = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => transformEvent(event))
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5cdd0c8913529b11a52b8b35',
    })

    let createdEvent

    try {
      const result = await event.save()

      createdEvent = transformEvent(result)

      const creator = await User.findById('5cdd0c8913529b11a52b8b35')

      if (!creator) {
        throw new Error('User not exists!')
      }

      creator.createdEvents.push(event)
      await creator.save()

      return createdEvent
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}