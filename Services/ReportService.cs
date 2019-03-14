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

        public async Task<List<JObject>>  GetCompletionData() {
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
        public async Task<List<JObject>> GetEligibilityData() {
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
                    jObject.Add(CONSTANTS.REQUEST.ID, u.Id);
                    jObject.Add(CONSTANTS.CATEGORY.ALCOHOL, u.Alcohol);
                    jObject.Add(CONSTANTS.CATEGORY.CHOCOLATE, u.Chocolate);
                    jObject.Add(CONSTANTS.CATEGORY.COCAINE, u.Cocaine);
                    jObject.Add(CONSTANTS.CATEGORY.COOKIES, u.Cookies);
                    jObject.Add(CONSTANTS.CATEGORY.DONUTS, u.Donuts);
                    jObject.Add(CONSTANTS.CATEGORY.FRIES, u.Fries);
                    jObject.Add(CONSTANTS.CATEGORY.HEROIN, u.Heroin);
                    jObject.Add(CONSTANTS.CATEGORY.ICECREAM, u.IceCream);
                    jObject.Add(CONSTANTS.CATEGORY.MARIJUANA, u.Marijuana);
                    jObject.Add(CONSTANTS.CATEGORY.METHAMPHETAMINE, u.Methamphetamine);
                    jObject.Add(CONSTANTS.CATEGORY.PASTA, u.Pasta);
                    jObject.Add(CONSTANTS.CATEGORY.PILLS, u.Pills);
                    jObject.Add(CONSTANTS.CATEGORY.PIZZA, u.Pizza);
                    jObject.Add(CONSTANTS.CATEGORY.TOBACCO, u.Tobacco);
                    return jObject;
                }).ToList();
        }

        public async Task<List<JObject>> GetStatusData() {
            // TODO pull this qry into its own method!
            var qry = await Context.Pictures.GroupJoin(
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
            .GroupBy(pictureInfo => pictureInfo.Category, (category, pictureInfoList) => new {
                Category = category,
                TotalPictures = pictureInfoList.Count(),
                FinishedPictureCount = pictureInfoList.Count(pi => pi.NumOfRatings >= ConfigService.GetNumberOfRatingsToFinishPicture())
            }).ToListAsync();

            return qry.Select(pictureAndRating => {
                var jObject = new JObject();
                jObject.Add(CONSTANTS.REQUEST.CATEGORY, pictureAndRating.Category);
                jObject.Add(CONSTANTS.REQUEST.TOTAL_PICTURES, pictureAndRating.TotalPictures);
                jObject.Add(CONSTANTS.REQUEST.FINISHED_PICTURE_COUNT, pictureAndRating.FinishedPictureCount);
                return jObject;
            }).ToList();
        }

        private IQueryable<User> GetEligibilitySurveyCompleteUsers() {
            return Context.Users.Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null);
        }

        private async Task<Dictionary<string, bool>> GetDictionaryOfFinishedCategories() {
            // TODO pull this qry into its own method!
            var qry = await Context.Pictures.GroupJoin(
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
            .GroupBy(pictureInfo => pictureInfo.Category, (category, pictureInfoList) => new {
                Category = category,
                TotalPictures = pictureInfoList.Count(),
                FinishedPictureCount = pictureInfoList.Count(pi => pi.NumOfRatings >= ConfigService.GetNumberOfRatingsToFinishPicture())
            }).ToListAsync();

            return qry.Select(c => new {
                Category = c.Category,
                IsFinished = c.FinishedPictureCount == c.TotalPictures
            }).ToDictionary(ci => ci.Category, ci => ci.IsFinished);
        }
    }
}
