using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace serv.Models
{
    public class HtmlContext:DbContext
    {
        public DbSet<Html> Htmls { get; set; }
        public HtmlContext(DbContextOptions<HtmlContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
