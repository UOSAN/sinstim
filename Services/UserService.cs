using System;
using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public partial class UserService : IUserService {
        private readonly SinStimContext context;
        public UserService(SinStimContext context) {
            this.context = context;
        }

        public async Task<bool> SaveAsync(string id, bool isRejected) {
            var newUser = new User();
            newUser.Id = id;
            newUser.IsRejected = isRejected;
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
            return saveResult >= 1;
        }

        public async Task<User> GetUser(string userId) {
            return await context.FindAsync<User>(userId);
        }
    }
}
