using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using SinStim.Models;

namespace SinStim {
    public class SinStimContextFactory : IDesignTimeDbContextFactory<SinStimContext> {
        public SinStimContext CreateDbContext(string[] args) {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();
            var optionsBuilder = new DbContextOptionsBuilder<SinStimContext>();
            optionsBuilder.UseSqlite(configuration.GetConnectionString("DefaultConnection"));

            return new SinStimContext(optionsBuilder.Options);
        }
    }
}
