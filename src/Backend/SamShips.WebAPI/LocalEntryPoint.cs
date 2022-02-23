using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Formatting.Json;
using Serilog.Exceptions;
using Serilog.Templates;

namespace SamShips.WebAPI
{
    /// <summary>
    /// The Main function can be used to run the ASP.NET Core application locally using the Kestrel webserver.
    /// </summary>
    public class LocalEntryPoint
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args)
                .UseSerilog((context, services, configuration) => configuration
                    .ReadFrom.Configuration(Startup.Configuration)
                    .WriteTo.Console(new ExpressionTemplate("{ {@t, @m, @r, @l: if @l = 'Information' then 'Info' else @l, @x, ..@p} }\n"))
                    .Enrich.WithThreadId()
                    .Enrich.WithCorrelationId()
                    .Enrich.WithExceptionDetails()
                    .Enrich.FromLogContext())
                .Build()
                .Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
