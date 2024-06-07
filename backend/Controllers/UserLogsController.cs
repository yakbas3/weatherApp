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
    public class UserLogsController : ControllerBase
    {
        private readonly WeatherAppContext _context;

        public UserLogsController(WeatherAppContext context)
        {
            _context = context;
        }

        // GET: api/UserLogs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserLog>>> GetUserLogs()
        {
            return await _context.UserLogs.ToListAsync();
        }

        // GET: api/UserLogs/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserLog>> GetUserLog(int id)
        {
            var userLog = await _context.UserLogs.FindAsync(id);

            if (userLog == null)
            {
                return NotFound();
            }

            return userLog;
        }

        // POST: api/UserLogs
        [HttpPost]
        public async Task<ActionResult<UserLog>> PostUserLog(UserLog userLog)
        {
            _context.UserLogs.Add(userLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserLog), new { id = userLog.LogId }, userLog);
        }
    }
}
