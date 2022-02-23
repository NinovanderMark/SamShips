using Amazon.DynamoDBv2.DataModel;
using SamShips.Domain.Enums;
using SamShips.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamShips.Application.Models.Persistence
{
    [DynamoDBTable("sam-ships-table", LowerCamelCaseProperties = true)]
    public class DynamoShip
    {
        [DynamoDBHashKey]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public ShipClass Class { get; set; }
        public Region Location { get; set; }
        public Orders Orders { get; set; }
        public DynamoProperty<long>? Hull { get; set; }
        public Dictionary<string, long>? Cargo { get; set; }
        public long CargoCapacity { get; set; }

        [DynamoDBVersion]
        public int? VersionNumber { get; set; }
    }
}
