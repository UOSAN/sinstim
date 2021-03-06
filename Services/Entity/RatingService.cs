using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SinStim.Models;

namespace SinStim.Services.Entity {
    public class RatingService: IRatingService {

        private readonly SinStimContext Context;
        private readonly ILogger<RatingService> Logger;

        public RatingService(SinStimContext context, ILogger<RatingService> logger) {
            this.Context = context;
            this.Logger = logger;
        }
        public async Task<bool> SaveAsync(string userId, string pictureId, int desirability, int recognizability) {
            var rating = new Rating();
            rating.Id = Guid.NewGuid().ToString();
            rating.UserId = userId;
            rating.PictureId = pictureId;
            rating.Recognizability = recognizability;
            rating.Desirability = desirability;

            Context.Ratings.Add(rating);

            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                Logger.LogError(e, "Error SaveAsync userId: {0} pictureId: {1} at {2}", userId, pictureId, DateTime.UtcNow.ToLongTimeString());
            }
            return saveResult == 1;
        }
    }
}
