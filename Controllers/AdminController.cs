using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SinStim.Models;
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
        public async Task<IActionResult> GetUser(string id) {
           var eligibilityData = await reportService.GetCompletionData();
            return Ok(eligibilityData);
        }
    }
}