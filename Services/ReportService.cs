using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SinStim.Controllers;
using SinStim.Models;

namespace SinStim.Services {
    public class ReportService : IReportService {
        private readonly SinStimContext context;
        public ReportService(SinStimContext context) {
            this.context = context;
        }

        public async Task<List<JObject>>  GetCompletionData() {
            var completionData = await getEligibilitySurveyCompleteUsers()
                .Select(u => new {
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
            var completionData = await getEligibilitySurveyCompleteUsers()
                .Join(context.Eligibilities,
                    u => u.Id,
                    e => e.UserId,
                    (u, e) => new { User = u, Eligibility = e })
                .Select(results => new {
                    Id = results.User.Id,
                    Alcohol = results.Eligibility.Alcohol,
                    Tobacco = results.Eligibility.Tobacco,
                    Cocaine = results.Eligibility.Cocaine,
                    Heroin = results.Eligibility.Heroin,
                    Marijuana = results.Eligibility.Marijuana,
                    Methamphetamine = results.Eligibility.Methamphetamine,
                    Pills = results.Eligibility.Pills,
                    Chocolate = results.Eligibility.Chocolate,
                    Cookies = results.Eligibility.Cookies,
                    Donuts = results.Eligibility.Donuts,
                    Fries = results.Eligibility.Fries,
                    IceCream = results.Eligibility.IceCream,
                    Pasta = results.Eligibility.Pasta,
                    Pizza = results.Eligibility.Pizza
                }).ToListAsync();

            return completionData
                .Where(cd => {
                    return cd.Alcohol != false
                        || cd.Tobacco != false
                        || cd.Cocaine != false
                        || cd.Heroin != false
                        || cd.Marijuana != false
                        || cd.Methamphetamine != false
                        || cd.Pills != false
                        || cd.Chocolate != false
                        || cd.Cookies != false
                        || cd.Donuts != false
                        || cd.Fries != false
                        || cd.IceCream != false
                        || cd.Pasta != false
                        || cd.Pizza != false;
                })
                .Select(u => {
                    var jObject = new JObject();
                    jObject.Add(CONSTANTS.USER.ID, u.Id);
                    return jObject;
                }).ToList();
        }

        private IQueryable<User> getEligibilitySurveyCompleteUsers() {
            return context.Users.Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null);
        }
    }
}
