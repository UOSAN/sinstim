using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SinStim.Controllers;
using SinStim.Models;

namespace SinStim.Services {
    public partial class ReportService : IReportService {
        private readonly SinStimContext context;
        public ReportService(SinStimContext context) {
            this.context = context;
        }

        public async Task<List<JObject>>  GetCompletionData() {
            var completionData = await context.Users
                .Where(u => u.EligibilityCompletionCode != null
                    && u.EligibilityStartTime != null
                    && u.EligibilityEndTime != null
                ).Select(u => new {
                    Id = u.Id,
                    CompletionCode = u.EligibilityCompletionCode
                }).ToListAsync();

            return completionData.Select(u => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.USER.ID, u.Id);
                jObject.Add(CONSTANTS.USER.ELIGIBILITY_COMPLETION_CODE, u.CompletionCode);
                return jObject;
            }).ToList();
        }

        public async Task<List<JObject>> GetEligibilityData() {
            var completionData = await context.Users
                .Where(u => u.EligibilityCompletionCode != null)
                .Select(u => new
                {
                    Id = u.Id
                }).ToListAsync();

            return completionData.Select(u => {
                    var jObject = new JObject();
                    jObject.Add(CONSTANTS.USER.ID, u.Id);
                    return jObject;
                }).ToList();
        }
    }
}
