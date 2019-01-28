using Microsoft.AspNetCore.Mvc;

namespace SinStim.Controllers {
    public class HomeController : Controller {
        public IActionResult Index() {
            return View();
        }

        public IActionResult Survey() {
            return View();
        }

        public IActionResult Eligibility() {
            return View();
        }
    }
}
