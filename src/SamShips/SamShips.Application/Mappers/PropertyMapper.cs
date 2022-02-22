using SamShips.Application.Models.Persistence;
using SamShips.Domain.Models;
using System;

namespace SamShips.Application.Mappers
{
    public static class PropertyMapper
    {
        public static Property<T> MapToDomain<T>(this DynamoProperty<T> dynamoProperty) where T : struct
        {
            if (dynamoProperty == null)
                throw new ArgumentNullException(nameof(DynamoProperty<T>));

            return new Property<T>(dynamoProperty.MaximumValue)
            {
                Value = dynamoProperty.Value
            };
        }

        public static DynamoProperty<T> MapToDynamo<T>(this Property<T> property) where T : struct
        {
            if (property == null)
                throw new ArgumentNullException(nameof(Property<T>));

            return new DynamoProperty<T>
            {
                MaximumValue = property.MaximumValue,
                Value = property.Value
            };
        }
    }
}
