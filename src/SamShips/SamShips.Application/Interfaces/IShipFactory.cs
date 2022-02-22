using SamShips.Domain.Enums;
using SamShips.Domain.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SamShips.Application.Interfaces
{
    public interface IShipFactory
    {
        Task<Ship> CreateShip(string name, ShipClass shipClass, Region location, CancellationToken cancellationToken = default);
    }
}
