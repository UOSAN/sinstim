using System;

namespace SinStim.Services {
    public interface ISurveyService {
        string GetAssignedCategory(string userId);
        Array GetSurveyQuestionNumbers(string category);
    }
}
