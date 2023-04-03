import Router from './router.js'

export default class UserRouter extends Router {
    init() {
        this.get('/', (req, res) => {
            res.send('Hola Coders')
        })
    }
}