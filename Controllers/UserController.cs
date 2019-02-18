using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Models;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class UserController : Controller {

        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("Save")]
        public async Task<IActionResult> SaveUser([FromBody] JObject newUser) {
            var newUserId = newUser.GetValue("id").Value<string>();
            Guid eligibilityCompletionCode = Guid.NewGuid();
            var successful = await userService.SaveAsync(newUserId, false, eligibilityCompletionCode);
            if (!successful)
            {
                return BadRequest("Failed to save user.");
            }
            return Ok();
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateUser([FromBody] JObject userJson) {
            User userToUpdate = getUserFromJson(userJson);
            var successful = await userService.UpdateAsync(userToUpdate);
            if (!successful)
            {
                return BadRequest("Failed to update user.");
            }
            return Ok();
        }

        private User getUserFromJson(JObject userJson) {
            var id = userJson.GetValue("id").Value<string>();
            var eligibilityStartTime = userJson.GetValue("eligibilityStartTime").Value<DateTimeOffset?>();

            User userToUpdate = new User();
            userToUpdate.Id = id;
            userToUpdate.EligibilityStartTime = eligibilityStartTime;
            return userToUpdate;
        }
    }
}
