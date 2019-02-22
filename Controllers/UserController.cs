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
            var newUserId = newUser.GetValue(CONSTANTS.USER.ID).Value<string>();
            var eligibilityCompletionCode = Guid.NewGuid();
            var successful = await userService.SaveAsync(newUserId, false, eligibilityCompletionCode);
            if (!successful)
            {
                return BadRequest("Failed to save user.");
            }
            return Ok();
        }
    }
}
