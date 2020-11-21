using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SinStim.Services.Interfaces;

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

        public IActionResult Admin() {
            return View();
        }
    }
}
