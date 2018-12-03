import { shuffle, getRandomInt } from './utils';
import { drawAGene } from './draw';
import GA from './ga';
import { bindButtonEvent } from './operate';
import { NODES_NUM, POPULARITY, WIDTH, HEIGHT } from './config';
import { state } from './state';

export interface INode {
  x: number;
  y: number;
}

const nodes: INode[] = [];
// 生成gene，其中保存的是各个node之间的连接顺序
const genes: number[][] = [];
init();

let currentGA = new GA({
  genes: genes,
  nodes,
  generation: 0,
});
let generation = 0;

// 循环生成下一代，并画出该代最佳的一个基因
const timer = setInterval(() => {
  drawAGene(nodes, currentGA.pool[0].gene);

  if (state.status === 'pause') return;

  currentGA = new GA({
    genes: currentGA.generateNextGen(),
    nodes,
    generation: ++generation
  });

  // 每一百代输出当前代数信息
  if (generation % 100 === 0) {
    console.log(generation);
  }

  if (generation > 10000) {
    clearInterval(timer);
  }
  
}, 20);


function init() {
  bindButtonEvent();

  for (let i = 0; i < NODES_NUM; i++) {
    const x = getRandomInt(WIDTH);
    const y = getRandomInt(HEIGHT);
    nodes.push({x, y});
  }

  const orderArr: Number[] = [];  // 记录各个节点之间的连接顺序
  for (let i = 0; i < nodes.length; i++) {
    orderArr.push(i);
  }
  shuffle(orderArr);

  for (let i = 0; i < POPULARITY; i++) {
    const gene = [...shuffle(orderArr)];
    genes.push(gene);
  }
}




