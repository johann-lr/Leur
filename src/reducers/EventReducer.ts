import {getDayEvents} from '../helpers'

export default [
    // INIT
    () => [],
    // LOAD (localstorage)
    // @ts-ignore
    (state, {year, month, day}) => (JSON.parse(getDayEvents(year, month, day)) || []),
    // ADD
    (state, payload) => state.concat(payload),
    // MODIFY
    (state, payload) => {
        const itemIndex = state.findIndex(el => el.id === payload.id)
        state[itemIndex] = payload
        return state
    },
    // REMOVE
    (state, payload) => state.filter(item => item.id !== payload)
];
