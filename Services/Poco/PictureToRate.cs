namespace SinStim.Services.Poco {
    public class PictureToRate {
        public readonly string Id;
        public readonly string Path;
        public readonly string FileName;
        public readonly string Category;

        public PictureToRate(string id, string path, string fileName, string category) {
            this.Id = id;
            this.Path = path;
            this.FileName = fileName;
            this.Category = category;
        }
    }
}
