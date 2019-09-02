using System.Collections.Generic;
using System.Threading.Tasks;
using SinStim.Models;
using SinStim.Services.Poco;

namespace SinStim.Services.Interfaces {
    public interface ICategoryService {
        Task<List<CategoryInfo>> GetCategoryInfoAsync();
        Task<List<IncompleteCategory>> GetListOfIncompleteCategoriesAsync();
    }
}
