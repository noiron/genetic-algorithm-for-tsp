/**
 * 包括按钮的点击等操作
 */
import { state } from "./state";

type StatusType = 'running' | 'pause';

const toggleBtn = document.getElementById('btn-toggle');

export function bindButtonEvent() {
  toggleBtn.addEventListener('click', (e) => {
    const target = <HTMLButtonElement>e.target;
    const nextStatus: StatusType = state.status === 'running' ? 'pause' : 'running';
    const text = nextStatus === 'running' ? 'Pause' : 'Start';
    target.dataset.status = nextStatus;
    target.innerText = text;
    state.status = nextStatus;
  })
}