import '@babel/polyfill'
import debug from 'debug'
import app from './app'

const logger = debug('api:index')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => logger(`server is running on port ${PORT} 🚀`))
