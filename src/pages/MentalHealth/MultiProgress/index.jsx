import styles from "./styles.module.css"
import MultiProgress from "react-multi-progress";
function CalculateAssessment({ generalData, userData, valuesLength,elements }) {
  // const total = (userData.value / valuesLength) * 100
  // محاسبه درصد هر سطح نسبت به مقدار کل
 

   elements = generalData.map((level) => ({
    value: ((level.value.max - level.value.min) /userData.value ) * 100, // محاسبه درصد
    color: level.color,
    
  }));

  return (
    // <div style={{ overflowX: "auto", margin:"auto"}}>
      <MultiProgress   className={styles.customMultiProgress}   transitionTime={0} elements={elements}/>
    // </div>
  );


  // const visualParts = generalData.map((level) => {
  //   const percentage = ((level.value.max - level.value.min) / userData.value) * 100;
  //   console.log(typeof percentage)
  //   return {
  //     percentage: percentage > 100 ? 100 : percentage < 0 ? 0 : percentage, // محدود کردن درصد بین 0 و 100
  //     color: level.color,
  //   };
  // });

  // return (
    
  //     <div className="relative">
  //       <div
  //         className={`rounded h-9 w-full bg-gradient-to-r from-[#86efac] from-0% via-[#16a34a] via-33.3% via-[#FFFF00] via-66.6% to-[#FF0000] to-100%`}
  //       ></div>

  //       <div
  //         className={
  //           "absolute right-0 top-0 bottom-0 overflow-hidden bg-slate-200/100"
  //         }
  //         style={{ width: `${total}%` }}
  //       ></div>
  //     </div>
  
  // )
}
export default CalculateAssessment
