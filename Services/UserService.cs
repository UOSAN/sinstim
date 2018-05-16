using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SinStim.Models;

namespace SinStim.Services {
    public partial class UserService : IUserService {
        private readonly SinStimContext context;
        public UserService(SinStimContext context) {
            this.context = context;
        }

        public async Task<bool> SaveAsync(string id) {
            User newUser = new User();
            newUser.Id = id;
            context.Users.Add(newUser);
            var saveResult = await context.SaveChangesAsync();
            return saveResult == 1;
        }

        public async Task<bool> UpdateAsync(User user) {
            context.Users.Update(user);
            var saveResult = await context.SaveChangesAsync();
            return saveResult == 1;
        }
    }
}