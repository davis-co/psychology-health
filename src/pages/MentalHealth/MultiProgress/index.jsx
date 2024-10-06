import MultiProgress from 'react-multi-progress';

import styles from './styles.module.css';

function CalculateAssessment({ generalData, userData, valuesLength,elements }) {

   elements = generalData.map((level) => ({
    value: ((level.value.max - level.value.min) /userData.value ) * 100, // محاسبه درصد
    color: level.color,
    
  }));

  return (
      <MultiProgress className={styles.customMultiProgress}   transitionTime={0} elements={elements}/>
  );


  
}
export default CalculateAssessment
