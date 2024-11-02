import { tableSizes } from "@/constants/form"
import { useEffect, useState } from "react"
import { Archvie_Table_Columns } from "./data"
import { Table } from "@/components/elements"
import { requestFunction } from "@/services"
import { VscLoading } from "react-icons/vsc"
import { toast } from "react-toastify"

export default function ArchiveTable({ questionKey }) {
    const user = JSON.parse(localStorage.getItem("userData"))
    const [currentPage, setPage] = useState(1)
    const [tableSize, setTableSize] = useState(tableSizes[0].value)
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getArchive()
    }, [])

    const getArchive = async () => {
        const formData = {
            jobId: 164,
            dataInfo: {
                limit: tableSize,
                offset: tableSize * (currentPage - 1),
                bc: BC,
                oid: questionKey,
                // id: 1699088448641,
            },
            page: currentPage,
            pageSize: tableSize,
        }
        setLoading(true)
        await requestFunction(formData)
            .then((res) => setTableData(res.data))
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false))
    }
    return tableData?.length ? (
        <Table
            rows={tableData}
            // rows={[[]]}
            stripe
            columns={Archvie_Table_Columns}
            pagination={true}
            currentPage={currentPage}
            setPage={setPage}
            tableSize={tableSize}
            tableSizes={tableSizes}
            setTableSize={setTableSize}
        />
    ) : (
        <div className="w-[350px] h-[100px] flex justify-center items-center">
            {loading ? (
                <VscLoading
                    className="text-2xl text-green animate-spin"
                    color="#000"
                />
            ) : (
                <p className="text-title">آرشیو خالی است.</p>
            )}
        </div>
    )
}
