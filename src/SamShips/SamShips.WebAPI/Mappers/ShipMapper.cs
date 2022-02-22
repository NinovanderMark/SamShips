using SamShips.Domain.Models;
using SamShips.WebAPI.Models;
using System;

namespace SamShips.WebAPI.Mappers
{
    public static class ShipMapper
    {
        public static ShipDto MapToDto(this Ship ship)
        {
            if (ship == null)
                throw new ArgumentNullException(nameof(Ship));

            return new ShipDto
            {
                Name = ship.Name,
                Class = ship.Class,
                Location = ship.Location
            };
        }
    }
}
