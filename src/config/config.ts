import dotenv from 'dotenv'
dotenv.config()

import dev from './dev'
import prod from './prod'
import test from './tst'
import Configs from '../types/configs'

const env = process.env.NODE_ENV?.trim()
let configs: Configs

switch (env) {
    case 'development':
        configs = dev
        break
    case 'production':
        configs = prod
        break
    case 'test':
        configs = test
        break
    default:
        configs = dev
        break
}

export default configs
