import {TreeNode} from "./TreeNode";

export class Tree {
    constructor(private _root: TreeNode){}

    get root(){
        return this._root
    }

    *preOrderTraversal(node = this._root): IterableIterator<TreeNode>{
        yield node;
        if(node.children.length){
            for(let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    *postOrderTraversal(node = this._root): IterableIterator<TreeNode>{
        if(node.children.length){
            for(let child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }

    walk(
        enterFn: (node: TreeNode, context?: Record<string, any>) => unknown,
        leaveFn?: (node: TreeNode, context?: Record<string, any>) => unknown,
        context?: Record<string, any>,
        strategy?: "pre" | "post"
    ){
        for(let node of this.postOrderTraversal()) {
            enterFn(node, context)
            if(leaveFn) leaveFn(node, context);
        }
    }

    findOne(fn: string | number | ((node: TreeNode) => boolean)): TreeNode | undefined {
        for(let node of this.preOrderTraversal()) {
            if(typeof fn === "string" || typeof fn === "number") {
                if (node.key === fn)
                    return node;
            }
            else if(typeof fn === "function")
                if(fn(node)) return node;
        }
        return undefined;
    }

    findMany(fn: string | number | ((node: TreeNode) => boolean)): TreeNode[] {
        const nodes = [];
        for(let node of this.preOrderTraversal()) {
            if(typeof fn === "string" || typeof fn === "number") {
                if (node.key === fn)
                    nodes.push(node);
            }
            else if(typeof fn === "function")
                if(fn(node)) nodes.push(node);
        }
        return nodes;
    }

    insertAt(key: string | number, node: TreeNode){
        this.findOne((node) => node.key === key)?.insertChild(node);
    }

    remove(key: string | number){
        const parent = this.findOne((node) => node.key === key)?.parent;
        if(parent){
            parent.removeChild(key);
        }
    }

    count(){
        const context = {count: 0}
        this.walk(
            (node, context?) => {
                console.log(`enter ${node.key}`, context)
                if(context && context.count !== undefined)
                    context.count += node.children.length;
            },
            (node, context?) => {
                console.log(`leave ${node.key}`, context)
                if(context && context.count !== undefined && !node.parent)
                    context.count += 1;
            },
            context
        )
        return context;
    }
}