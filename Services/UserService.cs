using System;
using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public partial class UserService : IUserService {
        private readonly SinStimContext context;
        public UserService(SinStimContext context) {
            this.context = context;
        }

        public async Task<bool> SaveAsync(string id, bool isRejected, Guid eligibilityCompletionCode) {
            User newUser = new User();
            newUser.Id = id;
            newUser.IsRejected = isRejected;
            newUser.EligibilityCompletionCode = eligibilityCompletionCode;
            context.Users.Add(newUser);

            var saveResult = 0;
            try {
                saveResult = await context.SaveChangesAsync();
            } catch(Exception e) {
                System.Diagnostics.Debug.WriteLine(e);
            }
            return saveResult == 1;
        }

        public async Task<bool> UpdateAsync(User user) {
            context.Users.Update(user);
            var saveResult = 0;
            try {
                saveResult = await context.SaveChangesAsync();
            } catch(Exception e) {
                System.Diagnostics.Debug.WriteLine(e);
            }
            return saveResult == 1;
        }
    }
}
