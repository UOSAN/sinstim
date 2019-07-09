namespace SinStim.Services.Interfaces {
    public interface IConfigService {
        int GetNumberOfPicturesToRate();
        int GetNumberOfRatingsToFinishPicture();

        string GetPictureHost();
    }
}
