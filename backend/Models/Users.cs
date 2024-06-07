using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherAppApi.Models
{
	[Table("user_tab")]
	public class User
	{
		[Key]
		public string Username { get; set; }

		[Required]
		public string Password { get; set; }

		public string Name { get; set; }

		[Required]
		public string UserType { get; set; }

		public string DefaultCityName { get; set; }

		public string Status { get; set; }
	}
}
