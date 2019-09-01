using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services.Entity {
    public interface IUserService {
        Task<bool> SaveAsync(string id);
        Task<bool> UpdateAsync(User user);
        Task<bool> UpdateSurveyStartUserAsync(User user);
        Task<User> GetAsync(string id);
        Task<User> GetWithNoDemographicsAsync(string id);
    }
}
