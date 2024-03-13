// Import necessary libraries and components
import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

const CalendarTimeline = () => {
    // Example data for the timeline
    const timelineData = [
        {
            id: 1,
            group: 'RFX Issued',
            title: 'RFX Issued',
            start_time: new Date(2024, 0, 1),
            end_time: new Date(2024, 0, 5),
        },
        {
            id: 2,
            group: 'Prelim. Review',
            title: 'Prelim. Review',
            start_time: new Date(2024, 0, 5),
            end_time: new Date(2024, 0, 10),
        },
        {
            id: 3,
            group: 'Bid Setup',
            title: 'Bid Setup',
            start_time: new Date(2024, 0, 10),
            end_time: new Date(2024, 0, 15),
        },
        {
            id: 4,
            group: 'Detailed Review',
            title: 'Detailed Review',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        {
            id: 5,
            group: 'Bid Prepration',
            title: 'Bid Prepration',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        {
            id: 6,
            group: 'Final Approval',
            title: 'Final Approval',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        {
            id: 7,
            group: 'Submission',
            title: 'Submission',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        {
            id: 6,
            group: 'Clarifications',
            title: 'Clarifications',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        {
            id: 6,
            group: 'Bids Clarification',
            title: 'Bids Clarification',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        {
            id: 6,
            group: 'Order',
            title: 'Order',
            start_time: new Date(2024, 0, 15),
            end_time: new Date(2024, 0, 20),
        },
        // Add similar entries for other stages
    ];

    // Example groups for the timeline
    const timelineGroups = [
        { id: 'RFX Issued', title: 'RFX Issued' },
        { id: 'Prelim. Review', title: 'Prelim. Review' },
        { id: 'Bid Setup', title: 'Bid Setup' },
        { id: 'Detailed Review', title: 'Detailed Review' },
        { id: 'Bid Prepration', title: 'Bid Prepration' },
        { id: 'Final Approval', title: 'Final Approval' },
        { id: 'Submission', title: 'Submission' },
        { id: 'Clarifications', title: 'Clarifications' },
        { id: 'Order', title: 'Order' },
    ];

    return (
        <Timeline
            groups={timelineGroups}
            items={timelineData}
            defaultTimeStart={new Date(2024, 0, 1)}
            defaultTimeEnd={new Date(2024, 0, 15)}
            sidebarContent={<div>Additional Information</div>}
        />
    );
};

export default CalendarTimeline;
