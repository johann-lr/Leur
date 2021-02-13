import months from "../data/months.json"
import {LuiNodeList, node, node_dom, node_map} from 'lui'
import {CalCell} from "./CalCell"

/**
 * Calendar component
 * @param {number} month calendar's active view
 * @param {number} year active year
 */
export const Cal = ({month, year}): LuiNodeList => {
    let cellData: { id: number, month: number, year: number }[] = [];
    for (let i: number = 0; i < months[month].days; i++) {
        if (month === 1 && i === 28 && (year % 4 !== 0)) break;
        else cellData.push({id: i, month: months[month].id, year});
    }
    return [
        node_dom('div[className=cal__cells]', null, [node_map(CalCell, cellData, {month})])
    ];
}
