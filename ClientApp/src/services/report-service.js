import _reduce from 'lodash/reduce';
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

function getMainReportData(data, headerName) {
    const tempReportData = data.reduce((desirabilityReportData, value) => {
        if (!desirabilityReportData[value.fileName]) {
            desirabilityReportData[value.fileName] = [];
        }
        desirabilityReportData[value.fileName].push(value[headerName]);
        return desirabilityReportData;
    }, {});

    const mostRatingsNumber = _reduce(tempReportData, (result, ratingsArray) => {
        if (ratingsArray.length >= result) {
            return ratingsArray.length;
        }
        return result;
    }, 0);

    const reportData = _reduce(tempReportData, (results, ratings, fileName) => {
        const temp = {};

        temp.fileName = fileName;
        ratings.forEach((rating, desireIndex) => {
            temp[`${headerName}-${desireIndex}`] = rating;
        });
        results.push(temp);
        return results;
    }, []);

    const fileNameHeader = ['fileName'];
    const desireHeaders = Array(mostRatingsNumber).fill(0).map((value, index) => `${headerName}-${index}`);
    const headers = fileNameHeader.concat(desireHeaders);

    return {
        data: reportData,
        headers
    };
}

function processDesirabilityReportData(desirabilityData) {
    return getMainReportData(desirabilityData, 'desirability');
}

function processRecognizabilityReportData(recognizabilityData) {
    return getMainReportData(recognizabilityData, 'recognizability');
}

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
        }, {
            label: 'alcohol',
            key: 'alcohol'
        }, {
            label: 'chocolate',
            key: 'chocolate'
        }, {
            label: 'cocaine',
            key: 'cocaine'
        }, {
            label: 'cookies',
            key: 'cookies'
        }, {
            label: 'donuts',
            key: 'donuts'
        }, {
            label: 'fries',
            key: 'fries'
        }, {
            label: 'heroin',
            key: 'heroin'
        }, {
            label: 'icecream',
            key: 'icecream'
        }, {
            label: 'marijuana',
            key: 'marijuana'
        }, {
            label: 'methamphetamine',
            key: 'methamphetamine'
        }, {
            label: 'pasta',
            key: 'pasta'
        }, {
            label: 'pills',
            key: 'pills'
        }, {
            label: 'pizza',
            key: 'pizza'
        }, {
            label: 'tobacco',
            key: 'tobacco'
        }]
    };
}

function processProgressReportData(progressData) {
    return {
        data: progressData,
        headers: [{
            label: 'Category',
            key: 'category'
        }, {
            label: 'Total Pictures in Category',
            key: 'totalPictures'
        }, {
            label: 'Finished Pictures',
            key: 'finishedPictureCount'
        }, {
            label: 'Percent Complete',
            key: 'percentComplete'
        }]
    };
}

function processSurveyCompletionReportData(completionData) {
    return {
        data: completionData,
        headers: [{
            label: 'mTurk Id',
            key: 'id'
        }, {
            label: 'Completion Code',
            key: 'surveyCompletionCode'
        }]
    };
}

export default {
    processDesirabilityReportData,
    processEligibilityCompletionReportData,
    processInvitationReportData,
    processProgressReportData,
    processRecognizabilityReportData,
    processSurveyCompletionReportData
};
