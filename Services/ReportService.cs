using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using SinStim.Controllers;
using SinStim.Models;

namespace SinStim.Services {
    public class ReportService : IReportService {
        private readonly SinStimContext Context;
        private readonly IConfigService ConfigService;

        public ReportService(SinStimContext context, IConfigService configService) {
            this.Context = context;
            this.ConfigService = configService;
        }

        public async Task<List<JObject>>  GetEligibilityCompletionData() {
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

        // TODO filter out people with categories that no longer need ratings
        public async Task<List<JObject>> GetInvitationData() {
            var finishedCategories = await GetDictionaryOfFinishedCategories();
            var completionData = await GetEligibilitySurveyCompleteUsers()
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
            var categoryCompleteInfo = await GetCategoryCompleteInfo();

            return categoryCompleteInfo.Select(cci => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.CATEGORY, cci.Category);
                jObject.Add(CONSTANTS.REQUEST.TOTAL_PICTURES, cci.TotalPictures);
                jObject.Add(CONSTANTS.REQUEST.FINISHED_PICTURE_COUNT, cci.FinishedPictureCount);
                jObject.Add(CONSTANTS.REQUEST.PERCENT_COMPLETE, (Math.Round(cci.PercentComplete*100, 2)) + "%");
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

        private IQueryable<User> GetEligibilitySurveyCompleteUsers() {
            return Context.Users.Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null);
        }

        private IQueryable<User> GetSurveyCompleteUsers() {
            return Context.Users.Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null
                && u.SurveyCompletionCode != null
                && u.SurveyStartTime != null
                && u.SurveyEndTime != null);
        }

        private async Task<Dictionary<string, bool>> GetDictionaryOfFinishedCategories() {
            var categoryCompleteInfo = await GetCategoryCompleteInfo();

            return categoryCompleteInfo.Select(cci => new {
                Category = cci.Category,
                IsFinished = cci.FinishedPictureCount == cci.TotalPictures
            }).ToDictionary(ci => ci.Category, ci => ci.IsFinished);
        }

        private async Task<List<CategoryInfo>> GetCategoryCompleteInfo() {
            return await Context.Pictures.GroupJoin(
                  Context.Ratings,
                  picture => picture.Id,
                  rating => rating.PictureId,
                  (picture, ratings) => new { Picture = picture, Ratings = ratings })
            .SelectMany(
                pictureAndRatings => pictureAndRatings.Ratings.DefaultIfEmpty(),
                (pictureAndRatings, rating) => new {
                    Picture = pictureAndRatings.Picture,
                    Rating = rating
                })
            .GroupBy(
                par => par.Picture.FileName,
                (fileName, pictureAndRating) => new {
                    FileName = fileName,
                    NumOfRatings = pictureAndRating.Count(par => par.Rating != null),
                    Category = pictureAndRating.FirstOrDefault(par => par.Picture.FileName == fileName).Picture.Category
                })
            .GroupBy(pictureInfo => pictureInfo.Category, (category, pictureInfoList) =>
                new CategoryInfo(category,
                    pictureInfoList.Count(),
                    pictureInfoList.Count(pi => pi.NumOfRatings >= ConfigService.GetNumberOfRatingsToFinishPicture())
                )
            ).ToListAsync();
        }
    }
}
