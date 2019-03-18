using System.Collections.Generic;
using System.Threading.Tasks;
using SinStim.Services.Poco;

namespace SinStim.Services.Interfaces {
    public interface ICategoryService {
        Task<List<CategoryInfo>> GetCategoryInfoAsync();
        Task<List<CategoryInfo>> GetListOfIncompleteCategoriesAsync();
        Task<bool> IsCategoryCompleteAsync(string category);
    }
}
