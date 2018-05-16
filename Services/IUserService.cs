using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public interface IUserService {
        Task<bool> SaveAsync(string id);
        Task<bool> UpdateAsync(User user);
    }
}