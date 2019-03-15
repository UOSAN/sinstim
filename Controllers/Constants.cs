namespace SinStim.Controllers {
    public static class CONSTANTS {
        public static class REQUEST {
            public const string ID = "id";
            public const string ELIGIBILITY_START_TIME = "eligibilityStartTime";
            public const string ELIGIBILITY_END_TIME = "eligibilityEndTime";
            public const string ELIGIBILITY_COMPLETION_CODE = "eligibilityCompletionCode";

            public const string SURVEY_START_TIME = "surveyStartTime";
            public const string SURVEY_END_TIME = "surveyEndTime";
            public const string SURVEY_COMPLETION_CODE = "surveyCompletionCode";

            public const string ASSIGNED_CATEGORY = "assignedCategory";
            public const string SURVEY_QUESTION_NUMBERS = "surveyQuestionNumbers";
            public const string FILE_NAME = "fileName";
            public const string DESIRABILITY = "desirability";
            public const string RECOGNIZABILITY = "recognizability";
            public const string CATEGORY = "category";
            public const string TOTAL_PICTURES = "totalPictures";
            public const string FINISHED_PICTURE_COUNT = "finishedPictureCount";
            public const string PERCENT_COMPLETE = "percentComplete";
        }

        public static class ELIGIBILITY {
           public const string ANSWERS = "answers";
           public const string ALCOHOL = "e_alcohol";
           public const string CHOCOLATE = "e_chocolate";
           public const string COCAINE = "e_cocaine";
           public const string COOKIES = "e_cookies";
           public const string DONUTS = "e_donuts";
           public const string FRIES = "e_fries";
           public const string HEROIN = "e_heroin";
           public const string ICECREAM = "e_icecream";
           public const string MARIJUANA = "e_marijuana";
           public const string METHAMPHETAMINE = "e_methamphetamine";
           public const string PASTA = "e_pasta";
           public const string PILLS = "e_pills";
           public const string PIZZA = "e_pizza";
           public const string TOBACCO = "e_tobacco";
        }

        public static class CATEGORY {
           public const string ALCOHOL = "alcohol";
           public const string CHOCOLATE = "chocolate";
           public const string COCAINE = "cocaine";
           public const string COOKIES = "cookies";
           public const string DONUTS = "donuts";
           public const string FRIES = "fries";
           public const string HEROIN = "heroin";
           public const string ICECREAM = "icecream";
           public const string MARIJUANA = "marijuana";
           public const string METHAMPHETAMINE = "methamphetamine";
           public const string NEUTRAL = "neutral";
           public const string PASTA = "pasta";
           public const string PILLS = "pills";
           public const string PIZZA = "pizza";
           public const string TOBACCO = "tobacco";
        }

        public static class CONFIG {
            public const string NUMBER_OF_PICTURES_TO_RATE = "numberOfPicturesToRate";
            public const string NUMBER_OF_RATINGS_TO_FINISH_PICTURE = "numberOfRatingsToFinishPicture";
            public const string DEFAULT_CONNECTION = "DefaultConnection";
        }
    }
}
