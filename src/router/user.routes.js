import Router from './router.js'

export default class UserRouter extends Router {
    init() {
        this.get('/', (req, res) => {
            res.sendSuccess('Hola Coders')
        })

        this.post('/:word', (req, res) => {
            if (req.params.word == 'x') res.sendUserError('No se puede agregar esta palabra')
            else res.sendSuccess('Word added')
        })
    }
}