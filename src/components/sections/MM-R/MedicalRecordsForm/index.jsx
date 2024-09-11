import { Controller } from "react-hook-form"
import SDI from "./SelfDeclerationIllness"
import HOD from "./HistoryOfDiseases"
import HOS from "./HistoryOfSurg"
import FHOD from "./FamilyHistoryOfDiseases"
import BF from "./BooleanForms"
import {
    MultiSelectOption,
    RadioButton,
    TextField,
    DateInput,
} from "@/components/elements"
import styles from "./styles.module.css"
import {
    illnesses,
    personalOrFamilyHistoryOfIllness,
    typeOfCancer,
} from "./data"
import dangerousBloodGuideVideo from "@/assets/video/dangerous-blood-guide.mp4"
import { i18n } from "./i18n"

const MedicalRecordsForm = ({
    register,
    errors,
    watch,
    setValue,
    control,
}) => {
    return (
        <div className={styles.container}>
            <strong className={styles.title}>{i18n.medicalRecordsForm}</strong>
            <div className={styles.sections}>
                <SDI
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    watch={watch}
                    control={control}
                />
                <HOD
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    watch={watch}
                    control={control}
                />
                <HOS
                    isError={!!errors["10567"]}
                    register={register}
                    value={watch("10567")}
                />
                <FHOD
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    watch={watch}
                />
                <BF
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    register={register}
                />
            </div>
        </div>
    )
}

export default MedicalRecordsForm
