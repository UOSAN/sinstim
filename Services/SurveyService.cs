using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Interfaces;
using SinStim.Services.Poco;

namespace SinStim.Services {
    public class SurveyService : ISurveyService {

        private readonly SinStimContext Context;
        private readonly IConfigService ConfigService;
        private readonly ICategoryService CategoryService;

        public SurveyService(SinStimContext context, IConfigService configService, ICategoryService categoryService) {
            this.Context = context;
            this.ConfigService = configService;
            this.CategoryService = categoryService;
        }

        public async Task<List<PictureToRate>> GetPicturesToRate(string category) {
            var numberOfPicturesToTake = await GetNumberOfPicturesToRate(category);
            return await Context.Pictures
                .Include(p => p.Ratings)
                .Where(p => p.Category == category && p.Ratings.Count < 25)
                .OrderBy(c => Guid.NewGuid())
                .Take(numberOfPicturesToTake)
                .Select(p => new PictureToRate(p.Path, p.FileName, p.Category))
                .ToListAsync();
        }

        public async Task<string> GetAssignedCategory(string userId) {
            var eligibility = await Context.Eligibilities.FirstOrDefaultAsync(e => e.UserId == userId);

            var potentialCategories = GetPotentialCategories(eligibility);
            var incompleteCategories = await CategoryService.GetListOfIncompleteCategoriesAsync();

            var eligibleCategories = potentialCategories.Intersect(incompleteCategories.Select(ci => ci.Category)).ToList();

            var idx = GetRandomAssignedCategoryIndex(eligibleCategories.Count);

            return eligibleCategories.ElementAt(idx);
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
            potentialCategories.Add(CONSTANTS.CATEGORY.NEUTRAL);
            return potentialCategories;
        }

        private int GetRandomAssignedCategoryIndex(int maxValue) {
            return new Random().Next(maxValue);
        }

        private async Task<int> GetNumberOfPicturesToRate(string category) {
            int numberOfPicturesInCategory = await Context.Pictures.CountAsync(p => p.Category == category);
            var numberOfPicturesToRate = ConfigService.GetNumberOfPicturesToRate();
            return numberOfPicturesToRate >= numberOfPicturesInCategory
                ? numberOfPicturesInCategory
                : numberOfPicturesToRate;
        }
    }
}
