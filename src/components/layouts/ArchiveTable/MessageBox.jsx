export default function MessageBox({ text }) {
    return (
        <div className="flipLeft col-span-full w-full p-2 rounded bg-white-light">
            <p className="w-full px-2 py-4 rounded bg-gray-e4 font-400 text-center text-xs lg:text-base">
                {text}
            </p>
        </div>
    )
}
