import dev from './dev';
import prod from './prod';
import test from './tst';

const env = process.env.NODE_ENV?.trim();
let keys: any;

switch(env) {
    case 'development':
        keys = dev;
        break;
    case 'production':
        keys = prod;
        break;
    case 'test':
        keys = test;
        break;
}

export default keys;