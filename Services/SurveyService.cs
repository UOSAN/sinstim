using System.Linq;
using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public class SurveyService : ISurveyService {

        private readonly SinStimContext context;
        private readonly IUserService userService;

        public SurveyService(SinStimContext context, IUserService userService) {
            this.context = context;
            this.userService = userService;
        }

        public async Task<string> GetAssignedCategory(string userId) {
            var user = await userService.GetUser(userId);

            return "";
        }

    }
}
