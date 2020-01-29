const jwt = require('jsonwebtoken')

const KEY = '3287d53e-53b7-4302-aa40-e2bf25c2b294'
const ROUTES_WITHOUT_AUTH = ['/login', '/users', '/courses']

class Auth {
  constructor() {
    this.sign = this.sign.bind(this)
  }

  middleware() {
    return (req, res, next) => {
      if (ROUTES_WITHOUT_AUTH.includes(req.url)) {
        next()
        return
      }

      const header = req.headers.authorization

      if (!header || header.split(' ').length !== 2) {
        res.sendStatus(401)
        return
      }

      const [, token] = header.split(' ')
      const user = this.verify(token)

      if (!user) {
        res.sendStatus(403)
        return
      }

      req.user = user

      next()
    }
  }

  sign(user) {
    return jwt.sign(this._format(user), KEY)
  }

  verify(token) {
    try {
      return jwt.verify(token, KEY)
    } catch (e) {
      return false
    }
  }

  _format({ _id, email, type }) {
    return { _id, email, type }
  }
}

module.exports = Auth
