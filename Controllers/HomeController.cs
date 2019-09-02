using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SinStim.Services.Interfaces;

namespace SinStim.Controllers {
    public class HomeController : Controller {
        private readonly IPragmaService PragmaService;
        public HomeController(IPragmaService pragmaService) {
            this.PragmaService = pragmaService;
        }
        public IActionResult Index() {
            return View();
        }

        public async Task<IActionResult> Survey() {
            await PragmaService.SetWalMode();
            return View();
        }

        public async Task<IActionResult> Eligibility() {
            await PragmaService.SetWalMode();
            return View();
        }

        public async Task<IActionResult> Admin() {
            await PragmaService.SetWalMode();
            return View();
        }
    }
}
