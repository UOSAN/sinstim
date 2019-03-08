using System.IO.Compression;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SinStim.Services;
using SinStim.Models;

namespace SinStim {
    public class Startup {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddMvc();

            services.AddResponseCompression(opt => {
                opt.Providers.Add<GzipCompressionProvider>();
                opt.EnableForHttps = true;
            });
            services.Configure<GzipCompressionProviderOptions>(options => {
                options.Level = CompressionLevel.Fastest;
            });

            services.Configure<CookiePolicyOptions>(options => {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddDbContext<SinStimContext>(options => {
                var defaultConnectionString = Configuration.GetConnectionString("DefaultConnection");
                options.UseSqlite(defaultConnectionString, ob => ob.SuppressForeignKeyEnforcement());
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ISurveyService, SurveyService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            app.UseResponseCompression();

            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
                app.UseCors("DevelopmentCorsPolicy");
            } else {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
