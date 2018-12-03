import { getTotalDistance, getRandomInt } from "./utils";
import { INode } from ".";
import { crossover, mutate } from './breed';
import { POPULARITY, MUTUTE_PROB } from "./config";

interface IIndividual {
  gene: number[],
  rate: number,
}

class GA {
  pool: IIndividual[];
  nodes: INode[];
  generation: number;
  totalRate: number;  // 所有个体的打分总和
  nextGenarationPool: IIndividual[];

  constructor(opt: any) {
    // 保存当前一代的所有基因
    this.pool = [];
    this.nodes =  opt.nodes;
    this.generation = opt.generation;

    opt.genes.forEach((gene: []) => {
      const distance = getTotalDistance(this.nodes, gene);
      const rate = 1e5 / distance;
      this.pool.push({
        gene,
        rate,
      })
    })

    this.sortByRate();

    this.totalRate = this.pool.reduce((prev, current) => {
      return prev + current.rate;
    }, 0)

    this.generateNextGenPool();
  }

  // 将 this.pool 重新排序
  sortByRate() {
    this.pool.sort((a, b) => {
      if (a.rate === b.rate) return 0;
      return a.rate > b.rate ? -1 : 1;
    })
  }

  // 生成下一代的基因
  generateNextGen() {
    const len = POPULARITY;
    const nextGenes = [];
    const lastGenes = []; // 保留和上一代一样的基因
    for (let i = 0; i < len / 10; i++) {
      let newGene =  this.pool[i].gene;
      lastGenes.push(newGene);
    }

    while (nextGenes.length + lastGenes.length < len) {
      const parent1 = this.selectRandomGene();
      const parent2 = this.selectRandomGene();

      let newGene =  crossover(parent1, parent2);
      if (Math.random() < MUTUTE_PROB) {
        newGene = mutate(newGene);
      }
      nextGenes.push(newGene);
    }

    return [...nextGenes, ...lastGenes];
  }


  // 根据gene的得分来构建一个基因池，得分越高的gene在其中出现的频率越高
  // 根据概率大小来选出一个基因
  generateNextGenPool() {
    const probability: number[] = [];
    this.pool.forEach(p => {
      probability.push(p.rate / this.totalRate);
    })

    this.nextGenarationPool = [];
    probability.forEach((r, index) => {
      for (let i = 0; i <= r * 200; i++) {
        this.nextGenarationPool.push(this.pool[index]);
      }
    });
  }

  selectRandomGene() {
    const randomIndex = getRandomInt(this.nextGenarationPool.length);
    return this.nextGenarationPool[randomIndex].gene;
  }
}

export default GA;
