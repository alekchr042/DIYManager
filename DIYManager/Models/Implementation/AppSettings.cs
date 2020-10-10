using DIYManager.Models.Interfaces;

namespace DIYManager.Models.Implementation
{
    public class AppSettings : IAppSettings
    {
        public string Secret { get; set; }
    }
}
