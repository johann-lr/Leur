import months from "../data/months.json"
import { node, node_dom, node_map } from 'lui/src/lui'
import { CalCell } from "./CalCell"

/**
 * Calendar component
 * @param month The whole month object for the calendar's active view
 * @param {number} year active year
 * @constructor
 */
export const Cal = ({ month, year }): node => {
    let cellData: { id: number, month: number, year: number } | [] = [];
    for (let i = 0; i < months[month].days; i++) {
        if (month === 1 && i === 28 && (year % 4 !== 0)) break;
        // @ts-ignore
        else cellData.push({id: i, month: months[month].id, year});
    }
    return [
        node_dom('div[className=cal__cells]', null, [node_map(CalCell, cellData, {month})])
    ];
}
