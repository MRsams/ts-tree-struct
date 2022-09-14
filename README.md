# TS TREE STRUCT

Just another tree data structure implementation in TS

# Installation

``npm install --save ts-tree-struct``

# Examples

## Import required classes

```typescript
import { Tree, TreeNode } from "ts-tree-struct";
```

### Create tree

```typescript
import { Tree, TreeNode } from "ts-tree-struct";
const tree = new Tree(
    //Tree requires a node to be used as root
    new TreeNode(
        "root", //key: string | number, required
        { foo: "bar" }, //data: any, optional, default as key
        [ new TreeNode("node#1", {foo: "bir"}) ], //children: TreeNode[], optional, default as []
    )
)
```

## Tree props and methods

### Get root node

```typescript
> tree.root

> {
    key: 'root',
    data: { foo: 'bar' },
    parent: undefined,
        children: [
        {
            key: 'node#1',
            data: { foo: 'bir' },
            parent: *this*,
            children: []
        }
    ]
}
```

### Get a node by key...

```typescript
> tree.findOne("node#1")

> {
    key: 'node#1',
    data: { foo: 'bir' },
    parent: {
        key: 'root',
        data: { foo: 'bar' },
        parent: undefined,
        children: [ *this* ]
    },
    children: []
}
```

### ...or pass a find function

```typescript
> tree.findOne((node) => node.key === "node#1")

> {
    key: 'node#1',
    data: { foo: 'bir' },
    parent: {
        key: 'root',
        data: { foo: 'bar' },
        parent: undefined,
        children: [ *this* ]
    },
    children: []
}
```

### Find many nodes a time

```typescript
> tree.findMany((node) => node.data.foo[0] === "b")

> [
    {
        key: 'root',
        data: { foo: 'bar' },
        parent: undefined,
        children: [
            {
                key: 'node#1',
                data: { foo: 'bir' },
                parent: {
                    key: 'root',
                    data: { foo: 'bar' },
                    parent: undefined,
                    children: [ *this* ]
                },
                children: []
            }
        ]
    },
    {
        key: 'node#1',
        data: { foo: 'bir' },
        parent: {
            key: 'root',
            data: { foo: 'bar' },
            parent: undefined,
            children: [ *this* ]
        },
        children: []
    }
]
```

### Insert a node

```typescript
> tree.insertAt(
    "node#1", //key of target node
    new TreeNode("node#2", {foo: "bor"}) //node to insert
)

> {
    key: 'root',
    data: { foo: 'bar' },
    parent: undefined,
    children: [
        {
            key: 'node#1',
            data: { foo: 'bir' },
            parent: *root*,
            children: [
                {
                    key: 'node#2',
                    data: { foo: 'bor' },
                    parent: *node#1*,
                    children: []
                }
            ]
        }
    ]
}
```

### Remove a node

```typescript
> tree.remove("node#2")

> {
    key: 'root',
    data: { foo: 'bar' },
    parent: undefined,
    children: [
        {
            key: 'node#1',
            data: { foo: 'bir' },
            parent: *root*,
            children: []
        }
    ]
}
```

### Iterate tree

```typescript
> [...tree.preOrderTraversal()].map(x => x.key);

> [ "root", "node#1" ]

> [...tree.postOrderTraversal()].map(x => x.key);

> [ "node#1", "root" ] 
```

### Count nodes

```typescript
> tree.count()

> { count: 2 }
```

## TreeNode props and methods

```typescript
> tree.root.hasChildren

> true
```

```typescript
> tree.root.children[0].isLeaf 

> true
```

### Access parent

```typescript
> tree.findOne("node#1").parent

> {
    key: 'root',
    data: { foo: 'bar' },
    parent: undefined,
    children: [
        {
            key: 'node#1',
            data: { foo: 'bir' },
            parent: *root*,
            children: []
        }
    ]
}
```

### Insert child

```typescript
tree.root.insertChild(new TreeNode("node#2", { foo: "bor" }))

OR

tree.root.insertChildAt(0, new TreeNode("node#3", { foo: "bur" }))
```

### Remove child

```typescript
tree.root.removeChild("node#2")

OR

tree.root.removeChildAt(0)
```
