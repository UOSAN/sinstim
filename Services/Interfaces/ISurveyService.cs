using System.Collections.Generic;
using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services.Interfaces {
    public interface ISurveyService {
        Task<string> GetAssignedCategory(string userId);
        Task<List<PictureToRate>> GetPicturesToRateRaw(string category);
    }
}
