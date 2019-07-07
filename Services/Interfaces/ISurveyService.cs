using System.Collections.Generic;
using System.Threading.Tasks;
using SinStim.Services.Poco;

namespace SinStim.Services.Interfaces {
    public interface ISurveyService {
        Task<string> GetAssignedCategory(string userId);
        Task<List<PictureToRate>> GetPicturesToRate(string category);
    }
}
