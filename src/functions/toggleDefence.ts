let defence = false;
//TODO: add time
export function toggleDefence() {
  defence = !defence;
  if (defence) {
    console.log('Defence started');
  } else {
    console.log('Defence stopped');
  }
  return;
}
