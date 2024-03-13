import Link from "next/link"
const Breadcrumbs = ({ items }) => {
    return (
        <ul className="flex gap-3 text-sm text-[#26BADA] mb-4">
             {items.map((item, index) => (
                <li key={index} className="first-letter:relative group">
                    <Link href={item.href} className={item?.inactiveClass }  >
                        {item.label}
                    </Link>
                    {index < items.length - 1 && <span className="after:content-['>'] after:ml-2 "></span>}
                </li>
            ))}
        </ul>
    )
}

export default Breadcrumbs