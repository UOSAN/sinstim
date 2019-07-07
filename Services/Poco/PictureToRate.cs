namespace SinStim.Services.Poco {
    public class PictureToRate {
        public readonly string Path;
        public readonly string FileName;
        public readonly string Category;

        public PictureToRate(string path, string fileName, string category) {
            this.Path = path;
            this.FileName = fileName;
            this.Category = category;
        }
    }
}
