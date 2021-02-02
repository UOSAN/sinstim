using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Interfaces;

namespace SinStim.Services {
    public class SurveyService : ISurveyService {

        private readonly SinStimContext Context;
        private readonly IConfigService ConfigService;
        private readonly ICategoryService CategoryService;
        private readonly ILogger<SurveyService> Logger;

        public SurveyService(SinStimContext context, IConfigService configService, ICategoryService categoryService, ILogger<SurveyService> logger) {
            this.Context = context;
            this.ConfigService = configService;
            this.CategoryService = categoryService;
            this.Logger = logger;
        }

        public async Task<List<PictureToRate>> GetPicturesToRateRaw(string category) {
            var numberOfRatings = ConfigService.GetNumberOfRatingsToFinishPicture();
            if(category == CONSTANTS.CATEGORY.NEUTRAL) {
                numberOfRatings = ConfigService.GetNumberOfRatingsToFinishNeutralPicture();
            }
            var numberOfPicturesToRate = ConfigService.GetNumberOfPicturesToRate();

            var picturesToRate = await Context.PictureToRateQuery.FromSqlRaw(@"
                SELECT * FROM PICTURES
                WHERE (PICTURES.Category = {0}) AND ((
                    SELECT COUNT(*)
                    FROM RATINGS
                    WHERE PICTURES.Id = RATINGS.PictureId
                ) < {1})
                ORDER BY RAND() LIMIT {2}", category, numberOfRatings, numberOfPicturesToRate
            ).ToListAsync();
            if(picturesToRate.Count > 0) {
                return picturesToRate;
            }
            // Unlucky timing we don't need any more ratings so here are 250 random ones anyway
            return await Context.PictureToRateQuery.FromSqlRaw(@"
                SELECT * FROM PICTURES
                WHERE PICTURES.Category = {0}
                ORDER BY RAND() LIMIT {1}", category, numberOfPicturesToRate
            ).ToListAsync();
        }

        public async Task<string> GetAssignedCategory(string userId) {
            var eligibility = await Context.Eligibilities.AsNoTracking().FirstOrDefaultAsync(e => e.UserId == userId);

            var potentialCategories = GetPotentialCategories(eligibility);
            var incompleteCategories = await CategoryService.GetListOfIncompleteCategoriesAsync();

            var eligibleCategories = potentialCategories.Intersect(incompleteCategories.Select(ic => ic.Category)).ToList();

            if(eligibleCategories.Count > 1 && eligibleCategories.Contains(CONSTANTS.CATEGORY.NEUTRAL)) {
                eligibleCategories.Remove(CONSTANTS.CATEGORY.NEUTRAL);
            } else if(eligibleCategories.Count == 0) { // in theory we have collected all the ratings we need
                return CONSTANTS.CATEGORY.NEUTRAL; // give the user neutral anyway?
            }

            var idx = GetRandomAssignedCategoryIndex(eligibleCategories.Count);

            return eligibleCategories.ElementAt(idx);
        }

        private List<string> GetPotentialCategories(Eligibility eligibility) {
            var potentialCategories = new List<string>();
            // Only add Tobacco as a potential category, so we get ratings for smoking / tobacco images only.
            if (eligibility.Tobacco == true) potentialCategories.Add(CONSTANTS.CATEGORY.TOBACCO);
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
