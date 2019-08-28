using System.Collections.Generic;
using System.Threading.Tasks;
using SinStim.Services.Poco;

namespace SinStim.Services.Interfaces {
    public interface IBlobStorageClient {
        void GetImages(List<PictureToRate> picturesToRate);
    }
}
