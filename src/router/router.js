import { Router } from 'express'

export default class MyRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {}

    getRouter() {
        return this.router
    }

    get(path, ...callbacks) {
        this.router.get(path, this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks) {
        return callbacks.map(item => async(...params) => {
            try {
                await item.apply(this, params)
            } catch(error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }
}