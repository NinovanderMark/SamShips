using SamShips.Application.Interfaces;
using SamShips.Domain.Enums;
using SamShips.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamShips.Application.Factories
{
    public class ShipFactory : IShipFactory
    {
        public Task<Ship> CreateShip(string name, ShipClass shipClass, Region location, CancellationToken cancellationToken = default)
        {
            var ship = new Ship
            {
                Name = name,
                Class = shipClass,
                Id = $"{nameof(Ship).ToLower()}-{Guid.NewGuid()}",
                Cargo = new Dictionary<string, long>(),
                Orders = Orders.Docked,
                Location = location
            };

            switch(shipClass)
            {
                case ShipClass.Small:
                    ship.Hull = new Property<long>(50);
                    ship.CargoCapacity = 20;
                    break;

                case ShipClass.Medium:
                    ship.Hull = new Property<long>(150);
                    ship.CargoCapacity = 100;
                    break;

                case ShipClass.Large:
                    ship.Hull = new Property<long>(300);
                    ship.CargoCapacity = 200;
                    break;

                default:
                    throw new ArgumentException($"Value {shipClass} is unspecified in {nameof(CreateShip)}");
            }

            return Task.FromResult(ship);
        }
    }
}
