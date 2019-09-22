using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SinStim.Models;

namespace SinStim.Services.Entity {
    public partial class UserService : IUserService {
        private readonly SinStimContext Context;
        private readonly ILogger<UserService> Logger;
        public UserService(SinStimContext context, ILogger<UserService> logger) {
            this.Context = context;
            this.Logger = logger;
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
                Logger.LogError(e, "Error SaveAsync: {0} at {1}", id, DateTime.UtcNow.ToString());
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
                Logger.LogError(e, "Error UpdateAsync: {0} at {1}", user.Id, DateTime.UtcNow.ToString());
                System.Diagnostics.Trace.TraceError(e.Message);
            }
            return saveResult >= 1;
        }

        public async Task<bool> UpdateSurveyStartUserAsync(User user) {
            Context.Users.Attach(user);
            Context.Entry(user).Property(u => u.AssignedCategory).IsModified = true;
            Context.Entry(user).Property(u => u.SurveyCompletionCode).IsModified = true;
            Context.Entry(user).Property(u => u.SurveyStartTime).IsModified = true;
            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                Logger.LogError(e, "Error UpdateSurveyStartUserAsync: {0} at {1}", user.Id, DateTime.UtcNow.ToString());
                System.Diagnostics.Trace.TraceError(e.Message);
            }
            return saveResult >= 1;
        }

        public async Task<bool> UpdateSurveyEndUserAsync(User user) {
            Context.Users.Attach(user);
            Context.Entry(user).Property(u => u.SurveyEndTime).IsModified = true;
            var saveResult = 0;
            try {
                saveResult = await Context.SaveChangesAsync();
            } catch(Exception e) {
                Logger.LogError(e, "Error UpdateSurveyEndUserAsync: {0} at {1}", user.Id, DateTime.UtcNow.ToString());
                System.Diagnostics.Trace.TraceError(e.Message);
            }
            return saveResult >= 1;
        }

        public async Task<User> GetAsync(string id) {
            User user = null;
            try {
                user = await Context.Users.Include(u => u.Demographics).FirstOrDefaultAsync(u => u.Id == id);
            } catch(Exception e){
                Logger.LogError(e, "Error GetAsync: {0} at {1}", id, DateTime.UtcNow.ToString());
                System.Diagnostics.Trace.TraceError(e.Message);
            }
            return user;
        }

        public async Task<User> GetWithNoDemographicsAsync(string id) {
            User user = null;
            try {
                user = await Context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
            } catch(Exception e) {
                Logger.LogError(e, "Error GetWithNoDemographicsAsync: {0} at {1}", id, DateTime.UtcNow.ToString());
                System.Diagnostics.Trace.TraceError(e.Message);
            }
            return user;
        }
    }
}
