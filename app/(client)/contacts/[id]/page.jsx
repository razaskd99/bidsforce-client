import Image from "next/image";

export default async function ContactDetail() {
    const recentActivity = [
        {stage: "Cost estimation",date: "28 February",type: "meeting",company: "DRP Refinery"},
        { stage: "System Architecture", date: "1 March", type: "meeting", company: "DRP Refinery"},
        { stage: "Bid Kick-Off Meeting", date: "2 March", type: "meeting", company: null},
        { stage: "Marked Tasks Done", date: "8 March", type: "meeting",company: "DRP Refinery"},
        { stage: "New incoming request", date: "13 March", type: "meeting", company: null},
        { stage: "Bid completed", date: "16 March", stype: "meeting", company: "DRP Refinery"},
        { stage: "Marked Tasks Done", date: "20 March", type: "meeting", company: null}
      ];
      
      
    return (
        <div className="flex flex-col md:flex-row gap-4 bg-[#E8ECEF] rounded-md">
            <div className="bg-white p-5 w-1/4">
                <Image src="/man.jpeg" alt="man" width={120} height={120} className="rounded-full" />
                <p className="text-xl">Bryan C</p>
                <p className="text-[#778CA2]">Solution Architect</p>
                <p className="text-sm text-[#778CA2] mt-3">Company</p>
                <p className="text-lg">i6technologies</p>
                <p className="text-sm text-[#778CA2] mt-3">Manager</p>
                <p>Marvin Lambert</p>
                <p className="text-sm text-[#778CA2] mt-3">Functional Group</p>
                <p>Bids and Proposals</p>
                <p className="text-sm text-[#778CA2] mt-3">Contact #</p> 
                <p>61-3996-399</p>
                <p className="text-sm text-[#778CA2] mt-3">Team</p> 
                <p>Automation Bids</p>
                <p className="text-sm text-[#778CA2] mt-3">Work Location</p> 
                <p>Brisbane, Australia</p>
                <p className="text-sm text-[#778CA2] mt-3">Time Zone</p> 
                <p>GMT +10</p>
                <p className="text-sm text-[#778CA2] mt-3">Email Address</p> 
                <p>John.smith@galaxypetro.com</p>
                <p className="text-sm text-[#778CA2] mt-3">Working Hours</p> 
                <p>7AM - 4PM</p>
            </div>
            <div className="bg-white rounde-md p-5 w-1/2">
                <h2>Recent Activity</h2>
                {recentActivity.map((activity)=>(
                    <div className="text-[#778CA2] my-3"><span>{activity.type}</span> <span>{activity.date}</span> <span className="text-black">{activity.stage}</span> for <span>{activity.company}</span></div>
                ))}
            </div>
            <div className="bg-gray-400 p-4 w-1/4">Column 3</div>
        </div>
    )
}
