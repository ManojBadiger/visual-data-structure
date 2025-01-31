# Python Program for binary search tree


class Node:
    def __init__(self, key) -> None:
        self.key = key
        self.right = None
        self.left = None


class BinarySearchTree:

    def __init__(self, key):
        self.root = Node(key)
        self.preorder_list = []
        self.postorder_list = []
        self.inorder_list = []
        self.leafNodes = 0
        self.height = 0

    def insert(self, key, current_node=None):
        if current_node is None:
            return Node(key)

        if key < current_node.key:
            current_node.left = self.insert(
                key, current_node.left) if current_node.left else Node(key)
        elif key > current_node.key:
            current_node.right = self.insert(
                key, current_node.right) if current_node.right else Node(key)

        return current_node

    def search(self, key, current_node=None):
        if current_node is None or current_node.key == key:
            return current_node

        if key < current_node.key:
            return self.search(key, current_node.left)
        else:
            return self.search(key, current_node.right)

    def DisplayRoot(self):
        if self.root:
            print(self.root.key)
        else:
            print("Tree is empty")

    def Inorder(self, current_node=None):
        # Left -> root -> Right
        if current_node:
            self.Inorder(current_node.left)
            self.inorder_list.append(current_node.key)
            self.Inorder(current_node.right)

        return self.inorder_list

    def Preorder(self, current_node=None):
        # Root -> left -> Right
        if current_node:
            self.preorder_list.append(current_node.key)
            self.Preorder(current_node.left)
            self.Preorder(current_node.right)

        return self.preorder_list

    def Postorder(self, current_node=None):
        # Left-> Right -> Root
        if current_node:
            self.Postorder(current_node.left)
            self.Postorder(current_node.right)
            self.postorder_list.append(current_node.key)

        return self.postorder_list


bst = BinarySearchTree(45)

bst.insert(13, bst.root)
bst.insert(16, bst.root)
bst.insert(8, bst.root)
bst.insert(65, bst.root)
bst.insert(55, bst.root)
bst.insert(40, bst.root)
bst.insert(19, bst.root)

print("Preorder traversal list   : ", bst.Preorder(bst.root))
print("Postorder traversal list  : ", bst.Postorder(bst.root))
print("Inorder traversal list    : ", bst.Inorder(bst.root))

element_to_search_in_bst = int(
    input("Enter an element to search in the tree: "))

if (bst.search(element_to_search_in_bst, bst.root)):
    print(f"Element {element_to_search_in_bst} is present in the list")
else:
    print(f"Element {element_to_search_in_bst} is not present in the list")
