using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SamShips.Application.Interfaces;
using SamShips.Application.Mappers;
using SamShips.Application.Models;
using SamShips.Application.Models.Persistence;
using SamShips.Domain.Enums;
using SamShips.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamShips.Application.Repositories
{
    public class ShipRepository : IShipRepository
    {
        private readonly ILogger<ShipRepository> _logger;
        private readonly IShipFactory _shipFactory;
        private readonly IAmazonDynamoDB _amazonDynamoDB;
        private readonly DynamoDBContext _dynamoContext;
        private readonly string _tableName;

        public ShipRepository(ILogger<ShipRepository> logger, IConfiguration configuration, IShipFactory shipFactory, IAmazonDynamoDB amazonDynamoDB)
        {
            _logger = logger;
            _shipFactory = shipFactory;
            _amazonDynamoDB = amazonDynamoDB;
            _dynamoContext = new DynamoDBContext(_amazonDynamoDB);
            _tableName = configuration["TABLE_NAME"];
        }

        public async Task<List<Ship>> GetAll(CancellationToken cancellationToken = default)
        {
            DynamoDBOperationConfig operationConfig = new DynamoDBOperationConfig
            {
                OverrideTableName = _tableName,
            };

            _logger.LogDebug($"Retrieving all instances from {operationConfig.OverrideTableName}");
            AsyncSearch<DynamoShip> requests = _dynamoContext.ScanAsync<DynamoShip>(null, operationConfig);
            var shipList = await requests.GetRemainingAsync(cancellationToken);

            return shipList.Select(s => s.MapToDomain()).ToList();
        }

        public async Task<Ship> AddShip(string name, ShipClass shipClass, Region location, CancellationToken cancellationToken = default)
        {
            var allShips = await GetAll(cancellationToken);
            if (allShips.Any(s => s.Name == name))
                throw new ArgumentException($"There is already a {nameof(Ship)} called {name}");

            var newShip = await _shipFactory.CreateShip(name, shipClass, location);

            DynamoDBOperationConfig operationConfig = new DynamoDBOperationConfig
            {
                OverrideTableName = _tableName,
            };

            _logger.LogDebug($"Write item to {operationConfig.OverrideTableName}");
            await _dynamoContext.SaveAsync(newShip.MapToDynamo(), operationConfig, cancellationToken);
            
            return newShip;
        }

        public async Task<Ship?> GetShip(string id, CancellationToken cancellationToken = default)
        {
            DynamoDBOperationConfig operationConfig = new DynamoDBOperationConfig
            {
                OverrideTableName = _tableName,
            };

            _logger.LogDebug($"Read item primary key {id} from {operationConfig.OverrideTableName}");
            var ship = await _dynamoContext.LoadAsync<DynamoShip>(id, operationConfig, cancellationToken);
            return ship.MapToDomain();
        }
    }
}
