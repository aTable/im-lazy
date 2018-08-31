import React from 'react'
import DevTools from 'mobx-react-devtools'
import config, { environmentTypes } from '../config'

export default () => (config.environmentType === environmentTypes.Debug ? <DevTools /> : null)
