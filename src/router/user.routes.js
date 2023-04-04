import Router from './router.js'
import jwt from 'jsonwebtoken'

export default class UserRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], (req, res) => {
            const user = {
                email: req.query.email,
                role: 'user'
            }
            const token = jwt.sign(user, 'secret')
            res.sendSuccess({ token })
        })

        this.post('/:word', ['ADMIN'], (req, res) => {
            if (req.params.word == 'x') res.sendUserError('no se puede agregar')
            else res.sendSuccess('Word Added')
        })
    }
}