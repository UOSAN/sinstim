// headers = [
//     { label: "First Name", key: "firstname" },
//     { label: "Last Name", key: "lastname" },
//     { label: "Email", key: "email" }
// ];

// data = [
//     { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//     { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//     { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
// ];

function processCompletionReportData(completionData) {
    return {
        data: completionData,
        headers: [{
            label: 'mTurk Id',
            key: 'id'
        }, {
            label: 'Completion Code',
            key: 'eligibilityCompletionCode'
        }]
    };
}

function processEligibilityReportData(eligibilityData) {
    return {
        data: eligibilityData,
        headers: [{
            label: 'mTurk Id',
            key: 'id'
        }]
    };
}

export default {
    processCompletionReportData,
    processEligibilityReportData
};
