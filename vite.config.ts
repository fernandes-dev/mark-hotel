import { defineConfig } from 'vitest/config'

import { clearDatabase } from './src/shared/infra/database/prisma/tests/clearDatabase'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['dotenv/config'],
    reporters: [
      'default',
      {
        async onWatcherRerun() {
          await clearDatabase()
        },
      },
    ],
  },
})
