using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using WeatherAppApi.Data;
using WeatherAppApi.Models;

namespace WeatherAppApi.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserLogsController : ControllerBase
    {
        private readonly WeatherAppContext _context;

        public UserLogsController(WeatherAppContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserLog>>> GetUserLogs()
        {
            return await _context.UserLogs.ToListAsync();
        }

        [HttpGet("{logId}")]
        public async Task<ActionResult<UserLog>> GetUserLog(int logId)
        {
            var userLog = await _context.UserLogs.FindAsync(logId);

            if (userLog == null)
            {
                return NotFound();
            }

            return userLog;
        }

        [HttpPost]
        public async Task<ActionResult<UserLog>> PostUserLog(UserLog userLog)
        {
            _context.UserLogs.Add(userLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserLog), new { logId = userLog.LogId }, userLog);
        }

        [HttpPut("{logId}")]
        public async Task<IActionResult> PutUserLog(int logId, UserLog userLog)
        {
            if (logId != userLog.LogId)
            {
                return BadRequest();
            }

            _context.Entry(userLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.UserLogs.Any(e => e.LogId == logId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{logId}")]
        public async Task<IActionResult> DeleteUserLog(int logId)
        {
            var userLog = await _context.UserLogs.FindAsync(logId);
            if (userLog == null)
            {
                return NotFound();
            }

            _context.UserLogs.Remove(userLog);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
