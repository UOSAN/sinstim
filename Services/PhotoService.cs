using SinStim.Models;

namespace SinStim.Services {
    public class PhotoService : IPhotoService {

        private readonly SinStimContext Context;

        public PhotoService(SinStimContext context) {
            this.Context = context;
        }
    }
}
