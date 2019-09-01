using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services;
using SinStim.Services.Entity;
using SinStim.Services.Interfaces;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class SurveyController : Controller {

        private readonly IUserService UserService;
        private readonly ISurveyService SurveyService;
        private readonly IRatingService RatingService;
        private readonly IConfigService ConfigService;

        public SurveyController(IUserService userService, ISurveyService surveyService, IRatingService ratingService, IConfigService configService) {
            this.UserService = userService;
            this.SurveyService = surveyService;
            this.RatingService = ratingService;
            this.ConfigService = configService;
        }

        [HttpGet("User/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(string id) {
            var user = await UserService.GetAsync(id);
            if (user == null) {
                return StatusCode(404);
            }
            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.ID, user.Id);
            response.Add(CONSTANTS.REQUEST.ELIGIBILITY_END_TIME, user.EligibilityEndTime);
            response.Add(CONSTANTS.REQUEST.ELIGIBILITY_START_TIME, user.EligibilityStartTime);
            return Ok(response);
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartPictureSurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await UserService.GetAsync(userId);
            if(!IsAllowedToStartPictureSurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.SurveyCompletionCode = Guid.NewGuid().ToString();
            userToUpdate.SurveyStartTime = new DateTimeOffset(DateTime.Now);
            userToUpdate.AssignedCategory = await SurveyService.GetAssignedCategory(userId);

            var successful = await UserService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to start picture survey.");
            }
            var picturesToRate = await SurveyService.GetPicturesToRate(userToUpdate.AssignedCategory);
            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.SURVEY_START_TIME, userToUpdate.SurveyStartTime);
            response.Add(CONSTANTS.REQUEST.ASSIGNED_CATEGORY, userToUpdate.AssignedCategory);
            response.Add(CONSTANTS.REQUEST.SURVEY_PICTURES_TO_RATE, JArray.FromObject(picturesToRate));
            response.Add(CONSTANTS.REQUEST.PICTURE_HOST, ConfigService.GetPictureHost());
            return Ok(response);
        }

        [HttpPost("Rate")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> RatePicture([FromBody] JObject requestBody) {
            var userId = requestBody.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userNotTracked = await UserService.GetWithNoDemographicsAsync(userId);
            if(!IsAllowedToRatePicture(userNotTracked)) { return StatusCode(401); }

            var desirability = requestBody.GetValue(CONSTANTS.REQUEST.DESIRABILITY).Value<int>();
            var pictureId = requestBody.GetValue(CONSTANTS.REQUEST.PICTURE_ID).Value<string>();
            var recognizability = requestBody.GetValue(CONSTANTS.REQUEST.RECOGNIZABILITY).Value<int>();

            var successful = await RatingService.SaveAsync(userNotTracked.Id, pictureId, desirability, recognizability);
            if (!successful) {
                return BadRequest("Failed to rate picture.");
            }
            return Ok();
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> EndPictureSurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await UserService.GetAsync(userId);
            if(!IsAllowedToEndPictureSurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.SurveyEndTime = new DateTimeOffset(DateTime.Now);

            var successful = await UserService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to end picture survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.SURVEY_END_TIME, userToUpdate.SurveyEndTime);
            response.Add(CONSTANTS.REQUEST.SURVEY_COMPLETION_CODE, userToUpdate.SurveyCompletionCode);
            return Ok(response);
        }

        private bool IsAllowedToStartPictureSurvey(User user)  {
            return user != null
                && IsCompletedEligibilitySurvey(user)
                && user.SurveyStartTime == null;
        }

        private bool IsAllowedToRatePicture(User user)  {
            return user != null
                && IsCompletedEligibilitySurvey(user)
                && user.SurveyStartTime != null;
        }

        private bool IsAllowedToEndPictureSurvey(User user)  {
            return user != null
                && IsCompletedEligibilitySurvey(user)
                && user.SurveyStartTime != null
                && user.SurveyCompletionCode != null
                && user.SurveyEndTime == null;
        }

        private bool IsCompletedEligibilitySurvey(User user) {
            return user.EligibilityStartTime != null
                && user.EligibilityEndTime != null;
        }
    }
}
