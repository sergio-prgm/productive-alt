// import {handler} from 'vite-plugin-mix'

export const handler = (req, res, next) => {
  if (req.path === '/*') {
    res.send('hello')
  }
  next()
}