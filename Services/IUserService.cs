using System;
using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public interface IUserService {
        Task<bool> SaveAsync(string id, bool isRejected, Guid eligibilityCompletionCode);
        Task<bool> UpdateAsync(User user);
    }
}
