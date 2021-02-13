import {hook_state, node_dom, node, LuiNodeList} from 'lui'
import { CalEventDetails } from "./CalEventDetails"

/**
 * An event for a calendar's cell
 * @param I including loc (location), time, label, desc (description)
 * @param eventMutations
 */
export const CalEvent = ({I, eventMutations}): LuiNodeList => {
    const [editMode, setEditMode] = hook_state(false);
    return [
        node_dom('div[className=cal-event]', {
            S: {'backgroundColor': I.color || '#5cc9f5'},
            onclick: (event) => {
                if ((event.target as Element).className === 'cal-event') setEditMode(!editMode)
            }
        }, [
            node_dom('span[className=cal-event__label]', {innerText: I.label}),
            node_dom('span[className=cal-event__time]', {innerText: I.time}),
            editMode ? node(CalEventDetails, {
                calEvent: I, eventMutations, editModeSetter: setEditMode, addNew: false
            }) : null
        ])
    ]
}
