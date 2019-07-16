using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Services.Interfaces;

namespace SinStim.Controllers {
    [Route("api/[controller]")]
    public class AdminController : Controller {

        private readonly IReportService ReportService;
        private readonly IConfigService ConfigService;

        private const string USER = "user";
        private const string PASSWORD = "password";

        public AdminController(IReportService reportService, IConfigService configService) {
            this.ReportService = reportService;
            this.ConfigService = configService;
        }

        [HttpPost("Invitation")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetInvitationData([FromBody] JObject requestBody) {
            if(!IsAuthorized(requestBody)) { return StatusCode(401); }
            var invitationData = await ReportService.GetInvitationData();
            return Ok(invitationData);
        }

        [HttpPost("Eligibility/Completion")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetEligibilityCompletionData([FromBody] JObject requestBody) {
            if(!IsAuthorized(requestBody)) { return StatusCode(401); }
            var completionData = await ReportService.GetEligibilityCompletionData();
            return Ok(completionData);
        }

        [HttpPost("Status")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStatus([FromBody] JObject requestBody) {
            if(!IsAuthorized(requestBody)) { return StatusCode(401); }
            var statusData = await ReportService.GetStatusData();
            return Ok(statusData);
        }

        [HttpPost("Survey/Completion")]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetSurveyCompletionData([FromBody] JObject requestBody) {
            if(!IsAuthorized(requestBody)) { return StatusCode(401); }
            var completionData = await ReportService.GetSurveyCompletionData();
            return Ok(completionData);
        }

        private bool IsAuthorized(JObject requestBody) {
            var passedInUser = requestBody.GetValue(USER).Value<string>();
            var passedInPassword = requestBody.GetValue(PASSWORD).Value<string>();
            return passedInUser == ConfigService.GetAdminUser() && passedInPassword == ConfigService.GetAdminPassword();
        }
    }
}
