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

        [HttpGet("Invitation")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetInvitationData() {
            var invitationData = await ReportService.GetInvitationData();
            return Ok(invitationData);
        }

        [HttpGet("Eligibility/Completion")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetEligibilityCompletionData() {
           var completionData = await ReportService.GetEligibilityCompletionData();
            return Ok(completionData);
        }

        [HttpGet("Status")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStatus() {
            var statusData = await ReportService.GetStatusData();
            return Ok(statusData);
        }

        [HttpGet("Survey/Completion")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetSurveyCompletionData() {
           var completionData = await ReportService.GetSurveyCompletionData();
            return Ok(completionData);
        }
    }
}
