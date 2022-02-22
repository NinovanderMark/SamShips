namespace SamShips.WebAPI.Models
{
    public class BaseResponse
    {
        public bool Success { get; set; }

        public BaseResponse(bool success)
        {
            Success = success;
        }
    }
}
