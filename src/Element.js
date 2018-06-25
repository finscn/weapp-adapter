import Node from './Node'

export default class Element extends Node {
    className = ''
    children = []

    constructor() {
        super()
    }

    setAttribute(name, value) {
        this[name] = value
    }

    getAttribute(name) {
        return this[name]
    }

    setAttributeNS(name, value) {
        this[name] = value
    }

    getAttributeNS(name) {
        return this[name]
    }
}
