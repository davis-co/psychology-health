import styles from "./styles.module.css"
function CalculateAssessment({ generalData, userData, valuesLength }) {
  const total = (userData.value / valuesLength) * 100

  return (
    
      <div className="relative">
        <div
          className={`rounded h-9 w-full bg-gradient-to-r from-[#86efac] from-0% via-[#16a34a] via-33.3% via-[#FFFF00] via-66.6% to-[#FF0000] to-100%`}
        ></div>

        <div
          className={
            "absolute right-0 top-0 bottom-0 overflow-hidden bg-slate-200/100"
          }
          style={{ left: `${total}%` }}
        ></div>
      </div>
  
  )
}
export default CalculateAssessment
