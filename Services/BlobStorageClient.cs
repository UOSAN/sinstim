using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using SinStim.Services.Interfaces;
using SinStim.Services.Poco;

namespace SinStim.Services {
    public class BlobStorageClient: IBlobStorageClient {
        private readonly HttpClient HttpClient;
        public BlobStorageClient(HttpClient httpClient) {
            HttpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async void GetImages(List<PictureToRate> picturesToRate) {
            System.Diagnostics.Trace.WriteLine("GetImages: "+picturesToRate);
            try {
                picturesToRate.ForEach(async ptr => {
                    var requestPath = "pictures/" + ptr.Path + '/' + ptr.FileName;
                    System.Diagnostics.Trace.WriteLine("About to request: "+requestPath);
                    var task = Task.Factory.StartNew(async () => {
                        await Task.Delay(100);
                        using (var response = await HttpClient.GetAsync(requestPath)) {
                            response.EnsureSuccessStatusCode();
                        }
                    });
                    if(task.Exception != null) {
                        System.Diagnostics.Trace.WriteLine(task.Exception.Message);
                    }
                });
            }
            catch(Exception ex) {
                System.Diagnostics.Trace.WriteLine(ex.Message);
            }
        }
    }
}
