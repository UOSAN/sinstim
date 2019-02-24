using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Models;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class UserController : Controller {

        private readonly IUserService userService;

        public UserController(IUserService userService) {
            this.userService = userService;
        }

        [HttpPost("Save")]
        public async Task<IActionResult> SaveUser([FromBody] JObject newUser) {
            var newUserId = newUser.GetValue(CONSTANTS.USER.ID).Value<string>();
            var eligibilityCompletionCode = Guid.NewGuid();
            var successful = await userService.SaveAsync(newUserId, false, eligibilityCompletionCode);
            if (!successful) {
                return BadRequest("Failed to save user.");
            }
            return Ok();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUser(string id) {
            var user = await userService.GetUser(id);
            if (user == null) {
                return StatusCode(404);
            }
            var response = new JObject();
            response.Add(CONSTANTS.USER.ID, user.Id);
            response.Add(CONSTANTS.USER.ELIGIBILITY_END_TIME, user.EligibilityEndTime);
            response.Add(CONSTANTS.USER.ELIGIBILITY_START_TIME, user.EligibilityStartTime);
            return Ok(response);
        }
    }
}
