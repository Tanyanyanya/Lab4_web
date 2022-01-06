using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using serv.Models;

namespace serv.Repositories
{
    public class HtmlRepository: IHtmlRepository
    {
        private readonly HtmlContext _context;

        public HtmlRepository(HtmlContext context)
        {
            _context = context;
        }

        public async Task<Html> Create(Html animeToList)
        {
            _context.Htmls.Add(animeToList);
            await _context.SaveChangesAsync();

            return animeToList;
        }

        public async Task Delete(int id)
        {
            var animetodelete = await _context.Htmls.FindAsync(id);
            _context.Htmls.Remove(animetodelete);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Html>> Get()
        {
            return await _context.Htmls.ToListAsync();
        }

        public async Task<Html> Get(int id)
        {
            return await _context.Htmls.FindAsync(id);
        }
        public async Task Update(Html anime)
        {
            _context.Entry(anime).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
