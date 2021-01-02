import {hook_state, node_dom, node} from 'lui/src/lui'
import {CalEventDetails} from "./CalEventDetails"

// loc, time, label, desc
export const CalEvent = ({I, eventMutations}) => {
    const [editMode, setEditMode] = hook_state(false);
    return [
        node_dom('div[className=cal-event]', {
            S: {'background-color': I.color || '#5cc9f5'},
            onclick: (event) => {
                if (event.target.className === 'cal-event') setEditMode(!editMode)
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
