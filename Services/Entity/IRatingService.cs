using System.Threading.Tasks;

namespace SinStim.Services.Entity {
    public interface IRatingService {
        Task<bool> SaveAsync(string userId, string pictureId, int desirability, int recognizability);
    }
}
