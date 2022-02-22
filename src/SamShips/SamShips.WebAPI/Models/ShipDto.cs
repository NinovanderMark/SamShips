using SamShips.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace SamShips.WebAPI.Models
{
    public class ShipDto
    {
        public string? Name { get; set; }
        public ShipClass Class { get; set; }
        public Region Location { get; set; }
    }
}
