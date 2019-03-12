using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace SinStim.Services {
    public interface IReportService {
        Task<List<JObject>> GetEligibilityData();
        Task<List<JObject>> GetCompletionData();
        Task<List<JObject>> GetStatusData();
    }
}
