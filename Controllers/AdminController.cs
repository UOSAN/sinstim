using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SinStim.Services;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class AdminController : Controller {

        private readonly IReportService ReportService;

        public AdminController(IReportService reportService) {
            this.ReportService = reportService;
        }

        [HttpGet("Eligibility")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetEligibilityData() {
            var eligibilityData = await ReportService.GetEligibilityData();
            return Ok(eligibilityData);
        }

        [HttpGet("Completion")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetCompletionData(string id) {
           var completionData = await ReportService.GetCompletionData();
            return Ok(completionData);
        }

        [HttpGet("Status")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStatus(string id) {
            var statusData = await ReportService.GetStatusData();
            return Ok(statusData);
        }
    }
}
