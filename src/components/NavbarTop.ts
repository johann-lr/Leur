import {hook_state, node_dom, node, LuiNode} from 'lui'
import months from '../data/months.json'

/**
 * Single-use-component: The application's navigation bar
 * @param activeMonth
 * @param activeYear
 * @param changeMonth month-setter
 * @param changeYear year-setter
 * @constructor
 */
export const NavBarTop = ({activeMonth, activeYear, changeMonth, changeYear}): LuiNode => {
    const [switchActive, setSwitchActive]: [boolean, (newVal: boolean) => void] = hook_state(false);
    return [
        node_dom('header[className=navbar-top]', {
            onmouseleave: () => setSwitchActive(false)
        }, [
            node_dom('div[className=flex space-between]', null, [
                node_dom('h1[className=navbar-top__heading]', {
                    innerText: `Kalender ${activeYear}`
                }),
                node_dom('div[className=navbar-top__switch]', null, [
                    switchActive ? node_dom('button[className=button icon-arrow-left]', {
                        onclick: () => {
                            changeMonth(months[activeMonth.id > 0 ? activeMonth.id - 1 : 11]);
                            if (activeMonth.id === 0) changeYear(activeYear - 1)
                        }
                    }) : null,
                    node_dom('h2[className=navbar-top__month]', {
                        innerText: activeMonth.name,
                        onmouseover: () => setSwitchActive(true),
                    }),
                    switchActive ? node_dom('button[className=button icon-arrow-right]', {
                        onclick: () => {
                            changeMonth(months[activeMonth.id < 11 ? activeMonth.id + 1 : 0]);
                            if (activeMonth.id === 11) changeYear(activeYear + 1)
                        }
                    }) : null
                ])
            ]),
            node_dom('div[className=navbar-top__days cal__cells]', null, [
                ...['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'].map(day => (
                    node_dom('span[className=navbar-top__days__day]', {innerText: day}))
                )
            ])
        ])
    ]
}
