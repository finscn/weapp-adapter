import Node from 'Node.js';

export default class Element extends Node
{
    constructor(tagName = ''){
        super();
        this.className = '';
        this.childern = [];
    }
};
