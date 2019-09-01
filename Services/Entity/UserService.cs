using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SinStim.Models;

namespace SinStim.Services.Entity {
    public partial class UserService : IUserService {
        private readonly SinStimContext Context;
        public UserService(SinStimContext context) {
            this.Context = context;
        }

        public async Task<bool> SaveAsync(string id) {
            var newUser = new User();
            newUser.Id = id;
            newUser.IsRejected = false;
            Context.Users.Add(newUser);

            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                System.Diagnostics.Trace.TraceError(e.Message);
            }
            return saveResult == 1;
        }

        public async Task<bool> UpdateAsync(User user) {
            Context.Users.Update(user);
            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                System.Diagnostics.Debug.WriteLine(e);
            }
            return saveResult >= 1;
        }

        public async Task<User> GetAsync(string id) {
            return await Context.Users.Include(u => u.Demographics).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetWithNoDemographicsAsync(string id) {
            return await Context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
