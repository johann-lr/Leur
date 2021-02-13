/**
 * Main module "Leur" calendar
 * @requires git:https://github.com/l3p3/lui
 * @author Johann Laur
 * @version 0.1.0
 */

import { NavBarTop } from "./components/NavbarTop"
import { init, hook_state, node, node_dom } from 'lui'
import months from './data/months.json'
import { Cal } from "./components/Cal"
import { Month } from "./types"

init(() => {
        const [activeMonth, changeMonth] = hook_state(months[0]);
        const [activeYear, changeYear] = hook_state(2020);
        return (!window.localStorage)
            ? [null, [node_dom('div[innerText=Diese Anwendung ist nicht mit einem Toaster Kompatibel]', null, [
                node_dom('p[innerText=>:-|]')
            ])]]
            : [null, [
                node_dom('div[id=cal][className=cal]', null, [
                    node(NavBarTop, {activeMonth, activeYear, changeMonth, changeYear}),
                    node(Cal, {month: activeMonth.id, year: activeYear})
                ])
            ]]
    }
)
