using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class UserController : Controller {

        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> SaveUser([FromBody] NewUser newUser) {
            var successful = await userService.SaveAsync(newUser.id);
            if (!successful)
            {
                return BadRequest("Failed to save user.");
            }
            return Ok();
        }

        public class NewUser {
            public string id { get; set; }
        }
    }
}