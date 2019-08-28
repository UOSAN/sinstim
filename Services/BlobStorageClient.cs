using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using SinStim.Services.Interfaces;
using SinStim.Services.Poco;

namespace SinStim.Services {
    public class BlobStorageClient: IBlobStorageClient {
        private readonly HttpClient httpClient;
        private readonly string pictureHost;

        public BlobStorageClient(IConfigService configService) {
            // this.httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            httpClient = new HttpClient();
            this.pictureHost = configService.GetPictureHost();
        }

        public async void GetImages(List<PictureToRate> picturesToRate) {
            picturesToRate.ForEach(ptr => {
                var requestPath = this.pictureHost + "/pictures/" + ptr.Path + '/' + ptr.FileName;
                Task.Factory.StartNew(async () => {
                    await Task.Delay(100);
                    using (var response = await httpClient.GetAsync(requestPath)) {
                        response.EnsureSuccessStatusCode();
                    }
                });
            });
        }
    }
}
