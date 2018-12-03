import { INode } from ".";
import { WIDTH, HEIGHT } from "./config";

const canvas = <HTMLCanvasElement> document.getElementById('draw');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');

export function drawAllNodes(nodes: INode[]) {
  ctx.strokeStyle = '#000';
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 5, 0, 2*Math.PI);
    ctx.stroke();
  })
}

export function connectAllNodes(nodes: INode[], orderArr: number[]) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)'
  ctx.beginPath()
  for (let i = 0; i < orderArr.length; i++) {
    const curr = orderArr[i];
    const node = nodes[curr];
    ctx.lineTo(node.x, node.y)
  }
  ctx.closePath();
  ctx.stroke()
}

export function clearCanvas() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

export function drawAGene(nodes: INode[], gene: number[]) {
  clearCanvas();
  drawAllNodes(nodes);
  connectAllNodes(nodes, gene);
}

