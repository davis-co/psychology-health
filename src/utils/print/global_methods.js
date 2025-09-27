import { fileURL } from "@/config/config";

export const createCover = (title, icon, color, flag, title2) => {
  const createCoverText =
    `
                <div>
                  <div style="height:200mm;background-color:` +
    color +
    `;">
                    <img src="${fileURL}/LFFO/?fid=` +
    icon +
    `" style="width:50mm;height:50mm;margin-top: 73mm;margin-right: 69mm;">
                  </div>
                  <div style="height:97mm;padding-top: 30mm;text-align:center">
                    ` +
    getBreakLable(flag, title, title2, color) +
    `
                  </div>
                </div>`;
  return createCoverText;
};

export const getBreakLable = (flag, title, title2, color) => {
  let breakLableText = "";
  if (!flag) {
    breakLableText =
      `<span style="font-weight: bold;font-size: 17mm;color:` +
      color +
      `;">` +
      title +
      `</span>`;
  } else {
    breakLableText =
      `
                <span style="font-weight: bold;font-size: 17mm;color:` +
      color +
      `;">` +
      title +
      `</span>;
                <br/>
                <span style="font-weight: bold;font-size: 17mm;color:` +
      color +
      `;">` +
      title2 +
      `</span>`;
  }
  return breakLableText;
};

export const createHeader = (title, icon, color, data) => {
  const headerText =
    `
            <div class="header">
              <div class="nameholder">
                <span class="hoviyati">نام : </span>
                <span class="hoviyati">` +
    data.p_name +
    `</span>
                <br/>
                <span class="hoviyati">نام خانوادگی : </span>
                <span class="hoviyati">` +
    data.p_family +
    `</span>
                <br/>
                <span class="hoviyati">تاریخ پذیرش : </span>
                <span class="hoviyati">` +
    data.p_tarikhe_paziresh +
    `</span>
              </div>
              <div class="titleHolderi" style="width: 114mm;height: 100%;float: left;">
                <div style="width: 12mm;float: right;text-align: left;margin-top: 6mm;">
                  <img src="${fileURL}/LFFO/?fid=` +
    icon +
    `" style="width:100%">
                </div>
                <div style="float:left;width:101mm;font-size: 14pt !important;margin-top: 10mm;">
                  <span style="font-size:14pt;color:` +
    color +
    `">` +
    title +
    ` </span>
                </div>
                <div style="clear:both"></div>
              </div>
              <div style="width: 20mm;margin-top: 3mm;float: left; margin-right: 3mm;">
                <img src="${fileURL}/LFFO/?fid=16605" class="imglogo">
              </div>
              <div style="background-color: #cecdcd;width: 25mm;height: 100%;float: left;"></div>
              <div style="clear:both">
              <hr style="border: 1px solid #cecdcd;"/>
              </div>
            </div>`;
  return headerText;
};

export const createEtelateHoviyati = (data) => {
  const etelateHoviyatiText = `
      <div style="padding-top:90mm">
          <div style="border: 5px solid #F3AF43;;width:133mm;height:114mm;margin:0 auto">
              <div style="width:50mm;height:65mm;border: 1px solid gray;    margin-top: 3mm;float: left;margin-left: 8mm;">
                  <img src=${data.p_aks} style="width:100%;height:100%" />
              </div>
              <div style="height: 64mm;margin-top: 70mm;line-height: 11mm;padding-right: 3mm;">
                  <span>نام و نام خانوادگی : </span>
                  <span>
                      ${data.p_name} ${data.p_family}
                  </span>
                  <br />
                  <span>کد ملی : </span>
                  <span style="font-family:B Nazanin">
                      ${data.p_code_meli}
                  </span>
                  <br />
                  <span>تاریخ تولد : </span>
                  <span style="font-family:B Nazanin">
                      ${data.p_tarikh_tavad}
                  </span>
                  <br />
                  <span>تاریخ پذیرش : </span>
                  <span style="font-family:B Nazanin">
                      ${data.p_tarikhe_paziresh}
                  </span>
              </div>
          </div>
      </div>
  `;
  return etelateHoviyatiText;
};

export const createFoother = () => {
  const footherText = `
            <div class="foother">
              <div  style="float:left;width:123mm;height:100%;background-color:cecdcd">
              </div>
            </div>`;
  return footherText;
};

export const createTitle = (title, icon, color) => {
  const titleText = `
      <div class="titleHolder">
          <div class="imgTitleHolder">
              <img
                  src="${fileURL}/LFFO/?fid=${icon}"
                  class="imgTitle"
              />
          </div>
          <div class="labletitleHolder">
              <span style="font-size:18pt;color:${color}">{title}</span>
          </div>
          <div style="clear:both"></div>
      </div>
  `;
  return titleText;
};

export const createMenu = (data) => {
  //menuIconDispalyNone
  const createMenuText = `
      <div style="position: relative;">
          <img
              src="${fileURL}/LFFO/?fid=1644814981363"
              style="width:100%;height:100%"
          />
          <div class="menu menu_name">
              ${data.p_name} ${data.p_family}
          </div>

          <div class="menu menu_code_meli">${data.p_code_meli}</div>
          <div class="menu menu_tarikhtavalod">${data.p_tarikh_tavad}</div>
          <div class="tick menu_khodezhari">&#10004;</div>
      </div>
  `;
  return createMenuText;
};

export const createPageBesmela = () => {
  const pageBesmelaText = `
      <div class="pageBesamell">
          <div class="holderBesmela">
              <img
                  src="${fileURL}/LFFO/?fid=1571557973075"
                  class="holderBesmelaImg"
              />
          </div>
          <div class="holderLogoBesmela">
              <img
                  src="${fileURL}/LFFO/?fid=16605"
                  class="holderLogoBesmelaImg"
              />
          </div>
      </div>
  `;
  return pageBesmelaText;
};

export const getBarcode = (src) => {
  if (!src) return "#";
  return (
    "https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=" +
    fileURL +
    src
  );
};
