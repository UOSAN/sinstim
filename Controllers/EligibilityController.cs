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

        public EligibilityController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("Start")]
        [ProducesResponseType(200, Type = typeof(JObject))]
        public async Task<IActionResult> StartEligibilitySurvey([FromBody] JObject userJson) {
            User userToUpdate = new User();
            userToUpdate.Id = userJson.GetValue("id").Value<string>();
            userToUpdate.EligibilityStartTime = new DateTimeOffset(DateTime.Now);
            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful)
            {
                return BadRequest("Failed to update eligibility start time.");
            }
            var response = new JObject();
            response.Add("eligibilityStartTime", userToUpdate.EligibilityStartTime);
            return Ok(response);
        }

        [HttpPost("End")]
        [ProducesResponseType(200, Type = typeof(DateTimeOffset))]
        public async Task<IActionResult> EndEligibilitySurvey([FromBody] JObject userJson) {
            User userToUpdate = new User();
            userToUpdate.Id = userJson.GetValue("id").Value<string>();
            userToUpdate.EligibilityEndTime = new DateTimeOffset(DateTime.Now);
            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful)
            {
                return BadRequest("Failed to update eligibility end time.");
            }
            return Ok(userToUpdate.EligibilityEndTime);
        }
    }
}
