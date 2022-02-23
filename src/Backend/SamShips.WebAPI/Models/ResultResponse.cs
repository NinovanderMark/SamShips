using System;

namespace SamShips.WebAPI.Models
{
    public class ResultResponse<T> : BaseResponse where T : class
    {
        public T? Result { get; set; }

        public ResultResponse(T result, bool success) : base(success)
        {
            Result = result;
        }
    }
}
