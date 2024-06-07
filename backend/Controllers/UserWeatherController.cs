using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherAppApi.Data;
using WeatherAppApi.Models;

namespace WeatherAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserWeatherInfoController : ControllerBase
    {
        private readonly WeatherAppContext _context;

        public UserWeatherInfoController(WeatherAppContext context)
        {
            _context = context;
        }

        [HttpGet("{username}/weather")]
        public async Task<ActionResult<IEnumerable<WeatherInfo>>> GetUserWeatherInfo(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var weatherInfos = await _context.WeatherInfos
                .Where(w => w.CityName == user.DefaultCityName && w.WeatherDate >= DateTime.Today && w.WeatherDate < DateTime.Today.AddDays(7))
                .ToListAsync();

            if (!weatherInfos.Any())
            {
                return NotFound("Weather data not found");
            }

            return weatherInfos;
        }
    }
}
