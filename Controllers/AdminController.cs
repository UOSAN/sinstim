using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class AdminController : Controller {

        private readonly IReportService reportService;

        public AdminController(IReportService reportService) {
            this.reportService = reportService;
        }

        [HttpGet("Eligibility")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetEligibilityData() {
            var eligibilityData = await reportService.GetEligibilityData();
            return Ok(eligibilityData);
        }

        [HttpGet("Completion")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetCompletionData(string id) {
           var completionData = await reportService.GetCompletionData();
            return Ok(completionData);
        }

        [HttpGet("Status")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStatus(string id) {
           var statusData = await reportService.GetStatusData();
            return Ok(statusData);
        }
    }
}
