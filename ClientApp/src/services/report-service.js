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

function processEligibilityCompletionReportData(completionData) {
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

function processInvitationReportData(invitationData) {
    return {
        data: invitationData,
        headers: [{
            label: 'mTurk Id',
            key: 'id'
        }]
    };
}

function processProgressReportData(progressData) {
    return {
        data: progressData,
        headers: [{
            label: 'mTurk Id',
            key: 'id'
        }]
    };
}

function processSurveyCompletionReportData(completionData) {
    return {
        data: completionData,
        headers: [{
            label: 'mTurk Id',
            key: 'id'
        }]
    };
}

export default {
    processEligibilityCompletionReportData,
    processInvitationReportData,
    processProgressReportData,
    processSurveyCompletionReportData
};
