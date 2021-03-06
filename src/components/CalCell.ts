import {node, node_dom, node_map, hook_reducer, hook_state, hook_first, hook_effect, LuiNodeList} from 'lui'
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
 */
export const CalCell = ({I, month}): LuiNodeList => {
    const [calEvents, eventMutations] = hook_reducer(calEventsReducer);
    const [editMode, setEditMode] = hook_state(false);
    // @ts-ignore
    if (hook_first()) eventMutations(CAL_EVENT_INIT, null);
    hook_effect((m: Month) => eventMutations(CAL_EVENT_LOAD, {year: I.year, month: m, day: I.id}), [month]);
    hook_effect((updatedEvents : any[]) => {
        if (I !== undefined && month !== undefined && updatedEvents.length)
            storeDayEvents(updatedEvents, I.year, month, I.id)
    }, [calEvents]);
    return [
        node_dom('div[className=cal-cell]', {
            innerText: I.id + 1,
            onclick: (event) => {
                if ((event.target as Element).className.includes('cal-cell')) setEditMode(true)
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
