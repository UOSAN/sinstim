using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Models;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class EligibilityController : Controller {

        private readonly IUserService userService;

        public EligibilityController(IUserService userService) {
            this.userService = userService;
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartEligibilitySurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.USER.ID).Value<string>();
            var userToUpdate = await userService.GetUser(userId);
            if(!isAllowedToStartEligibilitySurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.EligibilityCompletionCode = Guid.NewGuid();
            userToUpdate.EligibilityStartTime = new DateTimeOffset(DateTime.Now);

            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to start eligibility survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.USER.ELIGIBILITY_START_TIME, userToUpdate.EligibilityStartTime);
            return Ok(response);
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> EndEligibilitySurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue(CONSTANTS.USER.ID).Value<string>();
            var userToUpdate = await userService.GetUser(userId);
            if(!isAllowedToEndEligibilitySurvey(userToUpdate)) { return StatusCode(401); }

            userToUpdate.EligibilityEndTime = new DateTimeOffset(DateTime.Now);
            var eligibility = getEligibility(userJson);
            userToUpdate.Eligibilities.Add(eligibility);

            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to end eligibility survey.");
            }

            var response = new JObject();
            response.Add(CONSTANTS.USER.ELIGIBILITY_END_TIME, userToUpdate.EligibilityEndTime);
            response.Add(CONSTANTS.USER.ELIGIBILITY_COMPLETION_CODE, userToUpdate.EligibilityCompletionCode);
            return Ok(response);
        }

        private bool isAllowedToStartEligibilitySurvey(User user) {
            return user != null && user.EligibilityStartTime == null;
        }

        private bool isAllowedToEndEligibilitySurvey(User user) {
            return user != null
                && user.EligibilityStartTime != null
                && user.EligibilityCompletionCode != null
                && user.EligibilityEndTime == null;;
        }

        private Eligibility getEligibility(JObject requestBody) {
            var eligibility = new Eligibility();
            eligibility.Id = Guid.NewGuid();
            eligibility.UserId = requestBody.GetValue(CONSTANTS.USER.ID).Value<string>();

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