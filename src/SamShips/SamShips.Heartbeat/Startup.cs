using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Exceptions;
using Serilog.Templates;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace SamShips.Heartbeat
{
    public class Startup
    {
        private const string APPSETTINGS = "appsettings.json";

        public static void ConfigureServices(IServiceCollection services)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile(APPSETTINGS, optional: false, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            ConfigureDependencyInjection(services, configuration);

            var serilog = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .WriteTo.Console(new ExpressionTemplate("{ {@t, @m, @r, @l: if @l = 'Information' then 'Info' else @l, @x, ..@p} }\n"))
                .Enrich.WithThreadId()
                .Enrich.WithCorrelationId()
                .Enrich.WithExceptionDetails()
                .Enrich.FromLogContext()
                .CreateLogger();

            services.AddLogging(loggingBuilder => { loggingBuilder.AddSerilog(serilog); });
        }

        public static void ConfigureDependencyInjection(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(configuration);

            services.AddLocalization(opt => opt.ResourcesPath = "Resources");
        }
    }
}
