using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherAppApi.Models
{
    [Table("user_log_tab")]
    public class UserLog
    {
        [Key]
        public int LogId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public DateTime LogTime { get; set; }

        public string IPAddress { get; set; }

        public string Log { get; set; }

        [ForeignKey("Username")]
        public User User { get; set; }
    }
}
