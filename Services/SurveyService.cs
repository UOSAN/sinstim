using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SinStim.Controllers;
using SinStim.Models;

namespace SinStim.Services {
    public class SurveyService : ISurveyService {

        private readonly SinStimContext Context;
        private readonly IConfiguration Configuration;

        public SurveyService(SinStimContext context, IConfiguration configuration) {
            this.Context = context;
            this.Configuration = configuration;
        }

        public async Task<Array> GetSurveyQuestionNumbers(string category) {
            int numberOfPicturesInCategory = await Context.Pictures.CountAsync(p => p.Category == category);
            int numberOfPicturesToRate = Configuration.GetValue<int>("numberOfPicturesToRate");
            int numberOfPicturesToTake = numberOfPicturesToRate >= numberOfPicturesInCategory
                ? numberOfPicturesInCategory
                : numberOfPicturesToRate;
            return Enumerable.Range(1, numberOfPicturesInCategory).OrderBy(g => Guid.NewGuid()).Take(numberOfPicturesToTake).ToArray();
        }

        public async Task<string> GetAssignedCategory(string userId) {
            var eligibility = await Context.Eligibilities.FirstOrDefaultAsync(e => e.UserId == userId);
            var potentialCategories = GetPotentialCategories(eligibility);
            var idx = GetRandomAssignedCategoryIndex(potentialCategories.Count-1);

            return potentialCategories.ElementAt(idx);
        }

        public async Task<bool> RatePicture(string userId, int desirability, int recognizability, string fileName) {
            var picture = await Context.Pictures.FirstOrDefaultAsync(p => p.FileName == fileName);
            var rating = new Rating();
            rating.Id = Guid.NewGuid();
            rating.UserId = userId;
            rating.PictureId = picture.Id;
            rating.Recognizability = recognizability;
            rating.Desirability = desirability;

            return await SaveAsync(rating);
        }

        private async Task<bool> SaveAsync(Rating rating) {
            Context.Ratings.Add(rating);

            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                System.Diagnostics.Debug.WriteLine(e);
            }
            return saveResult == 1;
        }

        private List<string> GetPotentialCategories(Eligibility eligibility) {
            var potentialCategories = new List<string>();
            if (eligibility.Alcohol == true) potentialCategories.Add(CONSTANTS.CATEGORY.ALCOHOL);
            if (eligibility.Chocolate == true) potentialCategories.Add(CONSTANTS.CATEGORY.CHOCOLATE);
            if (eligibility.Cocaine == true) potentialCategories.Add(CONSTANTS.CATEGORY.COCAINE);
            if (eligibility.Cookies == true) potentialCategories.Add(CONSTANTS.CATEGORY.COOKIES);
            if (eligibility.Donuts == true) potentialCategories.Add(CONSTANTS.CATEGORY.DONUTS);
            if (eligibility.Fries == true) potentialCategories.Add(CONSTANTS.CATEGORY.FRIES);
            if (eligibility.Heroin == true) potentialCategories.Add(CONSTANTS.CATEGORY.HEROIN);
            if (eligibility.IceCream == true) potentialCategories.Add(CONSTANTS.CATEGORY.ICECREAM);
            if (eligibility.Marijuana == true) potentialCategories.Add(CONSTANTS.CATEGORY.MARIJUANA);
            if (eligibility.Methamphetamine == true) potentialCategories.Add(CONSTANTS.CATEGORY.METHAMPHETAMINE);
            if (eligibility.Pasta == true) potentialCategories.Add(CONSTANTS.CATEGORY.PASTA);
            if (eligibility.Pills == true) potentialCategories.Add(CONSTANTS.CATEGORY.PILLS);
            if (eligibility.Pizza == true) potentialCategories.Add(CONSTANTS.CATEGORY.PIZZA);
            if (eligibility.Tobacco == true) potentialCategories.Add(CONSTANTS.CATEGORY.TOBACCO);
            return potentialCategories;
        }

        private int GetRandomAssignedCategoryIndex(int maxValue) {
            return new Random().Next(maxValue);
        }
    }
}
