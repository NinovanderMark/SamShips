using SamShips.Application.Models;
using SamShips.Domain.Enums;
using SamShips.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamShips.Application.Interfaces
{
    public interface IShipRepository
    {
        Task<Ship> AddShip(string name, ShipClass shipClass, Region location, CancellationToken cancellationToken = default);
        Task<Ship?> GetShip(string id, CancellationToken cancellationToken = default);
        Task<List<Ship>> GetAll(CancellationToken cancellationToken = default);
    }
}
