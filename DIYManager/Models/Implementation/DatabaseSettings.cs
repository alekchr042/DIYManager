using DIYManager.Models.Interfaces;

namespace DIYManager.Models.Implementation
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
