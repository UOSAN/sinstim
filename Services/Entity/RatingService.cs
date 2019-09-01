using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SinStim.Models;

namespace SinStim.Services.Entity {
    public class RatingService: IRatingService {

        private readonly SinStimContext Context;
        public RatingService(SinStimContext context) {
            this.Context = context;
        }
        public async Task<bool> SaveAsync(string userId, int desirability, int recognizability, string fileName) {
            var picture = await Context.Pictures.AsNoTracking().FirstOrDefaultAsync(p => p.FileName == fileName);
            var rating = new Rating();
            rating.Id = Guid.NewGuid().ToString();
            rating.UserId = userId;
            rating.PictureId = picture.Id;
            rating.Recognizability = recognizability;
            rating.Desirability = desirability;

            Context.Ratings.Add(rating);

            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                System.Diagnostics.Debug.WriteLine(e);
            }
            return saveResult == 1;
        }
    }
}
