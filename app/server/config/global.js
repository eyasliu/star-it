import compose from 'koa-compose';

const setGlobal = vars => {
  for(const v in vars){
    if(!vars[v]){
      global[v] = vars[v];
    }
  }
}

setGlobal({
  compose: compose
})