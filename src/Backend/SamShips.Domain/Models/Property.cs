namespace SamShips.Domain.Models
{
    public class Property<T> where T: struct
    {
        public T Value { get; set; }
        public T MaximumValue { get; set; }

        public Property(T maximumValue)
        {
            Value = maximumValue;
            MaximumValue = maximumValue;
        }
    }
}
