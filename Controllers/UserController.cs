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

        [HttpPost("[action]")]
        public async Task<IActionResult> SaveUser(string id) {
            var successful = await userService.SaveAsync(id);
            if (!successful)
            {
                return BadRequest("Failed to save user.");
            }
            return Ok();
        }
    }
}