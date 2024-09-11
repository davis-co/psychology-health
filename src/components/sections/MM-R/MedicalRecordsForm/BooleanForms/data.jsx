import BDGuide from "./BloodDangerousGuide"
import { i18n } from "./i18n"
import SDGuide from "./SexualDangerousGuide"

export const formItems = [
    {
        label: i18n.historyOfAbortion,
        key: "10481",
    },
    {
        label: i18n.womenHistoryOfHormoneTherapy,
        key: "10572",
    },
    {
        label: i18n.historyOfGivingBirthToMoreThan4KgBaby,
        key: "10482",
    },
    {
        label: i18n.historyOfStillBirth,
        key: "10483",
    },
    {
        label: i18n.historyOfSexualDangerousActions,
        key: "10666",
        userGuide: <SDGuide />,
    },
    {
        label: i18n.historyOfBloodDangerousActions,
        key: "10613",
        userGuide: <BDGuide />
    },
    // {
    //     label: i18n.historyOfSurgery,
    //     key: "1562152965099",
    // },
]
