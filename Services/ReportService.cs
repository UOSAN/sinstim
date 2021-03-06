using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Interfaces;

namespace SinStim.Services {
    public class ReportService : IReportService {
        private readonly SinStimContext Context;
        private readonly ICategoryService CategoryService;

        public ReportService(SinStimContext context, ICategoryService categoryService) {
            this.Context = context;
            this.CategoryService = categoryService;
        }

        public async Task<List<JObject>> GetEligibilityCompletionData() {
            var completionData = await GetEligibilitySurveyCompleteUsers()
                .Select(u => new {
                    Id = u.Id,
                    CompletionCode = u.EligibilityCompletionCode
                }).ToListAsync();

            return completionData.Select(u => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.ID, u.Id);
                jObject.Add(CONSTANTS.REQUEST.ELIGIBILITY_COMPLETION_CODE, u.CompletionCode);
                return jObject;
            }).ToList();
        }

        public async Task<List<JObject>> GetInvitationData() {
            var finishedCategories = await GetDictionaryOfFinishedCategories();
            var completionData = await Context.Users.AsQueryable().Where(u =>
                    u.EligibilityCompletionCode != null
                    && u.EligibilityStartTime != null
                    && u.EligibilityEndTime != null
                    && u.SurveyStartTime == null)
                .Join(Context.Eligibilities,
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
                }).Where(cd =>
                    (cd.Alcohol != false && !finishedCategories[CONSTANTS.CATEGORY.ALCOHOL])
                    || (cd.Tobacco != false && !finishedCategories[CONSTANTS.CATEGORY.TOBACCO])
                    || (cd.Cocaine != false && !finishedCategories[CONSTANTS.CATEGORY.COCAINE])
                    || (cd.Heroin != false && !finishedCategories[CONSTANTS.CATEGORY.HEROIN])
                    || (cd.Marijuana != false && !finishedCategories[CONSTANTS.CATEGORY.MARIJUANA])
                    || (cd.Methamphetamine != false && !finishedCategories[CONSTANTS.CATEGORY.METHAMPHETAMINE])
                    || (cd.Pills != false && !finishedCategories[CONSTANTS.CATEGORY.PILLS])
                    || (cd.Chocolate != false && !finishedCategories[CONSTANTS.CATEGORY.CHOCOLATE])
                    || (cd.Cookies != false && !finishedCategories[CONSTANTS.CATEGORY.COOKIES])
                    || (cd.Donuts != false && !finishedCategories[CONSTANTS.CATEGORY.DONUTS])
                    || (cd.Fries != false && !finishedCategories[CONSTANTS.CATEGORY.FRIES])
                    || (cd.IceCream != false && !finishedCategories[CONSTANTS.CATEGORY.ICECREAM])
                    || (cd.Pasta != false && !finishedCategories[CONSTANTS.CATEGORY.PASTA])
                    || (cd.Pizza != false && !finishedCategories[CONSTANTS.CATEGORY.PIZZA])
                ).ToListAsync();

            return completionData.Select(u => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.ID, u.Id.ToString());
                jObject.Add(CONSTANTS.CATEGORY.ALCOHOL, u.Alcohol.ToString());
                jObject.Add(CONSTANTS.CATEGORY.CHOCOLATE, u.Chocolate.ToString());
                jObject.Add(CONSTANTS.CATEGORY.COCAINE, u.Cocaine.ToString());
                jObject.Add(CONSTANTS.CATEGORY.COOKIES, u.Cookies.ToString());
                jObject.Add(CONSTANTS.CATEGORY.DONUTS, u.Donuts.ToString());
                jObject.Add(CONSTANTS.CATEGORY.FRIES, u.Fries.ToString());
                jObject.Add(CONSTANTS.CATEGORY.HEROIN, u.Heroin.ToString());
                jObject.Add(CONSTANTS.CATEGORY.ICECREAM, u.IceCream.ToString());
                jObject.Add(CONSTANTS.CATEGORY.MARIJUANA, u.Marijuana.ToString());
                jObject.Add(CONSTANTS.CATEGORY.METHAMPHETAMINE, u.Methamphetamine.ToString());
                jObject.Add(CONSTANTS.CATEGORY.PASTA, u.Pasta.ToString());
                jObject.Add(CONSTANTS.CATEGORY.PILLS, u.Pills.ToString());
                jObject.Add(CONSTANTS.CATEGORY.PIZZA, u.Pizza.ToString());
                jObject.Add(CONSTANTS.CATEGORY.TOBACCO, u.Tobacco.ToString());
                return jObject;
            }).ToList();
        }

        public async Task<List<JObject>> GetStatusData() {
            var categoryCompleteInfo = await CategoryService.GetCategoryInfoAsync();

            return categoryCompleteInfo.Select(cci => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.CATEGORY, cci.Category);
                jObject.Add(CONSTANTS.REQUEST.TOTAL_PICTURES, cci.TotalPictures);
                jObject.Add(CONSTANTS.REQUEST.FINISHED_PICTURE_COUNT, cci.FinishedPictureCount);
                jObject.Add(CONSTANTS.REQUEST.PERCENT_COMPLETE, (Math.Round(cci.PercentComplete * 100, 2)) + "%");
                return jObject;
            }).ToList();
        }

        public async Task<List<JObject>> GetSurveyCompletionData() {
            var completionData = await GetSurveyCompleteUsers()
                .Select(u => new {
                    Id = u.Id,
                    CompletionCode = u.SurveyCompletionCode
                }).ToListAsync();

            return completionData.Select(u => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.ID, u.Id);
                jObject.Add(CONSTANTS.REQUEST.SURVEY_COMPLETION_CODE, u.CompletionCode);
                return jObject;
            }).ToList();
        }

        public async Task<List<JObject>> GetDesirabilityData() {
            var desirabilityData = await Context.Pictures.AsQueryable()
                .Join(Context.Ratings,
                    p => p.Id,
                    r => r.PictureId,
                    (p, r) => new { Picture = p, Rating = r })
                .Select(pr => new { FileName = pr.Picture.FileName, Desirability = pr.Rating.Desirability })
                .ToListAsync();

            return desirabilityData.Select(d => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.FILE_NAME, d.FileName);
                jObject.Add(CONSTANTS.REQUEST.DESIRABILITY, d.Desirability);
                return jObject;
            }).ToList();
        }

        public async Task<List<JObject>> GetRecognizabilityData() {
            var recognizabilityData = await Context.Pictures.AsQueryable()
                .Join(Context.Ratings,
                    p => p.Id,
                    r => r.PictureId,
                    (p, r) => new { Picture = p, Rating = r })
                .Select(pr => new { FileName = pr.Picture.FileName, Recognizability = pr.Rating.Recognizability })
                .ToListAsync();

            return recognizabilityData.Select(r => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.FILE_NAME, r.FileName);
                jObject.Add(CONSTANTS.REQUEST.RECOGNIZABILITY, r.Recognizability);
                return jObject;
            }).ToList();
        }

        private IQueryable<User> GetEligibilitySurveyCompleteUsers() {
            return Context.Users.AsQueryable().Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null);
        }
        private IQueryable<User> GetSurveyCompleteUsers() {
            return Context.Users.AsQueryable().Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null
                && u.SurveyCompletionCode != null
                && u.SurveyStartTime != null
                && u.SurveyEndTime != null);
        }

        private async Task<Dictionary<string, bool>> GetDictionaryOfFinishedCategories() {
            var categoryCompleteInfo = await CategoryService.GetCategoryInfoAsync();

            return categoryCompleteInfo.Select(cci => new {
                Category = cci.Category,
                IsFinished = cci.FinishedPictureCount == cci.TotalPictures
            }).ToDictionary(ci => ci.Category, ci => ci.IsFinished);
        }
    }
}
