import { FaCalendarDays } from "react-icons/fa6"
const Highlight = ({ time, color, description }) => {
    return (
        <div className={`bg-white flex flex-col border-l-4 border-[${color}] w-full p-4`}>
            <span className={`text-[${color}] text-xs`}>{time}</span>
            <p>{description}</p>
        </div>
    );
};
const Highlights = ({ highlights }) => {
    return (
        <div className="">
            <div className="flex gap-1 mb-4">
                <FaCalendarDays />
                <span>Today&apos;s Highlights</span>
            </div>
            <div className="flex gap-2 mt-4 flex-col">
                {highlights.map((highlight, index) => (
                    <Highlight key={index} {...highlight} />
                ))}
            </div>
        </div>
    )
}

export default Highlights