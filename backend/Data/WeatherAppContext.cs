using Microsoft.EntityFrameworkCore;
using WeatherAppApi.Models;

namespace WeatherAppApi.Data
{
    public class WeatherAppContext : DbContext
    {
        public WeatherAppContext(DbContextOptions<WeatherAppContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserLog> UserLogs { get; set; }
        public DbSet<WeatherInfo> WeatherInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("user_tab");
            modelBuilder.Entity<UserLog>().ToTable("user_log_tab");
            modelBuilder.Entity<WeatherInfo>().ToTable("weather_info_tab");

            modelBuilder.Entity<WeatherInfo>()
                .HasKey(w => new { w.WeatherDate, w.CityName });
        }
    }
}
