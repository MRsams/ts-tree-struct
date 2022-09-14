export class TreeNode {
    public children: TreeNode[] = [];
    constructor(
       public key: string | number,
       public data: any = key,
       _children: TreeNode[] = [],
       public parent?: TreeNode,
    ) {
        _children.forEach(child => this.insertChild(child))
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }

    removeChild(key: string | number){
        const index = this.children.findIndex((node) => node.key === key);
        this.children.splice(index, 1);
        return this;
    }

    removeChildAt(index: number){
        this.children.splice(index, 1);
        return this;
    }

    insertChild(node: TreeNode){
        node.parent = this;
        this.children.push(node);
        return this;
    }

    insertChildAt(node: TreeNode, index: number){
        node.parent = this;
        this.children.splice(index, 0, node);
        return this;
    }
}