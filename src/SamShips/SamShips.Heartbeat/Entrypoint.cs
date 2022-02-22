using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SamShips.Heartbeat.Models;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.CamelCaseLambdaJsonSerializer))]

namespace SamShips.Heartbeat
{
    public class Entrypoint
    {
        private readonly ILogger<Entrypoint> _logger;

        public Entrypoint()
        {
            var serviceCollection = new ServiceCollection();
            Startup.ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();

            _logger = serviceProvider.GetService<ILogger<Entrypoint>>();
        }

        public async Task<Result> Handler(ILambdaContext context)
        {
            _logger.LogInformation("Received request [{AwsRequestId}] for '{InvokedFunctionArn}'", context.AwsRequestId, context.InvokedFunctionArn);

            try
            {
                var stopWatch = System.Diagnostics.Stopwatch.StartNew();

                // Do stuff
                await Task.Delay(120);

                stopWatch.Stop();
                return new Result
                {
                    ElapsedMiliseconds = stopWatch.ElapsedMilliseconds,
                    Success = true
                };
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled exception occurred");
                throw;
            }
            
        }
    }
}
