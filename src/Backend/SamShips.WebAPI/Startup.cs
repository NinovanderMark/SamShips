using Amazon.DynamoDBv2;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using SamShips.Application.Factories;
using SamShips.Application.Interfaces;
using SamShips.Application.Repositories;
using Serilog;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Threading;

namespace SamShips.WebAPI
{
    public class Startup
    {
        private static string? _projectName => Assembly.GetCallingAssembly().GetName().Name;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; } = null!;

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers(options => options.AllowEmptyInputInBodyModelBinding = true)
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                });

            services.AddSingleton<IShipRepository, ShipRepository>();
            services.AddTransient<IShipFactory, ShipFactory>();
            services.AddSingleton<IAmazonDynamoDB, AmazonDynamoDBClient>();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder => builder.AllowAnyOrigin());
            });

            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc(name: "v1", new OpenApiInfo { Title = _projectName, Version = "v1" });
                x.ResolveConflictingActions(a => a.First());
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler("/error");
            app.UseSerilogRequestLogging();

            app.UseSwagger();
            app.UseSwaggerUI(x =>
            {
                x.DisplayRequestDuration();
                x.SwaggerEndpoint(url: "v1/swagger.json", name: _projectName);
            });

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(builder =>
            {
                builder
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
