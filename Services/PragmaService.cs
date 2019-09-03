using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SinStim.Models;
using SinStim.Services.Interfaces;
namespace SinStim.Services {
    public class PragmaService: IPragmaService {

        private readonly SinStimContext Context;

        public PragmaService(SinStimContext context) {
            this.Context = context;
        }

        public async Task SetSqliteOptimizations() {
            await Context.Database.ExecuteSqlCommandAsync("PRAGMA journal_mode=WAL;PRAGMA temp_store = MEMORY;");
        }
    }
}
