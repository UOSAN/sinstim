using System;
using System.Threading.Tasks;

namespace SinStim.Services.Interfaces {
    public interface ISurveyService {
        Task<string> GetAssignedCategory(string userId);
        Task<Array> GetSurveyQuestionNumbers(string category);
    }
}
