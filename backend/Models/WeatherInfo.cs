using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherAppApi.Models
{
    [Table("weather_info_tab")]
    public class WeatherInfo
    {
        [Key]
        [Column(Order = 0)]
        public DateTime WeatherDate { get; set; }

        [Key]
        [Column(Order = 1)]
        public string CityName { get; set; }

        public decimal Temperature { get; set; }

        public string MainStatus { get; set; }
    }
}
