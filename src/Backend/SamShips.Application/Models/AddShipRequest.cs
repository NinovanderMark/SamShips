using SamShips.Domain.Enums;

namespace SamShips.Application.Models
{
    public class AddShipRequest
    {
        public string? Name { get; set; }
        public ShipClass Class { get; set; }
    }
}
