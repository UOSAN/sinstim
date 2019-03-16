using System.Threading.Tasks;

namespace SinStim.Services.Entity {
    public interface IRatingService {
        Task<bool> SaveAsync(string userId, int desirability, int recognizability, string fileName);
    }
}
