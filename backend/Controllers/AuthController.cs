using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WeatherAppApi.Data;
using WeatherAppApi.Models;
using System.Threading.Tasks;

namespace WeatherAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly WeatherAppContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly ILogger<AuthController> _logger;

        public AuthController(WeatherAppContext context, IConfiguration configuration, ILogger<AuthController> logger)
        {
            _context = context;
            _jwtSettings = configuration.GetSection("JwtSettings").Get<JwtSettings>();
            _logger = logger;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            _logger.LogInformation("Login attempt: {Username}", loginModel.Username);

            var user = _context.Users.SingleOrDefault(u => u.Username == loginModel.Username && u.Password == loginModel.Password);
            if (user == null)
            {
                _logger.LogWarning("Invalid login attempt: {Username}", loginModel.Username);
                _logger.LogWarning("Invalid login attempt: {Password}", loginModel.Password);
                return Unauthorized("Invalid credentials");
            }

            var token = GenerateJwtToken(user);
            _logger.LogInformation("Login successful: {Username}", loginModel.Username);
            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Username), // Include the username as a claim
                new Claim(ClaimTypes.Role, user.UserType),
                new Claim("role", user.UserType), // Explicitly add role claim
                new Claim("city", user.DefaultCityName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
