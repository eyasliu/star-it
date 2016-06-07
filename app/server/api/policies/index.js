import logger from  './logger';
import bodyParse from './bodyParse';

export default compose([
  logger,
  bodyParse
])