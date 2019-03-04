using SinStim.Models;

namespace SinStim.Services {
    public class PhotoService : IPhotoService {

        private readonly SinStimContext context;

        public PhotoService(SinStimContext context) {
            this.context = context;
        }
    }
}
