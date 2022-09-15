export class TreeNode {
    protected _children: TreeNode[] = [];
    protected _childrenCount: number = 0;
    constructor(
       public key: string | number,
       public data: any = key,
       _children: TreeNode[] = [],
       public parent?: TreeNode,
    ) {
        _children.forEach(child => this.insertChild(child))
    }

    get isLeaf() {
        return this._children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }

    get childrenCount(){
        return this._childrenCount
    }

    childAt(index: number){
        if(index >= 0 && index < this._childrenCount)
            return this._children[index];
    }

    *children() {
        for(let i = 0; i < this._children.length; i++)
            yield this._children[i];
    }

    removeChild(key: string | number){
        const index = this._children.findIndex((node) => node.key === key);
        if(index !== -1) {
            this.removeChildAt(index)
        }
        return this;
    }

    removeChildAt(index: number){
        if(index >= 0 && index < this._childrenCount) {
            this._children.splice(index, 1);
            this._childrenCount--;
        }
        return this;
    }

    insertChild(node: TreeNode){
        node.parent = this;
        this._children.push(node);
        this._childrenCount++
        return this;
    }

    insertChildAt(node: TreeNode, index: number){
        node.parent = this;
        this._children.splice(index, 0, node);
        this._childrenCount++
        return this;
    }
}