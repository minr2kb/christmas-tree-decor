import { badWords } from '@/constants/badwords';

interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  output: string[];
  fail: TrieNode | null;
}

class AhoCorasick {
  private root: TrieNode;

  constructor() {
    this.root = this.createNode();
  }

  private createNode(): TrieNode {
    return {
      children: new Map(),
      isEnd: false,
      output: [],
      fail: null,
    };
  }

  // 트라이 구조에 패턴 추가
  addPattern(pattern: string): void {
    let node = this.root;

    for (const char of pattern) {
      if (!node.children.has(char)) {
        node.children.set(char, this.createNode());
      }
      node = node.children.get(char)!;
    }

    node.isEnd = true;
    node.output.push(pattern);
  }

  // 실패 링크 구축
  buildFailureLinks(): void {
    const queue: TrieNode[] = [];
    this.root.fail = this.root;

    // 루트의 자식들의 실패 링크는 루트를 가리킴
    for (const child of this.root.children.values()) {
      child.fail = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const current = queue.shift()!;

      for (const [char, child] of current.children) {
        queue.push(child);

        let failNode = current.fail!;

        while (failNode !== this.root && !failNode.children.has(char)) {
          failNode = failNode.fail!;
        }

        child.fail = failNode.children.get(char) || this.root;
        child.output = child.output.concat(child.fail.output);
      }
    }
  }

  // 텍스트에서 패턴 검색 및 치환
  search(text: string, replacement: string): string {
    let current = this.root;
    let result = text;
    const matches: { pattern: string; index: number }[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      while (current !== this.root && !current.children.has(char)) {
        current = current.fail!;
      }

      current = current.children.get(char) || this.root;

      if (current.output.length > 0) {
        for (const pattern of current.output) {
          matches.push({
            pattern,
            index: i - pattern.length + 1,
          });
        }
      }
    }

    // 매치된 패턴들을 뒤에서부터 치환 (중복 치환 방지)
    matches.sort((a, b) => b.index - a.index);
    for (const { pattern, index } of matches) {
      result =
        result.substring(0, index) + replacement.repeat(pattern.length) + result.substring(index + pattern.length);
    }

    return result;
  }
}

// 금칙어 필터 초기화 및 사용을 위한 유틸리티 함수
const initBadWordsFilter = () => {
  const ac = new AhoCorasick();

  // 금칙어 패턴 추가
  badWords.forEach((word) => ac.addPattern(word));

  // 실패 링크 구축
  ac.buildFailureLinks();

  // 필터링 함수 반환
  return (text: string) => ac.search(text, '***');
};

export const filterBadWords = initBadWordsFilter();
