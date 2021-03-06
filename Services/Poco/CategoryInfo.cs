namespace SinStim.Services.Poco {
    public class CategoryInfo {

        public readonly string Category;
        public readonly int TotalPictures;
        public readonly int FinishedPictureCount;
        public readonly double PercentComplete;

        public CategoryInfo(string category, int totalPictures, int finishedPictureCount) {
            this.Category = category;
            this.TotalPictures = totalPictures;
            this.FinishedPictureCount = finishedPictureCount;
            this.PercentComplete = (double)this.FinishedPictureCount / (double)this.TotalPictures;
        }
    }
}
