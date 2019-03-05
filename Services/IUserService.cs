using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public interface IUserService {
        Task<bool> SaveAsync(string id, bool isRejected);
        Task<bool> UpdateAsync(User user);
        Task<User> GetUser(string userId);
    }
}
