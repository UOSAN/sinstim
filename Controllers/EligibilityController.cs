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
        private readonly SinStimContext context;
        public EligibilityController(IUserService userService, SinStimContext context) {
            this.userService = userService;
            this.context = context;
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartEligibilitySurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue("id").Value<string>();

            User userToUpdate = await context.FindAsync<User>(userId);
            userToUpdate.EligibilityStartTime = new DateTimeOffset(DateTime.Now);

            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to update eligibility start time.");
            }
            var response = new JObject();
            response.Add("eligibilityStartTime", userToUpdate.EligibilityStartTime);
            return Ok(response);
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(DateTimeOffset))]
        public async Task<IActionResult> EndEligibilitySurvey([FromBody] JObject userJson) {
            var userId = userJson.GetValue("id").Value<string>();

            User userToUpdate = await context.FindAsync<User>(userId);
            userToUpdate.EligibilityEndTime = new DateTimeOffset(DateTime.Now);

            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest("Failed to update eligibility end time.");
            }
            var response = new JObject();
            response.Add("eligibilityEndTime", userToUpdate.EligibilityEndTime);
            response.Add("eligibilityCompletionCode", userToUpdate.EligibilityCompletionCode);
            return Ok(response);
        }

        [HttpPost("Answer")]
        [ProducesResponseType(200, Type = typeof(DateTimeOffset))]
        public async Task<IActionResult> SubmitAnswers([FromBody] JObject userJson) {
            var userId = userJson.GetValue("id").Value<string>();
            User userToUpdate = await context.FindAsync<User>(userId);

            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful) {
                return BadRequest();
            }
            var response = new JObject();
            response.Add("eligibilityEndTime", userToUpdate.EligibilityEndTime);

            return Ok(response);
        }

        // [HttpGet("Completion/{id}")]
        // [ProducesResponseType(200, Type = typeof(Guid))]
        // public async Task<IActionResult> GetCompletionCode(string id) {
        //     User userToUpdate = await context.FindAsync<User>(id);

        //     if (userToUpdate == null) {
        //         return NotFound();
        //     }
        //     var response = new JObject();
        //     response.Add("eligibilityCompletionCode", userToUpdate.EligibilityCompletionCode);
        //     return Ok(response);
        // }
    }
}
