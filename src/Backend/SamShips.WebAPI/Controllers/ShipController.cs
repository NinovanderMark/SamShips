using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SamShips.Application.Interfaces;
using SamShips.Application.Models;
using SamShips.Domain.Models;
using SamShips.WebAPI.Mappers;
using SamShips.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SamShips.WebAPI.Controllers
{
    [ApiController]
    [Route("ships")]
    public class ShipController : ControllerBase
    {
        private readonly ILogger<ShipController> _logger;
        private readonly IShipRepository _shipRepository;

        public ShipController(ILogger<ShipController> logger, IShipRepository shipRepository)
        {
            _logger = logger;
            _shipRepository = shipRepository;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResultResponse<List<ShipDto>>), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("GET Ships was called");

            var shipList = await _shipRepository.GetAll(cancellationToken);
            if (!shipList.Any())
                return NoContent();

            return Ok(new ResultResponse<List<ShipDto>>(shipList.Select(s => s.MapToDto()).ToList(), true));
        }

        [HttpGet("{id}", Name = "GetById")]
        [ProducesResponseType(typeof(ResultResponse<Ship>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(BaseResponse), (int)HttpStatusCode.NotFound)]
        public async Task<IActionResult> GetSingle([FromRoute] string id, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("GET Ship was called with id {ShipId}", id);

            var ship = await _shipRepository.GetShip(id, cancellationToken);
            if (ship == null)
                return NotFound(new BaseResponse(false));

            return Ok(new ResultResponse<Ship>(ship, true));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResultResponse<Ship>), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResultResponse<string>), (int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> AddShip([FromBody] ShipDto shipRequest, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("POST Ship was called");

            if (string.IsNullOrEmpty(shipRequest.Name))
                return BadRequest(new ResultResponse<string>($"Field {nameof(shipRequest.Name)} is null or empty", false));

            try
            {
                var ship = await _shipRepository.AddShip(shipRequest.Name, shipRequest.Class, shipRequest.Location);
                return Ok(new ResultResponse<Ship>(ship, true));
            }
            catch (ArgumentException exception)
            {
                return BadRequest(new ResultResponse<string>(exception.Message, false));
            }
        }
    }
}
