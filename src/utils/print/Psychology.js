import {
    createHeader,
    createFoother,
    createMenu,
    createPageBesmela,
} from "./global_methods"
import { printThis } from "../printThis"
import { print_styles } from "./global_css"
import { fing_data_generator } from "./fi_data"
import { fileURL } from "@/config/config"

export default function psyPrint(ogrid = {}, paziresh = {}) {
    const data = fing_data_generator(
        ogrid,
        paziresh,
        ogrid["1723304274312"]["1560917908501"] // emza
    )

    const createRavanshenasi = () => `
        ${createHeader("روانشناسی", "1571563709227", "#4CDAEA", data)}
        ${createContentRavan()}
        ${createFoother()}
    `

    const createContentRavan = () => {
        // Replace strings in `ravanShenasiCon`
        const modifiedContent = data.ravanShenasiCon
            .replaceAll("font", "mm")
            .replaceAll("line-height", "mm")

        return `<div class="content">${getRavan(modifiedContent)}</div>`
    }

    const getRavan = (content) => `
        <div style="max-height: 120mm; height: 120mm; text-align: justify; text-justify: inter-word; margin-left: 5mm; margin-right: 5mm; line-height: 8mm;">
            <span class="font_14 ravan_css">${content}</span>
            <br/>
            ${
                data.p_emza
                    ? `<img src="${fileURL}${data.p_emza}" style="width: 35mm; height: 35mm; float: left;" />`
                    : null
            }
        </div>
    `

    const pages = `
        <div class="a4" style="width: 210mm; height: 297mm;">
            ${createPageBesmela()}
        </div>
        <div class="a4" style="width: 210mm; height: 297mm;">
            ${createMenu(data)}
        </div>
        <div class="a4" style="width: 210mm; height: 297mm;">
            ${createRavanshenasi()}
        </div>
    `

    const bodyContent = `
        <div class="mainContent">
            ${pages}
        </div>
    `

    printThis(
        "<style>.menu_khodezhari{right: 14mm !important; top: 158mm !important;}</style>" +
            print_styles,
        bodyContent
    )
}
