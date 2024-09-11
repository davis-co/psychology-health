import { configureStore } from '@reduxjs/toolkit'
import serverData from './reducers/serverData'

export default configureStore({
  reducer: {
    serverData
  },
})