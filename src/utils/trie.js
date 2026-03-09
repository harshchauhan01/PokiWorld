class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }

    node.isEnd = true;
  }

  searchPrefix(prefix) {
    let node = this.root;

    for (const char of prefix) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }

    return node;
  }

  suggestions(prefix, limit = 5) {
    const node = this.searchPrefix(prefix);
    if (!node) return [];

    const results = [];

    const dfs = (currentNode, path) => {
      if (results.length >= limit) return;

      if (currentNode.isEnd) {
        results.push(prefix + path);
      }

      for (const char in currentNode.children) {
        dfs(currentNode.children[char], path + char);
      }
    };

    dfs(node, "");
    return results;
  }
}