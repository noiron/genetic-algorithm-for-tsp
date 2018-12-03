import { INode } from ".";

export function delay(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms);
  })
} 

export function shuffle(array: any[]) {
  let m = array.length;

  while (m) {
    // 选出一个剩余的元素
    const i = Math.floor(Math.random() * m--);

    // 交换两个元素
    const t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function calcuteDistance(node1: INode, node2: INode) {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * 按顺序连接所有节点（首尾相连），计算总距离
 */
export function getTotalDistance(nodes: INode[], order: number[]): number {
  let distance = 0;
  const n = order.length;
  for (let i = 0; i < n - 1; i++) {
    const curr = order[i];
    const next = order[i+1];
    distance += calcuteDistance(nodes[curr], nodes[next]);
  }

  distance += calcuteDistance(nodes[order[0]], nodes[order[n - 1]])

  return distance;
}

/**
 * 生成一个 [0, range) 范围的整数
 */
export function getRandomInt(range: number) {
  return Math.floor(Math.random() * range);
}
