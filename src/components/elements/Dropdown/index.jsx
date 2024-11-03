import { useState } from 'react';

import classNames from 'classnames';
import { IoChevronDownOutline } from 'react-icons/io5';

export default function Dropdown({ label, value, options, onChange }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div
            className="flex items-center gap-2 select-none relative bg-white rounded px-2 py-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex items-center gap-1">
                <span className="text-2xs lg:text-xs">{label}</span>
                <span className="text-2xs lg:text-xs">{value}</span>
            </div>
            <IoChevronDownOutline
                className={classNames(
                    "transition-all text-2xs lg:text-sm",
                    isOpen ? "rotate-180" : ""
                )}
            />
            <ul
                className={classNames(
                    "w-full left-0  right-auto absolute -bottom-1 translate-y-full transition-all mt-2 divide-y divide-gray-200 bg-white shadow-box rounded overflow-hidden z-50",
                    isOpen ? "py-2" : "h-0"
                )}
            >
                {options.map((item) => (
                    <li
                        key={item.label}
                        className="py-2 text-xs hover:bg-white-light px-3"
                        onClick={() => onChange(item.value)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}
