import { illnesses } from "@/pages/MM-R/MedicalRecordsForm/data"
import {
    Button,
    DateInput,
    Divider,
    Navbar,
    Radio,
    TextField,
    CheckBox,
    Select,
    Table,
} from ".."
import { BurgerIcon } from "@/assets/icons"
import { medicineTableColumns } from "@/pages/MM-R/MedicineRecordsForm/data"
import Pagination from "../Pagination"
export const elements = [
    {
        name: "Button",
        list: [
            {
                type: "variant",
                element: <Button title="ذخیره اطلاعات" style="variant" />,
            },
            {
                type: "outlined",
                element: <Button title="ذخیره اطلاعات" style="outlined" />,
            },
            {
                type: "disabled",
                element: <Button title="ذخیره اطلاعات" style="disabled" />,
            },
            {
                type: "text",
                element: <Button title="ذخیره اطلاعات" style="text" />,
            },
            {
                type: "loading",
                element: (
                    <Button
                        title="ذخیره اطلاعات"
                        style="disabled"
                        loading={true}
                    />
                ),
            },
            {
                type: "icon",
                element: (
                    <Button
                        style="outlined"
                        icon={
                            <img
                                src={BurgerIcon}
                                alt="burger"
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        }
                    />
                ),
            },
            {
                type: "with icon",
                element: (
                    <Button
                        title="ذخیره اطلاعات"
                        style="variant"
                        icon={
                            <img
                                src={BurgerIcon}
                                alt="burger"
                                style={{
                                    width: 18,
                                    height: 18,
                                }}
                            />
                        }
                    />
                ),
            },
        ],
    },
    {
        name: "Text Field",
        list: [
            {
                type: "placeholder",
                element: (
                    <TextField
                        placeholder={
                            "سایر بیماری ها را نام ببرید (اظهار فرد) را وارد کنید"
                        }
                        label={"سایر بیماری ها را نام ببرید (اظهار فرد)"}
                    />
                ),
            },
            {
                type: "with value",
                element: (
                    <TextField
                        value={"سرماخوردگی"}
                        label={"سایر بیماری ها را نام ببرید (اظهار فرد)"}
                    />
                ),
            },
            {
                type: "multiline",
                element: (
                    <TextField
                        value={"سرماخوردگی"}
                        rows={4}
                        label={"سایر بیماری ها را نام ببرید (اظهار فرد)"}
                    />
                ),
            },
            {
                type: "disabled",
                element: (
                    <TextField
                        disabled={true}
                        value={"سرماخوردگی"}
                        rows={4}
                        label={"سایر بیماری ها را نام ببرید (اظهار فرد)"}
                    />
                ),
            },
            {
                type: "error",
                element: (
                    <TextField
                        isError={true}
                        value={"سرماخوردگی"}
                        rows={4}
                        label={"سایر بیماری ها را نام ببرید (اظهار فرد)"}
                    />
                ),
            },
        ],
    },
    {
        name: "Divider",
        list: [
            {
                type: "default",
                element: <Divider />,
            },
        ],
    },
    {
        name: "Radio",
        list: [
            {
                type: "default",
                element: <Radio label={"بله"} checked={false} />,
            },
            {
                type: "checked",
                element: <Radio label={"خیر"} checked={true} />,
            },
            {
                type: "disabled",
                element: <Radio label={"خیر"} checked={true} disabled={true} />,
            },
        ],
    },
    {
        name: "CheckBox",
        list: [
            {
                type: "default",
                element: <CheckBox label={"بله"} checked={false} />,
            },
            {
                type: "checked",
                element: <CheckBox label={"خیر"} checked={true} />,
            },
            {
                type: "disabled",
                element: (
                    <CheckBox label={"خیر"} checked={true} disabled={true} />
                ),
            },
        ],
    },
    {
        name: "Select",
        list: [
            {
                type: "default",
                element: (
                    <Select
                        label={"حالت ساده"}
                        multi={true}
                        required={true}
                        selectedOptions={["سایر", "سرطان ها"]}
                        options={illnesses}
                        modalLabel={"بیماری ها"}
                        // className={styles.cancersSelectionBox}
                    />
                ),
            },
        ],
    },
    {
        name: "Table",
        list: [
            {
                type: "default",
                element: (
                    <Table
                        columns={medicineTableColumns}
                        className={"w-[1000px]"}
                    />
                ),
            },
        ],
    },
    {
        name: "Pagination",
        list: [
            {
                type: "default",
                element: (
                    <Pagination page={4}>
                        <Button title="ذخیره اطلاعات" style="variant" />
                    </Pagination>
                ),
            },
        ],
    },
    // {
    //     name: "Date Input",
    //     list: [
    //         {
    //             type: "default",
    //             element: <DateInput />,
    //         },
    //     ],
    // },
]
