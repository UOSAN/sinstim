using Microsoft.AspNetCore.Mvc;

namespace SinStim.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}
