'use strict';
     
// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}
 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const nameOfPerson = slots.nameOfPerson;
    const isStudent = slots.isStudent.toLowerCase();
    const degree=slots.degree;
    const course=slots.course;
    const collegeName=slots.collegeName;
    const position=slots.position;
    const companyName=slots.companyName;
    const hadPastExperience=slots.hadPastExperience.toLowerCase();
    const roles=slots.roles;
    const companies=slots.companies;
    const resumeLink=slots.resumeLink;
    const jobIdOrjobLink=slots.jobIdOrjobLink;
    const yourName=slots.yourName; 
    
   if(isStudent=="yes" && hadPastExperience=="yes"){
   callback(close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': `Hello ${nameOfPerson}, Hope you are doing well.
   I am a ${course} student pursuing ${degree} in ${collegeName}.
   I wish to propose my candidacy for ${position} at ${companyName}.
   I love improving systems and want to apply my learnings into real world applications.I have been an ${roles} with ${companies} respectively.
   Here's my resume.
   Resume Link: ${resumeLink}. If you find me a deserving candidate, I would be glad to be referred for ${jobIdOrjobLink} at ${companyName} and implement the propesed improvements.
   Hoping to hear from you soon.
   Warm Regards
   ${yourName}`
       
   })); 
   }
   else if(isStudent=="yes" && hadPastExperience=="no"){
   callback(close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': `Hello ${nameOfPerson}, Hope you are doing well.
   I am a ${course} student pursuing ${degree} in ${collegeName}.
   I wish to propose my candidacy for ${position} at ${companyName}.
   I love improving systems and want to apply my learnings into real world applications.
   Here's my resume.
   Resume Link: ${resumeLink}. If you find me a deserving candidate, I would be glad to be referred for ${jobIdOrjobLink} at ${companyName} and implement the propesed improvements.
   Hoping to hear from you soon.
   Warm Regards
   ${yourName}`
       
   })); 
   }
   
   else if(isStudent=="no" ){
   callback(close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': `Hello ${nameOfPerson}, Hope you are doing well.
   I had worked as ${roles} with ${companies} respectively.
   I completed my graduation in ${course} from ${collegeName}.
   I wish to propose my candidacy for ${position} at ${companyName}.
   I love improving systems and want to apply my learnings into real world applications.
   Here's my resume.
   Resume Link: ${resumeLink}. If you find me a deserving candidate, I would be glad to be referred for ${jobIdOrjobLink} at ${companyName} and implement the propesed improvements.
   Hoping to hear from you soon.
   Warm Regards
   ${yourName}`
       
   })); 
   }
    
}
// --------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
