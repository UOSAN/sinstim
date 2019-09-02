namespace SinStim.Models {
    public class PictureToRate {
        public string Id {get; set; }
        public string Path {get; set; }
        public string FileName {get; set; }
        public string Category {get; set; }

        public PictureToRate(string id, string path, string fileName, string category) {
            this.Id = id;
            this.Path = path;
            this.FileName = fileName;
            this.Category = category;
        }
    }
}
