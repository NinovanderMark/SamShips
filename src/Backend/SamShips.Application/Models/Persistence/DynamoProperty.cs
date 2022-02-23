using System;
using System.Collections.Generic;
using System.Text;

namespace SamShips.Application.Models.Persistence
{
    public class DynamoProperty<T> where T : struct
    {
        public T Value { get; set; }
        public T MaximumValue { get; set; }
    }
}
