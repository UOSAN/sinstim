using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using SinStim.Controllers;
using SinStim.Models;

namespace SinStim.Services {
    public class ReportService : IReportService {
        private readonly SinStimContext Context;
        private readonly IConfiguration Configuration;

        public ReportService(SinStimContext context, IConfiguration configuration) {
            this.Context = context;
            this.Configuration = configuration;
        }

        public async Task<List<JObject>>  GetCompletionData() {
            var completionData = await getEligibilitySurveyCompleteUsers()
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

        public async Task<List<JObject>> GetEligibilityData() {
            var completionData = await getEligibilitySurveyCompleteUsers()
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
                }).Where(cd => cd.Alcohol != false
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
                        || cd.Pizza != false
                ).ToListAsync();

                return completionData.Select(u => {
                    var jObject = new JObject();
                    jObject.Add(CONSTANTS.REQUEST.ID, u.Id);
                    // jObject.Add(CONSTANTS.)
                    return jObject;
                }).ToList();
        }

        public async Task<List<JObject>> GetStatusData() {
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
                PicturesWithEnoughRatings = pictureInfoList.Count(pi => pi.NumOfRatings >= 25)
            }).ToListAsync();

            return qry.Select(pictureAndRating => {
                var jObject = new JObject();
                jObject.Add("Category", pictureAndRating.Category);
                jObject.Add("TotalPictures", pictureAndRating.TotalPictures);
                jObject.Add("PicturesWithEnoughRatings", pictureAndRating.PicturesWithEnoughRatings);
                return jObject;
            }).ToList();
        }

        private IQueryable<User> getEligibilitySurveyCompleteUsers() {
            return Context.Users.Where(u =>
                u.EligibilityCompletionCode != null
                && u.EligibilityStartTime != null
                && u.EligibilityEndTime != null);
        }

        private async Task<bool> stillNeedsRatings(string category) {
            return true;
        }
    }
}
