using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Entity;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class EligibilityController : Controller {

        private readonly IUserService UserService;

        public EligibilityController(IUserService userService) {
            this.UserService = userService;
        }

        [HttpPost("User/Save")]
        [ProducesResponseType(200)]
        public async Task<IActionResult> SaveUser([FromBody] JObject newUser) {
            var newUserId = newUser.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var successful = await UserService.SaveAsync(newUserId);
            if (!successful) {
                return BadRequest("Failed to save user.");
            }
            return Ok();
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartEligibilitySurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await UserService.GetAsync(userId);
            if(!isAllowedToStartEligibilitySurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.EligibilityCompletionCode = Guid.NewGuid().ToString();
            userToUpdate.EligibilityStartTime = new DateTimeOffset(DateTime.Now);

            var successful = await UserService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to start eligibility survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.ELIGIBILITY_START_TIME, userToUpdate.EligibilityStartTime);
            return Ok(response);
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> EndEligibilitySurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await UserService.GetAsync(userId);
            if(!isAllowedToEndEligibilitySurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.EligibilityEndTime = new DateTimeOffset(DateTime.Now);
            userToUpdate.Eligibility = getEligibility(userJson);

            var successful = await UserService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to end eligibility survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.ELIGIBILITY_END_TIME, userToUpdate.EligibilityEndTime);
            response.Add(CONSTANTS.REQUEST.ELIGIBILITY_COMPLETION_CODE, userToUpdate.EligibilityCompletionCode);
            return Ok(response);
        }

        [HttpPost("Demographics/Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartDemographicsSurvey([FromBody] JObject demographicsJson) {
            var userId = demographicsJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await UserService.GetAsync(userId);
            if(!isAllowedToStartDemographicsSurvey(userToUpdate)) { return StatusCode(401); }

            var demographics = new Demographics();
            demographics.Id = Guid.NewGuid().ToString();
            demographics.UserId = userId;
            demographics.StartTime = new DateTimeOffset(DateTime.Now);
            userToUpdate.Demographics = demographics;

            var successful = await UserService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to start demographics survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.DEMOGRAPHICS_START_TIME, userToUpdate.Demographics.StartTime);
            return Ok(response);
        }

        [HttpPost("Demographics/End")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> EndDemographicsSurvey([FromBody] JObject demographicsJson) {
            var userId = demographicsJson.GetValue(CONSTANTS.REQUEST.ID).Value<string>();
            var userToUpdate = await UserService.GetAsync(userId);
            if(!isAllowedToEndDemographicsSurvey(userToUpdate)) { return StatusCode(401); }

            updateDemographicsWithAnswers(userToUpdate.Demographics, demographicsJson);

            var successful = await UserService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to end demographics survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.REQUEST.DEMOGRAPHICS_END_TIME, userToUpdate.Demographics.EndTime);
            return Ok(response);
        }

        private bool isAllowedToStartDemographicsSurvey(User user) {
            return user != null && user.Demographics == null;
        }

        private bool isAllowedToEndDemographicsSurvey(User user) {
            return user != null
            && user.Demographics.StartTime != null
            && user.Demographics.EndTime == null;
        }
        private bool isAllowedToStartEligibilitySurvey(User user) {
            return user != null
                && user.EligibilityStartTime == null
                && user.Demographics.StartTime != null
                && user.Demographics.EndTime != null;
        }

        private bool isAllowedToEndEligibilitySurvey(User user) {
            return user != null
                && user.EligibilityStartTime != null
                && user.EligibilityCompletionCode != null
                && user.EligibilityEndTime == null;
        }

        private void updateDemographicsWithAnswers(Demographics demographics, JObject requestBody) {
            demographics.EndTime = new DateTimeOffset(DateTime.Now);
            var answers = requestBody.GetValue(CONSTANTS.DEMOGRAPHICS.ANSWERS).Value<JObject>();
            demographics.Age = answers.GetValue(CONSTANTS.DEMOGRAPHICS.AGE).Value<int>();
            demographics.Gender = answers.GetValue(CONSTANTS.DEMOGRAPHICS.GENDER).Value<string>();
            demographics.Race_Arab = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_ARAB).Value<string>();
            demographics.Race_Asian_PacificIslander = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_ASIAN_PACIFIC_ISLANDER).Value<string>();
            demographics.Race_Black_AfricanAmerican = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_BLACK_AFRICAN_AMERICAN).Value<string>();
            demographics.Race_Hispanic_Latino = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_HISPANIC_LATINO).Value<string>();
            demographics.Race_Indigenous_Aboriginal = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_INDIGENOUS_ABORIGINAL).Value<string>();
            demographics.Race_White_Caucasian = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_WHITE_CAUCASION).Value<string>();
            demographics.Race_Other = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_OTHER).Value<string>();
            demographics.Race_NoReponse = answers.GetValue(CONSTANTS.DEMOGRAPHICS.RACE_NO_RESPONSE).Value<string>();
            demographics.Education = answers.GetValue(CONSTANTS.DEMOGRAPHICS.EDUCATION).Value<string>();
            demographics.MartialStatus = answers.GetValue(CONSTANTS.DEMOGRAPHICS.MARTIAL_STATUS).Value<string>();
        }

        private Eligibility getEligibility(JObject requestBody) {
            var eligibility = new Eligibility();
            eligibility.Id = Guid.NewGuid().ToString();
            eligibility.UserId = requestBody.GetValue(CONSTANTS.REQUEST.ID).Value<string>();

            var answers = requestBody.GetValue(CONSTANTS.ELIGIBILITY.ANSWERS).Value<JObject>();
            eligibility.Alcohol = answers.GetValue(CONSTANTS.ELIGIBILITY.ALCOHOL).Value<bool?>();
            eligibility.Chocolate = answers.GetValue(CONSTANTS.ELIGIBILITY.CHOCOLATE).Value<bool?>();
            eligibility.Cocaine = answers.GetValue(CONSTANTS.ELIGIBILITY.COCAINE).Value<bool?>();
            eligibility.Cookies = answers.GetValue(CONSTANTS.ELIGIBILITY.COOKIES).Value<bool?>();
            eligibility.Donuts = answers.GetValue(CONSTANTS.ELIGIBILITY.DONUTS).Value<bool?>();
            eligibility.Fries = answers.GetValue(CONSTANTS.ELIGIBILITY.FRIES).Value<bool?>();
            eligibility.Heroin = answers.GetValue(CONSTANTS.ELIGIBILITY.HEROIN).Value<bool?>();
            eligibility.IceCream = answers.GetValue(CONSTANTS.ELIGIBILITY.ICECREAM).Value<bool?>();
            eligibility.Marijuana = answers.GetValue(CONSTANTS.ELIGIBILITY.MARIJUANA).Value<bool?>();
            eligibility.Methamphetamine = answers.GetValue(CONSTANTS.ELIGIBILITY.METHAMPHETAMINE).Value<bool?>();
            eligibility.Pasta = answers.GetValue(CONSTANTS.ELIGIBILITY.PASTA).Value<bool?>();
            eligibility.Pills = answers.GetValue(CONSTANTS.ELIGIBILITY.PILLS).Value<bool?>();
            eligibility.Pizza = answers.GetValue(CONSTANTS.ELIGIBILITY.PIZZA).Value<bool?>();
            eligibility.Tobacco = answers.GetValue(CONSTANTS.ELIGIBILITY.TOBACCO).Value<bool?>();
            return eligibility;
        }
    }
}
