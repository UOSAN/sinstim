using Microsoft.Extensions.Configuration;
using SinStim.Constants;
using SinStim.Services.Interfaces;

namespace SinStim.Services {
    public class ConfigService : IConfigService {

        private readonly IConfiguration Configuration;
        public ConfigService(IConfiguration configuration) {
            this.Configuration = configuration;
        }

        public int GetNumberOfPicturesToRate() {
            return Configuration.GetValue<int>(CONSTANTS.CONFIG.NUMBER_OF_PICTURES_TO_RATE);
        }

        public int GetNumberOfRatingsToFinishPicture() {
            return Configuration.GetValue<int>(CONSTANTS.CONFIG.NUMBER_OF_RATINGS_TO_FINISH_PICTURE);
        }

        public string GetPictureHost() {
            return Configuration.GetValue<string>(CONSTANTS.CONFIG.PICTURE_HOST);
        }
    }
}
