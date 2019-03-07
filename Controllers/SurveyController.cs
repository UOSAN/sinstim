using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Models;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class SurveyController : Controller {

        private readonly SinStimContext context;
        private readonly IUserService userService;
        private readonly ISurveyService surveyService;

        public SurveyController(SinStimContext context, IUserService userService, ISurveyService surveyService) {
            this.context = context;
            this.userService = userService;
            this.surveyService = surveyService;
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartPictureSurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await userService.GetUser(userId);
            if(!IsAllowedToStartPictureSurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.SurveyCompletionCode = Guid.NewGuid();
            userToUpdate.SurveyStartTime = new DateTimeOffset(DateTime.Now);
            userToUpdate.AssignedCategory = surveyService.GetAssignedCategory(userId);

            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to start picture survey.");
            }
            var surveyQuestionNumbers = JArray.FromObject(surveyService.GetSurveyQuestionNumbers(userToUpdate.AssignedCategory));
            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.SURVEY_START_TIME, userToUpdate.SurveyStartTime);
            response.Add(CONSTANTS.REQUEST.ASSIGNED_CATEGORY, userToUpdate.AssignedCategory);
            response.Add(CONSTANTS.REQUEST.SURVEY_QUESTION_NUMBERS, surveyQuestionNumbers);
            return Ok(response);
        }

        // [HttpPost("End")]
        // [ProducesResponseType(200, Type = typeof(JObject))]
        // public async Task<IActionResult> EndPictureSurvey([FromBody] JObject userJson) {
        //     var userToUpdate = await userService.GetUserToUpdate(userJson);
        //     if(userToUpdate == null || userToUpdate.EligibilityStartTime == null) { return BadRequest(); }

        //     userToUpdate.EligibilityEndTime = new DateTimeOffset(DateTime.Now);
        //     var eligibility = getEligibility(userJson);
        //     userToUpdate.Eligibilities.Add(eligibility);

        //     var successful = await userService.UpdateAsync(userToUpdate);
        //     if (!successful) {
        //         return BadRequest("Failed to update survey end time.");
        //     }
        //     var response = new JObject();
        //     response.Add(CONSTANTS.USER.ELIGIBILITY_END_TIME, userToUpdate.EligibilityEndTime);
        //     response.Add(CONSTANTS.USER.ELIGIBILITY_COMPLETION_CODE, userToUpdate.EligibilityCompletionCode);
        //     return Ok(response);
        //     return Ok();
        // }

        private bool IsAllowedToStartPictureSurvey(User user)  {
            return user != null
                && user.EligibilityStartTime != null
                && user.EligibilityEndTime != null
                && user.SurveyStartTime == null;
        }
    }
}
