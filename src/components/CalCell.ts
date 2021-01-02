import { node, node_dom, node_map, hook_reducer, hook_state, hook_first, hook_effect } from 'lui/src/lui'
import { storeDayEvents } from '../helpers'
import calEventsReducer from '../reducers/EventReducer'
import { CAL_EVENT_INIT, CAL_EVENT_LOAD } from '../reducers/types/EventReducerTypes'
import { CalEventDetails } from './CalEventDetails'
import { CalEvent } from "./CalEvent"
import { Month } from "../types"

/**
 * A single cell for the calendar grid
 * @param I passed by node_map in Cal component
 * @param month passed by activeMonth from the parent state
 * @constructor
 */
export const CalCell = ({I, month}): node => {
    const [calEvents, eventMutations]: [any[], (actionType: number, payload?: any) => void] = hook_reducer(calEventsReducer);
    const [editMode, setEditMode]: [boolean, (newVal: boolean) => void] = hook_state(false);
    if (hook_first()) eventMutations(CAL_EVENT_INIT);
    hook_effect((m: Month) => eventMutations(CAL_EVENT_LOAD, {year: I.year, month: m, day: I.id}), [month]);
    hook_effect((updatedEvents : any[]) => {
        if (I !== undefined && month !== undefined && updatedEvents.length)
            storeDayEvents(updatedEvents, I.year, month, I.id)
    }, [calEvents]);
    return [
        node_dom('div[className=cal-cell]', {
            innerText: I.id + 1,
            onclick: (event) => {
                if (event.target.className.includes('cal-cell')) setEditMode(true)
            },
            onkeydown: (event) => {
                if (event.code === 'Escape') setEditMode(false);
            }
        }, [
            editMode ? node(CalEventDetails, {
                calEvent: {label: "Neues Ereignis", time: "00:00", loc: "Ort", desc: "Beschreibung"},
                eventMutations,
                editModeSetter: setEditMode
            }) : null,
            calEvents ? node_map(CalEvent, calEvents, {eventMutations}) : null
        ])
    ]
}
