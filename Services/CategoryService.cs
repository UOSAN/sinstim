using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
        public async Task<List<CategoryInfo>> GetCategoryCompleteInfoAsync() {
            return await GetCategoryInfoQuery().ToListAsync();
        }

        public async Task<bool> IsCategoryCompleteAsync(string category) {
            return await GetCategoryInfoQuery()
            .Where(ci => ci.Category == category)
            .Select(ci => ci.FinishedPictureCount == ci.TotalPictures)
            .FirstOrDefaultAsync();
        }

        private IQueryable<CategoryInfo> GetCategoryInfoQuery() {
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
                (fileName, pictureAndRating) => new {
                    FileName = fileName,
                    NumOfRatings = pictureAndRating.Count(par => par.Rating != null),
                    Category = pictureAndRating.FirstOrDefault(par => par.Picture.FileName == fileName).Picture.Category
                })
            .GroupBy(pictureInfo => pictureInfo.Category, (category, pictureInfoList) =>
                new CategoryInfo(category,
                    pictureInfoList.Count(),
                    pictureInfoList.Count(pi => pi.NumOfRatings >= ConfigService.GetNumberOfRatingsToFinishPicture())
                ));
        }
    }
}
