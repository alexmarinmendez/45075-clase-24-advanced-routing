import { Router } from 'express'
import jwt from 'jsonwebtoken'

export default class MyRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {}

    getRouter() {
        return this.router
    }

    get(path, policies, ...callbacks) {
        this.router.get(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.generateCustomResponses, this.handlePolicies(policies), this.applyCallbacks(callbacks))
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

    generateCustomResponses(req, res, next) {
        res.sendSuccess = payload => res.send({ status: "success", payload })
        res.sendServerError = error => res.status(500).send({ status: "error", error })
        res.sendUserError = error => res.status(400).send({ status: "error", error })
        res.sendNoAuthenticatedError = error => res.status(401).send({ status: 'error', error })
        res.sendNotAuthorizatedError = error => res.status(403).send({ status: 'error', error })
        next()
    }

    handlePolicies = policies => (req, res, next) => {
        if (policies.includes('PUBLIC')) return next()
        if(policies.length > 0) {
            const authHeaders = req.headers.authorization
            if(!authHeaders) return res.sendNoAuthenticatedError('Not authenticated')

            const tokenArray = authHeaders.split(' ')
            const token = (tokenArray.length > 1) ? tokenArray[1] : tokenArray[0]

            //Bearer d29dslasflk43nkl4n3lktn43klt
            //['Bearer', 'd29dslasflk43nkl4n3lktn43klt']

            //d29dslasflk43nkl4n3lktn43klt
            //['d29dslasflk43nkl4n3lktn43klt']

            const user = jwt.verify(token, 'secret')

            if (!policies.includes(user.role.toUpperCase())) {
                return res.sendNotAuthorizatedError('Not Authorizated')
            }

            req.user = user
            return next()
        }

        next()
    }
}