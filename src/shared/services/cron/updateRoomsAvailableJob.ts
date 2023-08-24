import cron from 'node-cron'

async function updateRoomsAvailableJob() {
  console.log('opa')
}

// cron to execute every day at 00:00
const cronSchedule = process.env.NODE_ENV === 'test' ? '* * * * *' : '0 0 * * *'

cron.schedule(cronSchedule, () => {
  updateRoomsAvailableJob()
})
