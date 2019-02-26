using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using SinStim.Models;

namespace SinStim.Services {
    public interface IReportService {
        Task<List<JObject>> GetEligibilityData();
        Task<List<JObject>> GetCompletionData();
    }
}
