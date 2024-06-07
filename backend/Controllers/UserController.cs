using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeatherAppApi.Data;
using WeatherAppApi.Models;

namespace WeatherAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly WeatherAppContext _context;

        public UsersController(WeatherAppContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        [AllowAnonymous] // Allow anonymous access
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/{username}
        [HttpGet("{username}")]
        [AllowAnonymous] // Allow anonymous access
        public async Task<ActionResult<User>> GetUser(string username)
        {
            var user = await _context.Users.FindAsync(username);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users
        [HttpPost]
        [AllowAnonymous] // Allow anonymous access
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { username = user.Username }, user);
        }

        // PUT: api/Users/{username}
        [HttpPut("{username}")]
        [Authorize] // Require authorization
        public async Task<IActionResult> PutUser(string username, User user)
        {
            if (username != user.Username)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Username == username))
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

        // DELETE: api/Users/{username}
        [HttpDelete("{username}")]
        [Authorize] // Require authorization
        public async Task<IActionResult> DeleteUser(string username)
        {
            var user = await _context.Users.FindAsync(username);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
