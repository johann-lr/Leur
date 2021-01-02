import { node_dom, node } from 'lui/src/lui'
import { CAL_EVENT_RM, CAL_EVENT_ADD, CAL_EVENT_MOD } from "../reducers/types/EventReducerTypes"

/**
 * Window to edit or create CalEvents
 * @param calEvent the CalEvent data (from parent)
 * @param eventMutations
 * @param editModeSetter to hide the window again
 * @param addNew If false, the window's intention is the modification of an existing CalEvent
 * @constructor
 */
export const CalEventDetails = ({calEvent, eventMutations, editModeSetter, addNew = true}): node => ([
    node_dom('div[className=cal-event__edit]', null, [
        node_dom('button[className=cal-event__head flex space-between]', null, [
            node_dom('input[className=cal-event__color input input--color][type=color]', {
                onchange: (event) => (calEvent.color = event.target.value)
            }),
            node_dom('button[className=cal-event__close button button--small icon-cross]', {
                onclick: () => editModeSetter(false)
            })
        ]),
        node_dom('div[className=flex-column]', null, [
            node_dom('input[className=cal-event__title]', {
                onchange: (event) => (calEvent.label = event.target.value),
                placeholder: calEvent.label
            }),
            node_dom('input[className=cal-event__title--sub]', {
                onchange: (event) => (calEvent.loc = event.target.value),
                placeholder: calEvent.loc
            }),
            node_dom('input[className=cal-event__inputtime input input--time][type=time]', {
                onchange: (event) => (calEvent.time = event.target.value),
            }),
            node_dom('textarea[className=cal-event__desc input input--text][max=200]', {
                onchange: (event) => (calEvent.desc = event.target),
                placeholder: calEvent.desc
            })
        ]),
        node_dom('div[className=flex space-between]', null, [
            !addNew ? node_dom('button[className=button button--sec][innerText=Löschen]', {
                onclick: () => {
                    editModeSetter(false);
                    eventMutations(CAL_EVENT_RM, calEvent.id);
                }
            }) : null,
            node_dom('button[className=button button--primary]', {
                innerText: addNew ? "Speichern" : "Ändern",
                onclick: () => {
                    editModeSetter(false);
                    eventMutations(addNew ? CAL_EVENT_ADD : CAL_EVENT_MOD, {
                        ...(addNew ? {id: new Date().getTime()} : {}),
                        ...calEvent
                    })
                }
            })
        ])
    ])
]);
