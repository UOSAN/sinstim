export default [{
    id: 'd_age',
    text: 'What is your age (in years)?',
    type: 'number',
    answers: [{
        id: 'age',
        value: 18,
        text: 'age'
    }]
}, {
    id: 'd_gender',
    text: 'What is your gender?',
    type: 'radio',
    answers: [{
        id: 'female',
        value: 'Female',
        text: 'Female'
    }, {
        id: 'male',
        value: 'Male',
        text: 'Male'
    }, {
        id: 'other',
        value: 'Other',
        text: 'Other'
    }, {
        id: 'no_response',
        value: 'Prefer not to respond',
        text: 'Prefer not to respond'
    }]
}, {
    id: 'd_race',
    text: 'How would you classify yourself? Check all that apply.',
    type: 'checkbox',
    answers: [{
        id: 'arab',
        value: 'Arab',
        text: 'Arab'
    }, {
        id: 'asian_pacfici_islander',
        value: 'Asian/Pacific Islander',
        text: 'Asian/Pacific Islander'
    }, {
        id: 'black_or_african_american',
        value: 'Black or African American',
        text: 'Black or African American'
    }, {
        id: 'hispanic_or_latino',
        value: 'Hispanic or Latino',
        text: 'Hispanic or Latino'
    }, {
        id: 'indigenous_or_aboriginal',
        value: 'Indigenous or Aboriginal',
        text: 'Indigenous or Aboriginal'
    }, {
        id: 'white_caucasian',
        value: 'White/Caucasian',
        text: 'White/Caucasian'
    }, {
        id: 'other',
        value: 'other',
        text: 'Other'
    }, {
        id: 'no_response',
        value: 'no_response',
        text: 'Prefer not to respond'
    }]
}, {
    id: 'd_education',
    text: 'What is the highest level of school or education you have completed? ',
    type: 'radio',
    answers: [{
        id: 'less_then_high_school',
        value: 'Less than a high school diploma',
        text: 'Less than a high school diploma'
    }, {
        id: 'high_school',
        value: 'High School degree or equivalent',
        text: 'High School degree or equivalent'
    }, {
        id: 'vocational_techinal_school',
        value: 'Vocational/Technical School',
        text: 'Vocational/Technical School'
    }, {
        id: 'some_college',
        value: 'Some college',
        text: 'Some college'
    }, {
        id: 'bachelors_degree',
        value: 'Bachelor’s Degree (BA, BS)',
        text: 'Bachelor’s Degree (BA, BS)'
    }, {
        id: 'masters_degree',
        value: 'Master’s Degree (MA, MS, MEd)',
        text: 'Master’s Degree (MA, MS, MEd)'
    }, {
        id: 'doctorate',
        value: 'Doctorate (PhD, EdD)',
        text: 'Doctorate (PhD, EdD)'
    }, {
        id: 'professional',
        value: 'Professional (JD, MD, DDS, PharmD)',
        text: 'Professional (JD, MD, DDS, PharmD)'
    }, {
        id: 'other',
        value: 'Other',
        text: 'Other'
    }]
}, {
    id: 'd_marital_status',
    text: 'What is your current marital status?',
    type: 'radio',
    answers: [{
        id: 'divorced',
        value: 'Divorced',
        text: 'Divorced'
    }, {
        id: 'living_with_another',
        value: 'Living with another',
        text: 'Living with another'
    }, {
        id: 'married',
        value: 'Married',
        text: 'Married'
    }, {
        id: 'separated',
        value: 'Separated',
        text: 'Separated'
    }, {
        id: 'single',
        value: 'Single',
        text: 'Single'
    }, {
        id: 'widowed',
        value: 'Widowed',
        text: 'Widowed'
    }, {
        id: 'prefer_not_to_respond',
        value: 'Prefer not to respond',
        text: 'Prefer not to respond'
    }]
}];
