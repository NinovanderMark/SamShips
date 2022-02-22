using SamShips.Domain.Enums;
using System.Collections.Generic;

namespace SamShips.Domain.Models
{
    public class Ship
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public ShipClass Class { get; set; }
        public Region Location { get; set; }
        public Orders Orders { get; set; }
        public Property<long>? Hull { get; set; }
        public Dictionary<string, long>? Cargo { get; set; }
        public long CargoCapacity { get; set; }
    }
}
