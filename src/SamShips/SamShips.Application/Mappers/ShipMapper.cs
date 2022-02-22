using SamShips.Application.Models.Persistence;
using SamShips.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamShips.Application.Mappers
{
    public static class ShipMapper
    {
        public static Ship MapToDomain(this DynamoShip dynamoShip)
        {
            if (dynamoShip == null)
                throw new ArgumentNullException(nameof(DynamoShip));

            return new Ship
            {
                Id = dynamoShip.Id,
                Name = dynamoShip.Name,
                Class = dynamoShip.Class,
                Location = dynamoShip.Location,
                Orders = dynamoShip.Orders,
                Cargo = dynamoShip.Cargo,
                CargoCapacity = dynamoShip.CargoCapacity,
                Hull = dynamoShip.Hull?.MapToDomain(),
            };
        }

        public static DynamoShip MapToDynamo(this Ship ship)
        {
            if (ship == null)
                throw new ArgumentNullException(nameof(DynamoShip));

            return new DynamoShip
            {
                Id = ship.Id,
                Name = ship.Name,
                Class = ship.Class,
                Location = ship.Location,
                Orders = ship.Orders,
                Cargo = ship.Cargo,
                CargoCapacity = ship.CargoCapacity,
                Hull = ship.Hull?.MapToDynamo(),
            };
        }
    }
}
