import { NODES_NUM } from './config'
import { getRandomInt } from './utils';

export function crossover(parent1: any, parent2: any) {
  const len = NODES_NUM;
  const p1 = Math.floor(Math.random() * (len - 2));
  const p2 = Math.floor(Math.random() * (len - p1) + p1);

  const middle = parent2.slice(p1, p2);
  const newGene = parent1.slice(0, p1);

  middle.concat(parent2).map((g: number) => {
    if (!newGene.includes(g)) {
      newGene.push(g);
    }
  })

  return newGene;
}

export function mutate(gene: number[]) {
  const n = gene.length;
  let p1 = getRandomInt(n);
  let p2 = getRandomInt(n);
  
  if (p1 === p2) {
    return gene;
  }

  if (p1 > p2) {
    [p1, p2] = [p2, p1];
  }

  const funcs = [
    // 交换
    (p1: number, p2: number) => {
      const temp = gene[p1];
      gene[p1] = gene[p2];
      gene[p2] = temp;
      return gene;
    },
    
    // 倒序
    (p1: number, p2: number) => {
      const temp = gene.slice(p1, p2).reverse();
      gene.splice(p1, p2 - p1, ...temp);
      return gene;
    },

    // 移动
    (p1: number, p2: number) => {
      const temp = gene.splice(p1, p2 - p1);
      gene.splice(getRandomInt(gene.length), 0, ...temp)
      return gene;
    },
  ]

  const random = getRandomInt(3);
  return funcs[random](p1, p2);
}
