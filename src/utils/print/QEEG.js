import { printThis } from "../printThis"
import {
    createHeader,
    createFoother,
    createMenu,
    createPageBesmela,
} from "./global_methods"
import { print_styles } from "./global_css"
import { fing_data_generator } from "./fi_data"
import { fileURL } from "@/config/config"

export default function qeeg_print(ogrid = {}, paziresh = {}) {
    const data = fing_data_generator(
        ogrid,
        paziresh,
        ogrid["1723304274312"]["1559086083543"] // emza
    )

    const createContentRavanPart2 = () => `
        <div class="content">
            <div style="font-weight: bold; color: lightblue; text-align: center; direction: ltr; width: 100%; margin-top: 6px;">
                FFT Absolute Power (uV Sq)
            </div>
            ${
                data.ravan_ftt
                    ? `
              <div style="margin: 0 auto; width: 100%; text-align: center; margin-top: 10mm;">
                <img 
                    src="${data.ravan_ftt}" 
                    style="width: 150mm; height: 179mm;" 
                />
              </div>`
                    : ""
            }
            
            ${
                data.p_emza
                    ? `
              <img 
                src="${fileURL}${data.p_emza}" 
                style="width: 35mm; height: 35mm; margin-top: 4px; margin-right: 75mm;" 
              />
              `
                    : ""
            }
            
        </div>
    `

    const createRavanshenasiPart2 = () => `
        ${createHeader("نقشه نگاری مغزی", "1571563709227", "#4CDAEA", data)}
        ${createContentRavanPart2()}
        ${createFoother()}
    `

    const pages = `
        <div class="a4" style="width: 210mm; height: 297mm;">
            ${createPageBesmela()}
        </div>
        <div class="a4" style="width: 210mm; height: 297mm;">
            ${createMenu(data)}
        </div>
        <div class="a4" style="width: 210mm; height: 297mm;">
            ${createRavanshenasiPart2()}
        </div>
    `

    const bodyContent = `
        <div class="mainContent">
            ${pages}
        </div>
    `

    printThis(
        `<style>.menu_khodezhari { right: 13.5mm !important; top: 158mm !important; }</style>${print_styles}`,
        bodyContent
    )
}
