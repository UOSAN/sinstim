using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Entity;
using SinStim.Services.Interfaces;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class SurveyController : Controller {

        private readonly IUserService UserService;
        private readonly ISurveyService SurveyService;
        private readonly IRatingService RatingService;
        private readonly IConfigService ConfigService;
        private readonly ILogger<SurveyController> Logger;

        public SurveyController(IUserService userService, ISurveyService surveyService, IRatingService ratingService, IConfigService configService, ILogger<SurveyController> logger) {
            this.UserService = userService;
            this.SurveyService = surveyService;
            this.RatingService = ratingService;
            this.ConfigService = configService;
            this.Logger = logger;
        }

        [HttpGet("User/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(string id) {
            var response = new JObject();
            try {
                var user = await UserService.GetWithNoDemographicsAsync(id);
                if (user == null) {
                    var retryResponse = new JObject();
                    retryResponse.Add("shouldRetry", true);
                    return StatusCode(404, retryResponse);
                }
                response.Add(CONSTANTS.REQUEST.ID, user.Id);
                response.Add(CONSTANTS.REQUEST.ELIGIBILITY_END_TIME, user.EligibilityEndTime);
                response.Add(CONSTANTS.REQUEST.ELIGIBILITY_START_TIME, user.EligibilityStartTime);
            } catch (Exception e) {
                Logger.LogError(e, "{0} GetUser call: {1} {2}", Environment.NewLine, id, Environment.NewLine);
                return StatusCode(500, "Failed to find the user.");
            }
            return Ok(response);
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartPictureSurvey([FromBody] JObject userJson) {
            var response = new JObject();
            try {
                var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
                var userToUpdate = await UserService.GetWithNoDemographicsAsync(userId);
                if (!IsAllowedToStartPictureSurvey(userToUpdate)) { return StatusCode(401); }

                userToUpdate.SurveyCompletionCode = Guid.NewGuid().ToString();
                userToUpdate.SurveyStartTime = new DateTimeOffset(DateTime.Now);
                userToUpdate.AssignedCategory = await SurveyService.GetAssignedCategory(userId);

                var successful = await UserService.UpdateSurveyStartUserAsync(userToUpdate);
                if (!successful) {
                    var retryResponse = new JObject();
                    retryResponse.Add("shouldRetry", true);
                    retryResponse.Add("message", "Failed to update user while starting picture survey.");
                    return StatusCode(500, retryResponse);
                }

                List<PictureToRate> picturesToRate = null;
                try {
                    picturesToRate = await SurveyService.GetPicturesToRateRaw(userToUpdate.AssignedCategory);
                } catch (Exception e) {
                    Logger.LogError(e, "{0} GetPicturesToRateRaw call: {1} {2}", Environment.NewLine, userJson.ToString(), Environment.NewLine);
                    return StatusCode(500, "Failed to get pictures to rate.");
                }

                response.Add(CONSTANTS.REQUEST.SURVEY_START_TIME, userToUpdate.SurveyStartTime);
                response.Add(CONSTANTS.REQUEST.ASSIGNED_CATEGORY, userToUpdate.AssignedCategory);
                response.Add(CONSTANTS.REQUEST.SURVEY_PICTURES_TO_RATE, JArray.FromObject(picturesToRate));
                response.Add(CONSTANTS.REQUEST.PICTURE_HOST, ConfigService.GetPictureHost());
            } catch (Exception e) {
                Logger.LogError(e, "{0} StartPictureSurvey call: {1} {2}", Environment.NewLine, userJson.ToString(), Environment.NewLine);
                return StatusCode(500, "Failed to start picture survey.");
            }
            return Ok(response);
        }

        [HttpPost("Rate")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> RatePicture([FromBody] JObject requestBody) {
            var response = new JObject();
            try {
                var userId = requestBody.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
                Logger.LogDebug("{0} Attempting To Rate a Picture", userId);

                var userNotTracked = await UserService.GetWithNoDemographicsAsync(userId);
                if (!IsAllowedToRatePicture(userNotTracked)) { return StatusCode(401); }

                var desirability = requestBody.GetValue(CONSTANTS.REQUEST.DESIRABILITY).Value<int>();
                var pictureId = requestBody.GetValue(CONSTANTS.REQUEST.PICTURE_ID).Value<string>();
                var recognizability = requestBody.GetValue(CONSTANTS.REQUEST.RECOGNIZABILITY).Value<int>();

                var successful = await RatingService.SaveAsync(userNotTracked.Id, pictureId, desirability, recognizability);
                if (!successful) {
                    var retryResponse = new JObject();
                    retryResponse.Add("shouldRetry", true);
                    retryResponse.Add("message", "Failed to save picture rating.");
                    return StatusCode(500, retryResponse);
                }
            } catch (Exception e) {
                Logger.LogError(e, "{0} RatePicture call: {1} {2}", Environment.NewLine, requestBody.ToString(), Environment.NewLine);
                return StatusCode(500, "Failed to rate picture.");
            }
            return Ok();
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> EndPictureSurvey([FromBody] JObject userJson) {
            var response = new JObject();
            try {
                var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
                var userToUpdate = await UserService.GetWithNoDemographicsAsync(userId);
                if (!IsAllowedToEndPictureSurvey(userToUpdate)) { return StatusCode(401); }

                userToUpdate.SurveyEndTime = new DateTimeOffset(DateTime.Now);

                var successful = await UserService.UpdateSurveyEndUserAsync(userToUpdate);
                if (!successful) {
                    var retryResponse = new JObject();
                    retryResponse.Add("shouldRetry", true);
                    retryResponse.Add("message", "Failed to end picture survey.");
                    return StatusCode(500, retryResponse);
                }

                response.Add(CONSTANTS.REQUEST.SURVEY_END_TIME, userToUpdate.SurveyEndTime);
                response.Add(CONSTANTS.REQUEST.SURVEY_COMPLETION_CODE, userToUpdate.SurveyCompletionCode);
            } catch (Exception e) {
                Logger.LogError(e, "{0} EndPictureSurvey call: {1} {2}", Environment.NewLine, userJson.ToString(), Environment.NewLine);
                return StatusCode(500, "Failed to end the picture survey.");
            }
            return Ok(response);
        }

        [HttpPost("Reject")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> RejectUser([FromQuery] string id) {
            var response = new JObject();
            Logger.LogDebug("Rejecting {0}", id);
            try {
                var user = await UserService.GetAsync(id);
                if (!IsAllowedToBeRejected(user)) { return StatusCode(401); }

                user.IsRejected = true;
                var successful = await UserService.UpdateAsync(user);
                if (!successful) {
                    var retryResponse = new JObject();
                    retryResponse.Add("shouldRetry", true);
                    return StatusCode(500, retryResponse);
                }
            } catch (Exception e) {
                Logger.LogError(e, "{0} Failed to reject User: {1} {2}", Environment.NewLine, id, Environment.NewLine);
                return StatusCode(500, "Failed to reject user.");
            }
            return Ok();
        }

        private bool IsAllowedToStartPictureSurvey(User user) {
            return user != null
                && IsCompletedEligibilitySurvey(user)
                && user.SurveyStartTime == null;
        }

        private bool IsAllowedToRatePicture(User user) {
            return user != null
                && IsCompletedEligibilitySurvey(user)
                && user.SurveyStartTime != null;
        }

        private bool IsAllowedToEndPictureSurvey(User user) {
            return user != null
                && IsCompletedEligibilitySurvey(user)
                && user.SurveyStartTime != null
                && user.SurveyCompletionCode != null
                && user.SurveyEndTime == null;
        }

        private bool IsAllowedToBeRejected(User user) {
            return user != null && IsCompletedEligibilitySurvey(user);
        }

        private bool IsCompletedEligibilitySurvey(User user) {
            return user.EligibilityStartTime != null
                && user.EligibilityEndTime != null;
        }
    }
}
