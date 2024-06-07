using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using WeatherAppApi.Data;
using WeatherAppApi.Models;
using Microsoft.EntityFrameworkCore; // Ensure this is included

namespace WeatherAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherInfoController : ControllerBase
    {
        private readonly WeatherAppContext _context;

        public WeatherInfoController(WeatherAppContext context)
        {
            _context = context;
        }

        // GET: api/WeatherInfo
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<WeatherInfo>> GetWeatherInfos()
        {
            return _context.WeatherInfos.ToList();
        }

        [HttpGet("{city}/week")]
        public async Task<ActionResult<IEnumerable<WeatherInfo>>> GetWeatherInfoByCityForWeek(string city)
        {
            var today = DateTime.Today;
            var weekFromToday = today.AddDays(7);

            var weatherInfos = await _context.WeatherInfos
                                             .Where(w => w.CityName == city && w.WeatherDate >= today && w.WeatherDate <= weekFromToday)
                                             .ToListAsync();

            if (weatherInfos == null || !weatherInfos.Any())
            {
                return NotFound();
            }

            return weatherInfos;
        }

        [HttpGet("{city}/today")]
        public async Task<ActionResult<WeatherInfo>> GetTodayWeather(string city)
        {
            var today = DateTime.Today;
            var weatherInfo = await _context.WeatherInfos.FirstOrDefaultAsync(w => w.CityName == city && w.WeatherDate == today);

            if (weatherInfo == null)
            {
                return NotFound();
            }

            return weatherInfo;
        }

        // GET: api/WeatherInfo/{city}
        [HttpGet("{city}")]
        public async Task<ActionResult<IEnumerable<WeatherInfo>>> GetWeatherInfoByCity(string city)
        {
            var weatherInfos = await _context.WeatherInfos.Where(w => w.CityName == city).ToListAsync();

            if (weatherInfos == null || !weatherInfos.Any())
            {
                return NotFound();
            }

            return weatherInfos;
        }

        // GET: api/WeatherInfo/{city}/{date}
        [HttpGet("{city}/{date}")]
        [AllowAnonymous]
        public ActionResult<WeatherInfo> GetWeatherInfo(string city, DateTime date)
        {
            var weatherInfo = _context.WeatherInfos.SingleOrDefault(w => w.CityName == city && w.WeatherDate == date);

            if (weatherInfo == null)
            {
                return NotFound();
            }

            return weatherInfo;
        }

        // POST: api/WeatherInfo
        [HttpPost]
        [Authorize]
        public ActionResult<WeatherInfo> PostWeatherInfo(WeatherInfo weatherInfo)
        {
            _context.WeatherInfos.Add(weatherInfo);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetWeatherInfo), new { city = weatherInfo.CityName, date = weatherInfo.WeatherDate }, weatherInfo);
        }

        // PUT: api/WeatherInfo/{city}/{date}
        [HttpPut("{city}/{date}")]
        [Authorize]
        public IActionResult PutWeatherInfo(string city, DateTime date, WeatherInfo weatherInfo)
        {
            if (city != weatherInfo.CityName || date != weatherInfo.WeatherDate)
            {
                return BadRequest();
            }

            var existingWeatherInfo = _context.WeatherInfos.SingleOrDefault(w => w.CityName == city && w.WeatherDate == date);
            if (existingWeatherInfo == null)
            {
                return NotFound();
            }

            existingWeatherInfo.Temperature = weatherInfo.Temperature;
            existingWeatherInfo.MainStatus = weatherInfo.MainStatus;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/WeatherInfo/{city}/{date}
        [HttpDelete("{city}/{date}")]
        [Authorize]
        public IActionResult DeleteWeatherInfo(string city, DateTime date)
        {
            var weatherInfo = _context.WeatherInfos.SingleOrDefault(w => w.CityName == city && w.WeatherDate == date);
            if (weatherInfo == null)
            {
                return NotFound();
            }

            _context.WeatherInfos.Remove(weatherInfo);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
