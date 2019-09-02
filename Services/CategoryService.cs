using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SinStim.Constants;
using SinStim.Models;
using SinStim.Services.Interfaces;
using SinStim.Services.Poco;

namespace SinStim.Services {
    public class CategoryService: ICategoryService {
        private readonly SinStimContext Context;
        private readonly IConfigService ConfigService;
        public CategoryService(SinStimContext context, IConfigService configService) {
            this.Context = context;
            this.ConfigService = configService;
        }
        public async Task<List<CategoryInfo>> GetCategoryInfoAsync() {
            var nonNeutralCategoryInfo = await GetNonNeutralCategoryInfoQuery().ToListAsync();
            var neutralCategoryInfo = await GetNeutralCategoryInfoQuery().ToListAsync();

            return nonNeutralCategoryInfo.Concat(neutralCategoryInfo).ToList();
        }

        public async Task<List<IncompleteCategory>> GetListOfIncompleteCategoriesAsync() {
            var incompleteNonNeutralCategories = await GetIncompleteNonNeutralCategories();

            var incompleteNeutralCategories = await GetIncompleteNeutralCategories();

            return incompleteNonNeutralCategories.Concat(incompleteNeutralCategories).ToList();
        }

        private async Task<List<IncompleteCategory>> GetIncompleteNonNeutralCategories() {
            var incompleteCategories = await Context
                .IncompleteCategoryQuery
                .FromSql(@"
                    SELECT Category
                    FROM (
                        SELECT Pictures.Id, Pictures.Category, Pictures.FileName, Pictures.Path, COUNT(Ratings.Id) AS NumberOfRatings
                        FROM PICTURES
                        LEFT OUTER JOIN RATINGS ON Pictures.Id = Ratings.PictureId
                        WHERE Pictures.Category != {0}
                        GROUP BY Pictures.Id
                        HAVING NumberOfRatings < {1}
                    )
                    GROUP BY(Category)", CONSTANTS.CATEGORY.NEUTRAL, ConfigService.GetNumberOfRatingsToFinishPicture()
                )
                .ToListAsync();

            return incompleteCategories;
        }

        private async Task<List<IncompleteCategory>> GetIncompleteNeutralCategories() {
            var incompleteCategories = await Context
                .IncompleteCategoryQuery
                .FromSql(@"
                    SELECT Category
                    FROM (
                        SELECT Pictures.Id, Pictures.Category, Pictures.FileName, Pictures.Path, COUNT(Ratings.Id) AS NumberOfRatings
                        FROM PICTURES
                        LEFT OUTER JOIN RATINGS ON Pictures.Id = Ratings.PictureId
                        WHERE Pictures.Category = {0}
                        GROUP BY Pictures.Id
                        HAVING NumberOfRatings < {1}
                    )
                    GROUP BY(Category)", CONSTANTS.CATEGORY.NEUTRAL, ConfigService.GetNumberOfRatingsToFinishNeutralPicture()
                )
                .ToListAsync();

            return incompleteCategories;
        }

        private IQueryable<CategoryInfo> GetNonNeutralCategoryInfoQuery() {
            return GetPictureInfo()
                .GroupBy(pictureInfo => pictureInfo.Category, (category, pictureInfoList) =>
                    new CategoryInfo(category,
                        pictureInfoList.Count(),
                        pictureInfoList.Count(pi => pi.NumOfRatings >= ConfigService.GetNumberOfRatingsToFinishPicture())
                    ))
                .Where(ci => ci.Category != CONSTANTS.CATEGORY.NEUTRAL);
        }

        private IQueryable<CategoryInfo> GetNeutralCategoryInfoQuery() {
            return GetPictureInfo()
                .GroupBy(pictureInfo => pictureInfo.Category, (category, pictureInfoList) =>
                    new CategoryInfo(category,
                        pictureInfoList.Count(),
                        pictureInfoList.Count(pi => pi.NumOfRatings >= ConfigService.GetNumberOfRatingsToFinishNeutralPicture())
                ))
                .Where(ci => ci.Category == CONSTANTS.CATEGORY.NEUTRAL);
        }

        private IQueryable<PictureInfo> GetPictureInfo() {
            return Context.Pictures.GroupJoin(
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
                (fileName, pictureAndRating) => new PictureInfo(
                    pictureAndRating.FirstOrDefault(par => par.Picture.FileName == fileName).Picture.Category,
                    pictureAndRating.Count(par => par.Rating != null)
                ));
        }

        private class PictureInfo {
            public readonly string Category;
            public readonly int NumOfRatings;

            public PictureInfo(string category, int numOfRatings) {
                this.Category = category;
                this.NumOfRatings = numOfRatings;
            }
        }
    }
}
