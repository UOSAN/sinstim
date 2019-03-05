using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SinStim.Controllers;
using SinStim.Models;

namespace SinStim.Services {
    public class SurveyService : ISurveyService {

        private readonly SinStimContext context;

        public SurveyService(SinStimContext context) {
            this.context = context;
        }

        public string GetAssignedCategory(string userId) {
            var eligibility = context.Eligibilities.FirstOrDefault(e => e.UserId == userId);
            var potentialCategories = GetPotentialCategories(eligibility);
            var idx = GetRandomAssignedCategoryIndex(potentialCategories.Count-1);

            return potentialCategories.ElementAt(idx);
        }

        private List<string> GetPotentialCategories(Eligibility eligibility) {
            var potentialCategories = new List<string>();
            if (eligibility.Alcohol == true) potentialCategories.Add(CONSTANTS.CATEGORY.ALCOHOL);
            if (eligibility.Chocolate == true) potentialCategories.Add(CONSTANTS.CATEGORY.CHOCOLATE);
            if (eligibility.Cocaine == true) potentialCategories.Add(CONSTANTS.CATEGORY.COCAINE);
            if (eligibility.Cookies == true) potentialCategories.Add(CONSTANTS.CATEGORY.COOKIES);
            if (eligibility.Donuts == true) potentialCategories.Add(CONSTANTS.CATEGORY.DONUTS);
            if (eligibility.Fries == true) potentialCategories.Add(CONSTANTS.CATEGORY.FRIES);
            if (eligibility.Heroin == true) potentialCategories.Add(CONSTANTS.CATEGORY.HEROIN);
            if (eligibility.IceCream == true) potentialCategories.Add(CONSTANTS.CATEGORY.ICECREAM);
            if (eligibility.Marijuana == true) potentialCategories.Add(CONSTANTS.CATEGORY.MARIJUANA);
            if (eligibility.Methamphetamine == true) potentialCategories.Add(CONSTANTS.CATEGORY.METHAMPHETAMINE);
            if (eligibility.Pasta == true) potentialCategories.Add(CONSTANTS.CATEGORY.PASTA);
            if (eligibility.Pills == true) potentialCategories.Add(CONSTANTS.CATEGORY.PILLS);
            if (eligibility.Pizza == true) potentialCategories.Add(CONSTANTS.CATEGORY.PIZZA);
            if (eligibility.Tobacco == true) potentialCategories.Add(CONSTANTS.CATEGORY.TOBACCO);
            return potentialCategories;
        }

        private int GetRandomAssignedCategoryIndex(int maxValue) {
            Random random = new Random();
            return random.Next(maxValue);
        }
    }
}
