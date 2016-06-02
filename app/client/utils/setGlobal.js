export default (vars = {}) => {
  const glb = global || window;
  for (const v in vars) {
    if(v){
      if(glb[v]) {
        console.error('window[' + v + '] is already set');
        continue;
      } else {
        glb[v] = vars[v];
      }
    }
  }
}