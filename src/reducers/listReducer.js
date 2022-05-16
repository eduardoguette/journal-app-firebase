import { types } from '../types/types'

export const listReducer = (state = [], action) => {
  switch (action.type) {
    case types.listsLoad:
      return action.payload
    case types.listsDelete:
      return [{ id: action.payload.idList, listProfile: action.payload.listProfile.filter((list) => list.id !== action.payload.idList) }]
    case types.listsPush:
      const [{id, listProfile}] = action.payload 
      return [{id, listProfile}]
    default:
      return state
  }
}
