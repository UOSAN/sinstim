using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace SinStim.Services {
    public interface IReportService {
        Task<List<JObject>> GetInvitationData();
        Task<List<JObject>> GetEligibilityCompletionData();
        Task<List<JObject>> GetStatusData();
        Task<List<JObject>> GetSurveyCompletionData();
    }
}
