namespace SinStim.Services.Interfaces {
    public interface IConfigService {
        int GetNumberOfPicturesToRate();
        int GetNumberOfRatingsToFinishPicture();
        int GetNumberOfRatingsToFinishNeutralPicture();
        string GetPictureHost();
        string GetAdminUser();
        string GetAdminPassword();
    }
}
