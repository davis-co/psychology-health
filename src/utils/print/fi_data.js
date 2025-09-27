import moment from "jalali-moment";

export const fing_data_generator = (ogrid = {}, paziresh = {}, emza) => {
  const data = {
    p_emza: emza || "",
    p_name: ogrid[4941] ? ogrid[4941] : "",
    p_family: ogrid[4942] ? ogrid[4942] : "",
    p_tarikh_tavad: ogrid[4944] ? ogrid[4944] : "",
    p_jensiyat: ogrid[4946] ? ogrid[4946] : "",
    p_aks: ogrid[6770] ? ogrid[6770] : "",
    p_code_meli: ogrid[6620] ? ogrid[6620] : "",
    p_tarikhe_paziresh: moment(paziresh.tarikh_paziresh)
      .locale("fa")
      .format("YYYY/MM/DD"),
    p_age: ogrid[10453],
    // ravan
    ravanShenasiCon: ogrid[1560917908501] ? ogrid[1560917908501] : "",
    // qeeg
    ravan_ftt: ogrid[1641737196671] ? ogrid[1641737196671] : "",
  };
  return data;
};
