using System;
using System.Threading.Tasks;
using SinStim.Models;

namespace SinStim.Services {
    public interface ISurveyService {
        Task<string> GetAssignedCategory(string userId);
        Task<Array> GetSurveyQuestionNumbers(string category);
        Task<bool> RatePicture(string userId, int desirability, int recognizability, string fileName);
    }
}
