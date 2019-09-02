using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Interfaces;

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

        public async Task<List<PictureToRate>> GetPicturesToRateRaw(string category) {
            var numberOfRatings = ConfigService.GetNumberOfRatingsToFinishPicture();
            if(category == CONSTANTS.CATEGORY.NEUTRAL) {
                numberOfRatings = ConfigService.GetNumberOfRatingsToFinishNeutralPicture();
            }
            var numberOfPicturesToRate = ConfigService.GetNumberOfPicturesToRate();

            return await Context.PictureToRateQuery.FromSql(@"
                SELECT * FROM PICTURES
                WHERE (PICTURES.Category = {0}) AND ((
                    SELECT COUNT(*)
                    FROM RATINGS
                    WHERE PICTURES.Id = RATINGS.PictureId
                ) < {1})
                ORDER BY RANDOM() LIMIT {2}", category, numberOfRatings, numberOfPicturesToRate
            ).ToListAsync();
        }

        public async Task<string> GetAssignedCategory(string userId) {
            var eligibility = await Context.Eligibilities.AsNoTracking().FirstOrDefaultAsync(e => e.UserId == userId);

            var potentialCategories = GetPotentialCategories(eligibility);
            var incompleteCategories = await CategoryService.GetListOfIncompleteCategoriesAsync();

            var eligibleCategories = potentialCategories.Intersect(incompleteCategories.Select(ic => ic.Category)).ToList();

            if(eligibleCategories.Count > 1 && eligibleCategories.Contains(CONSTANTS.CATEGORY.NEUTRAL)) {
                eligibleCategories.Remove(CONSTANTS.CATEGORY.NEUTRAL);
            }

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
            int numberOfPicturesInCategory = await Context.Pictures.AsNoTracking().CountAsync(p => p.Category == category);
            var numberOfPicturesToRate = ConfigService.GetNumberOfPicturesToRate();
            return numberOfPicturesToRate >= numberOfPicturesInCategory
                ? numberOfPicturesInCategory
                : numberOfPicturesToRate;
        }
    }
}
